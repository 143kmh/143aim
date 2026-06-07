// Путь: src/app/api/auth/discord/callback/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    if (!code) return NextResponse.redirect(new URL('/profile?error=no_code', request.url));

    const userId = await getUserIdFromSession();
    if (!userId) return NextResponse.redirect(new URL('/?error=unauthorized', request.url));

    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/auth/discord/callback`;

    // 1. Обмениваем временный код на токен
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId || '',
        client_secret: clientSecret || '',
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return NextResponse.redirect(new URL('/profile?error=token_failed', request.url));
    }

    // 2. Получаем ID пользователя Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const discordUser = await userResponse.json();

    if (!discordUser.id) {
      return NextResponse.redirect(new URL('/profile?error=user_failed', request.url));
    }

    // 3. Записываем в базу данных
    await prisma.user.update({
      where: { id: userId },
      data: {
        discordId: `${discordUser.username}#${discordUser.discriminator !== '0' ? discordUser.discriminator : discordUser.id.slice(-4)}`
      },
    });

    return NextResponse.redirect(new URL('/profile?success=discord_linked', request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/profile?error=internal', request.url));
  }
}
