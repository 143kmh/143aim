// Путь: src/app/api/reaction/leaderboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('mode') || 'simple';

  try {
    if (mode === 'global') {
      // ИСПРАВЛЕНИЕ: Раньше грузили ВСЕ строки в память и считали на JS.
      // При тысячах пользователей это ложилось бы. Теперь GROUP BY на стороне БД.
      const results = await prisma.$queryRaw<
        Array<{
          username: string;
          avatar_url: string | null;
          avg_rp: number;
        }>
      >`
        SELECT
          u.username,
          u."avatarUrl" AS avatar_url,
          -- Формула: среднее (100000 / bestMs) по всем режимам пользователя
          ROUND(AVG(100000.0 / rs."bestMs")) AS avg_rp
        FROM "ReactionScore" rs
        JOIN "User" u ON rs."userId" = u.id
        GROUP BY u.id, u.username, u."avatarUrl"
        ORDER BY avg_rp DESC
        LIMIT 50
      `;

      const globalLeaderboard = results.map((row, index) => ({
        id: index.toString(),
        username: row.username,
        avatarUrl: row.avatar_url || '',
        score: Number(row.avg_rp),
        formatted: `${Number(row.avg_rp)} RP`,
      }));

      return NextResponse.json(globalLeaderboard);
    }

    // Лидерборд конкретного режима — без изменений, уже был нормальный
    const scores = await prisma.reactionScore.findMany({
      where: { mode },
      orderBy: { bestMs: 'asc' },
      take: 50,
      include: { user: { select: { username: true, avatarUrl: true } } },
    });

    const leaderboard = scores.map((s) => ({
      id: s.id,
      username: s.user.username,
      avatarUrl: s.user.avatarUrl || '',
      score: s.bestMs,
      formatted: `${s.bestMs} ms`,
    }));

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
