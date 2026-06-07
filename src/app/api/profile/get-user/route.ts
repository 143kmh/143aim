// Путь: src/app/api/profile/get-user/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/session";

export const dynamic = 'force-dynamic';

// Кэш: синкаем внешние API не чаще одного раза в 5 минут.
// ИСПРАВЛЕНИЕ: Раньше при каждом открытии профиля делалось 4-5 запросов к внешним API.
// Это медленно и быстро сожрёт лимиты FACEIT/Valorant API.
const SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 минут

interface FaceitMatch {
  stats: {
    "K/D Ratio": string;
    "Headshots %": string;
    Result: string | number;
  };
}

interface RiotPlayer {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  stats?: {
    kills?: number;
    deaths?: number;
    headshots?: number;
    bodyshots?: number;
    legshots?: number;
  };
}

interface RiotMatch {
  players?: {
    all_players?: RiotPlayer[];
  };
  teams?: Record<string, { has_won?: boolean }>;
}

export async function GET() {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ user: null });

  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: { reactionScores: true },
    });

    if (!user) return NextResponse.json({ user: null });

    // Проверяем, нужен ли синк (прошло ли 5 минут с последнего)
    const needsSync = !user.lastSyncedAt || 
      (Date.now() - user.lastSyncedAt.getTime()) > SYNC_INTERVAL_MS;

    if (!needsSync) {
      // Кэш свежий — отдаём данные из БД без внешних запросов
      return NextResponse.json({ user });
    }

    let dbUpdated = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};

    // === 1. СИНК FACEIT (43 игры) ===
    const faceitApiKey = process.env.FACEIT_API_KEY;
    if (faceitApiKey && user.steamId) {
      try {
        const faceitRes = await fetch(
          `https://open.faceit.com/data/v4/players?game=cs2&game_player_id=${user.steamId}`,
          { headers: { 'Authorization': `Bearer ${faceitApiKey}` } }
        );

        if (faceitRes.ok) {
          const faceitData = await faceitRes.json();
          const nickname = faceitData.nickname;
          const skillLevel = faceitData.games?.cs2?.skill_level || faceitData.games?.csgo?.skill_level;
          const elo = faceitData.games?.cs2?.faceit_elo || faceitData.games?.csgo?.faceit_elo || null;
          const faceitPlayerId = faceitData.player_id;

          updateData.faceitId = nickname;
          updateData.faceitRank = skillLevel ? `Level ${skillLevel}` : null;
          updateData.faceitElo = elo;

          if (faceitPlayerId) {
            const statsRes = await fetch(
              `https://open.faceit.com/data/v4/players/${faceitPlayerId}/games/cs2/stats?limit=43`,
              { headers: { 'Authorization': `Bearer ${faceitApiKey}` } }
            );

            if (statsRes.ok) {
              const statsData = await statsRes.json();
              const matches: FaceitMatch[] = statsData.items || [];
              
              let totalKD = 0; let totalHS = 0; let wins = 0;

              matches.forEach((m) => {
                const kd = parseFloat(m.stats["K/D Ratio"]) || 0;
                const hs = parseFloat(m.stats["Headshots %"]) || 0;
                const result = m.stats["Result"];
                
                totalKD += kd; totalHS += hs;
                if (result === "1" || result === "Win" || result === 1) wins++;
              });

              updateData.faceitKd = matches.length > 0 ? parseFloat((totalKD / matches.length).toFixed(2)) : 0.00;
              updateData.faceitHs = matches.length > 0 ? Math.round(totalHS / matches.length) : 0;
              updateData.faceitWinrate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0;
            }
          }
          dbUpdated = true;
        }
      } catch (e) {
        console.error("Failed to sync Faceit stats:", e);
      }
    }

    // === 2. СИНК VALORANT ПО PUUID (10 игр) ===
    const valApiKey = process.env.VALORANT_API_KEY;
    if (valApiKey && user.riotPuuid) {
      try {
        const valRes = await fetch(
          `https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/eu/${user.riotPuuid}`,
          { headers: { 'Authorization': valApiKey } }
        );

        if (valRes.ok) {
          const valData = await valRes.json();
          const currentData = valData.data?.current_data;

          if (currentData) {
            updateData.riotRank = currentData.currenttier_patched || "Unranked";
            updateData.riotElo = currentData.ranking_in_tier || 0;
            updateData.riotImage = currentData.images?.small || null;
            
            const activeRiotName = `${valData.data?.name}#${valData.data?.tag}`;
            if (activeRiotName && user.riotId !== activeRiotName) {
              updateData.riotId = activeRiotName;
            }
            dbUpdated = true;
          }
        }

        const valMatchesRes = await fetch(
          `https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/eu/${user.riotPuuid}?size=10&filter=competitive`,
          { headers: { 'Authorization': valApiKey } }
        );

        if (valMatchesRes.ok) {
          const valMatchesData = await valMatchesRes.json();
          const matches: RiotMatch[] = valMatchesData.data || [];

          let totalKills = 0; let totalDeaths = 0; let wins = 0;
          let totalHeadshots = 0; let totalShots = 0;

          matches.forEach((m) => {
            const player = m.players?.all_players?.find((p) => p.puuid === user!.riotPuuid);
            if (player) {
              const stats = player.stats;
              totalKills += stats?.kills || 0;
              totalDeaths += stats?.deaths || 0;

              const hs = player.stats?.headshots || 0;
              const bs = player.stats?.bodyshots || 0;
              const ls = player.stats?.legshots || 0;
              totalHeadshots += hs;
              totalShots += (hs + bs + ls);

              const teamColor = player.team;
              const teamStats = m.teams?.[teamColor.toLowerCase()];
              if (teamStats?.has_won === true) wins++;
            }
          });

          updateData.riotKd = totalDeaths > 0
            ? parseFloat((totalKills / totalDeaths).toFixed(2))
            : parseFloat(totalKills.toFixed(2));
          updateData.riotHs = totalShots > 0 ? Math.round((totalHeadshots / totalShots) * 100) : 0;
          updateData.riotWinrate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0;
          dbUpdated = true;
        }
      } catch (e) {
        console.error("Failed to sync Valorant stats via PUUID:", e);
      }
    }

    if (dbUpdated && Object.keys(updateData).length > 0) {
      // Обновляем данные и ставим метку времени синка
      updateData.lastSyncedAt = new Date();
      user = await prisma.user.update({
        where: { id: user.id },
        data: updateData,
        include: { reactionScores: true },
      });
    } else {
      // Даже если синк ничего не дал — обновляем время, чтобы не долбить API каждый раз
      await prisma.user.update({
        where: { id: user.id },
        data: { lastSyncedAt: new Date() },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
