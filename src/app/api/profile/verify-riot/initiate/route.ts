// Путь: src/app/api/profile/verify-riot/initiate/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { riotId } = await req.json();
    if (!riotId || !riotId.includes('#')) {
      return NextResponse.json(
        { error: 'Введите корректный Riot ID в формате Имя#Тег' },
        { status: 400 }
      );
    }

    const [name, tag] = riotId.split('#');
    const valApiKey = process.env.VALORANT_API_KEY;

    const res = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/account/${encodeURIComponent(name.trim())}/${encodeURIComponent(tag.trim())}`,
      { headers: { 'Authorization': valApiKey || '' } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Игрок не найден. Проверьте правильность написания Riot ID.' },
        { status: 404 }
      );
    }

    const accountData = await res.json();
    const cardId = accountData.data?.card?.id;
    const puuid = accountData.data?.puuid;

    if (!cardId || !puuid) {
      return NextResponse.json(
        { error: 'Не удалось получить данные карточки игрока.' },
        { status: 400 }
      );
    }

    // ИСПРАВЛЕНИЕ: Сохраняем originalCardId в БД, не отдаём клиенту.
    // Раньше клиент сам присылал originalCardId в confirm — можно было подделать.
    await prisma.user.update({
      where: { id: userId },
      data: { riotVerifyToken: cardId },
    });

    return NextResponse.json({ 
      success: true,
      riotId: `${accountData.data.name}#${accountData.data.tag}`,
      // cardId клиенту НЕ возвращаем
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
