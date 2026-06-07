// Путь: src/app/api/profile/verify-riot/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const DEFAULT_CARD_ID = "910ace70-4d3b-3c53-2c55-5f9fa179caa8"; // Системный ID стандартной карточки Valorant

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { riotId } = await req.json();
    if (!riotId || !riotId.includes('#')) {
      return NextResponse.json({ error: 'Введите корректный Riot ID в формате Имя#Тег' }, { status: 400 });
    }

    const [name, tag] = riotId.split('#');
    const valApiKey = process.env.VALORANT_API_KEY;

    // Запрашиваем информацию об аккаунте по нику через бесплатный API
    const res = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURIComponent(name.trim())}/${encodeURIComponent(tag.trim())}`, {
      headers: { 'Authorization': valApiKey || '' }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Игрок не найден. Проверьте правильность написания Riot ID.' }, { status: 404 });
    }

    const accountData = await res.json();
    const cardId = accountData.data?.card?.id;
    const puuid = accountData.data?.puuid;

    if (!cardId || !puuid) {
      return NextResponse.json({ error: 'Не удалось получить данные карточки игрока.' }, { status: 400 });
    }

    // === ПРОВЕРКА КАРТОЧКИ (АНТИ-ФРОД) ===
    if (cardId !== DEFAULT_CARD_ID) {
      return NextResponse.json({ 
        error: 'Верификация не пройдена. Пожалуйста, зайдите в Valorant, экипируйте стандартную карточку (Default Card) и попробуйте снова.' 
      }, { status: 400 });
    }

    // Проверяем, не привязан ли этот аккаунт кем-то другим
    const existing = await prisma.user.findUnique({
      where: { riotPuuid: puuid }
    });

    if (existing && existing.id !== sessionId) {
      return NextResponse.json({ error: 'Этот аккаунт Valorant уже привязан к другому профилю 143 Aim Club.' }, { status: 400 });
    }

    // Если всё совпало — привязываем PUUID и Riot ID
    await prisma.user.update({
      where: { id: sessionId },
      data: {
        riotId: `${accountData.data.name}#${accountData.data.tag}`,
        riotPuuid: puuid
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}