// Путь: src/app/api/profile/verify-riot/confirm/route.ts
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
    if (!riotId) {
      return NextResponse.json({ error: 'Недостаточно данных для верификации.' }, { status: 400 });
    }

    // ИСПРАВЛЕНИЕ: originalCardId берём из БД, а не от клиента
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { riotVerifyToken: true },
    });

    if (!user?.riotVerifyToken) {
      return NextResponse.json(
        { error: 'Сначала запустите шаг 1 верификации.' },
        { status: 400 }
      );
    }

    const originalCardId = user.riotVerifyToken;

    const [name, tag] = riotId.split('#');
    const valApiKey = process.env.VALORANT_API_KEY;

    const res = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/account/${encodeURIComponent(name.trim())}/${encodeURIComponent(tag.trim())}`,
      { headers: { 'Authorization': valApiKey || '' } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Игрок не найден.' }, { status: 404 });
    }

    const accountData = await res.json();
    const currentCardId = accountData.data?.card?.id;
    const puuid = accountData.data?.puuid;

    if (!currentCardId || !puuid) {
      return NextResponse.json(
        { error: 'Не удалось получить текущую карточку.' },
        { status: 400 }
      );
    }

    if (currentCardId === originalCardId) {
      return NextResponse.json({ 
        error: 'Верификация отклонена. Вы не изменили вашу карточку игрока (Player Card) в клиенте Valorant.' 
      }, { status: 400 });
    }

    // Проверяем уникальность PUUID
    const existing = await prisma.user.findUnique({
      where: { riotPuuid: puuid },
    });

    if (existing && existing.id !== userId) {
      return NextResponse.json(
        { error: 'Этот аккаунт Valorant уже привязан к другому профилю.' },
        { status: 400 }
      );
    }

    // Успех! Записываем данные и очищаем токен верификации
    await prisma.user.update({
      where: { id: userId },
      data: {
        riotId: `${accountData.data.name}#${accountData.data.tag}`,
        riotPuuid: puuid,
        riotVerifyToken: null, // Токен больше не нужен
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
