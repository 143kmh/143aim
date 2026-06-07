// Путь: src/app/api/profile/verify-ow/initiate/route.ts
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
    if (!owId || !owId.includes('#')) {
      return NextResponse.json(
        { error: 'Введите корректный BattleTag в формате Nickname#1234' },
        { status: 400 }
      );
    }

    const overwatchId = owId.replace('#', '-');
    const owRes = await fetch(
      `https://overfast-api.tekrop.fr/players/${encodeURIComponent(overwatchId)}/summary`
    );

    if (!owRes.ok) {
      return NextResponse.json(
        { error: 'Игрок не найден. Проверьте правильность написания BattleTag.' },
        { status: 404 }
      );
    }

    const owData = await owRes.json();
    const avatar = owData.avatar || '';

    // ИСПРАВЛЕНИЕ: Раньше originalAvatar возвращался клиенту и он же присылал его обратно.
    // Это позволяло подделать значение и пройти верификацию без смены аватара.
    // Теперь сохраняем токен верификации в БД — клиент его не видит и не может подменить.
    await prisma.user.update({
      where: { id: userId },
      data: { owVerifyToken: avatar },
    });

    return NextResponse.json({ 
      success: true,
      owId, // Возвращаем только BattleTag, аватар клиенту не отдаём
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
