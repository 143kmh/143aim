// Путь: src/app/api/profile/setup-username/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username } = await req.json();
    
    const usernameRegex = /^[a-zA-Z0-9_\-]+$/;
    
    if (!username || username.length < 3 || username.length > 15) {
      return NextResponse.json(
        { error: 'Длина ника должна быть от 3 до 15 символов' },
        { status: 400 }
      );
    }

    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: 'Только английские буквы, цифры, знаки подчёркивания (_) и дефисы (-)' },
        { status: 400 }
      );
    }

    // ИСПРАВЛЕНИЕ: Убираем предварительный findUnique + update.
    // Между ними была гонка: два запроса одновременно проходили проверку 
    // и оба делали update с одним ником. Схема имеет @unique — Prisma бросает P2002.
    // Теперь просто ловим эту ошибку — атомарно и без гонки.
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          customName: username,
          hasCustomName: true,
        },
      });
    } catch (e: unknown) {
      // P2002 = нарушение unique constraint = ник уже занят
      if (
        typeof e === 'object' && e !== null &&
        'code' in e && (e as { code: string }).code === 'P2002'
      ) {
        return NextResponse.json(
          { error: 'Этот никнейм уже занят другим игроком' },
          { status: 400 }
        );
      }
      throw e; // Неизвестная ошибка — пробрасываем дальше
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
