// Путь: src/app/api/auth/discord/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const redirectUri = encodeURIComponent(`${baseUrl}/api/auth/discord/callback`);

  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;

  return NextResponse.redirect(discordUrl);
}