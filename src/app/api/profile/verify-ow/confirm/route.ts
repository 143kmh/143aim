// Путь: src/app/api/profile/verify-ow/confirm/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { owId } = await req.json();
    if (!owId) {
      return NextResponse.json({ error: 'Недостаточно данных для верификации.' }, { status: 400 });
    }

    // ИСПРАВЛЕНИЕ: originalAvatar берём из БД, а не от клиента.
    // Раньше клиент сам присылал originalAvatar — любой мог прислать заведомо 
    // отличное значение и пройти верификацию без реальной смены аватара.
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { owVerifyToken: true },
    });

    if (!user?.owVerifyToken) {
      return NextResponse.json(
        { error: 'Сначала запустите шаг 1 верификации.' },
        { status: 400 }
      );
    }

    const originalAvatar = user.owVerifyToken;

    const overwatchId = owId.replace('#', '-');
    const owRes = await fetch(
      `https://overfast-api.tekrop.fr/players/${encodeURIComponent(overwatchId)}/summary`
    );

    if (!owRes.ok) {
      return NextResponse.json({ error: 'Игрок не найден.' }, { status: 404 });
    }

    const owData = await owRes.json();
    const currentAvatar = owData.avatar || '';

    if (currentAvatar === originalAvatar) {
      return NextResponse.json({ 
        error: 'Верификация отклонена. Вы не изменили иконку вашего профиля (Avatar) в клиенте Overwatch 2.' 
      }, { status: 400 });
    }

    // Проверяем уникальность BattleTag
    const existing = await prisma.user.findFirst({
      where: { owId },
    });

    if (existing && existing.id !== userId) {
      return NextResponse.json(
        { error: 'Этот BattleTag уже привязан к другому профилю.' },
        { status: 400 }
      );
    }

    // Успех! Записываем BattleTag и очищаем токен верификации
    await prisma.user.update({
      where: { id: userId },
      data: { 
        owId,
        owVerifyToken: null, // Токен больше не нужен
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
