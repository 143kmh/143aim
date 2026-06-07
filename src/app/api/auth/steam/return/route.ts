// Путь: src/app/api/auth/steam/return/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 1. Проверяем подлинность ответа через серверы Steam
    const verifyParams = new URLSearchParams();
    verifyParams.append('openid.ns', 'http://specs.openid.net/auth/2.0');
    verifyParams.append('openid.mode', 'check_authentication');
    searchParams.forEach((value, key) => {
      if (key !== 'openid.mode') verifyParams.append(key, value);
    });

    const verifyRes = await fetch('https://steamcommunity.com/openid/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyParams.toString(),
    });

    const verifyText = await verifyRes.text();
    if (!verifyText.includes('is_valid:true')) {
      return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
    }

    // 2. Достаем 64-битный Steam ID
    const claimedId = searchParams.get('openid.claimed_id') || '';
    const steamIdMatch = claimedId.match(/\/id\/(\d+)$/);
    const steamId = steamIdMatch ? steamIdMatch[1] : null;
    if (!steamId) {
      return NextResponse.redirect(new URL('/?error=no_steam_id', request.url));
    }

    // 3. Скачиваем аватарку и ник через Steam API
    const apiKey = process.env.STEAM_API_KEY;
    const profileRes = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
    );
    const profileData = await profileRes.json();
    const player = profileData.response.players[0];
    if (!player) {
      return NextResponse.redirect(new URL('/?error=no_profile', request.url));
    }

    // 4. Сохраняем / обновляем пользователя в БД
    const user = await prisma.user.upsert({
      where: { steamId },
      update: { username: player.personaname, avatarUrl: player.avatarfull },
      create: { steamId, username: player.personaname, avatarUrl: player.avatarfull },
    });

    // 5. ИСПРАВЛЕНИЕ: Создаём запись Session с отдельным случайным токеном.
    //    Раньше в куки писался user.id — это давало любому знающему UUID доступ к аккаунту.
    //    Теперь токен сессии — отдельный UUID, не связанный с user.id напрямую.
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        // Сессия живёт 30 дней
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    // 6. Пишем в куки токен сессии (session.id, а не user.id)
    const cookieStore = await cookies();
    cookieStore.set('auth_session', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 дней
      path: '/',
      sameSite: 'lax',
    });

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/?error=internal', request.url));
  }
}
