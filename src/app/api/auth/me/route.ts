// Путь: src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('auth_session')?.value;

  if (!sessionToken) return NextResponse.json({ user: null });

  // ИСПРАВЛЕНИЕ: ищем сессию по токену, а через неё — пользователя.
  // Раньше токен == user.id, что давало прямой доступ к аккаунту по UUID.
  const session = await prisma.session.findUnique({
    where: { id: sessionToken },
    include: {
      user: {
        select: {
          id: true,
          steamId: true,
          username: true,
          customName: true,
          hasCustomName: true,
          avatarUrl: true,
        },
      },
    },
  });

  // Проверяем что сессия существует и не истекла
  if (!session || session.expiresAt < new Date()) {
    // Если сессия протухла — удаляем её из БД и чистим куку
    if (session) {
      await prisma.session.delete({ where: { id: sessionToken } }).catch(() => {});
    }
    const cookieStore2 = await cookies();
    cookieStore2.delete('auth_session');
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: session.user });
}
