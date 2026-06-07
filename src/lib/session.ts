// Путь: src/lib/session.ts
// Вспомогательная функция: берёт токен из куки → находит сессию → возвращает userId.
// Используем во всех защищённых API-роутах вместо дублирования кода.

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getUserIdFromSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('auth_session')?.value;

  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionToken },
    select: { userId: true, expiresAt: true },
  });

  if (!session) return null;

  // Проверяем, не истекла ли сессия
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: sessionToken } }).catch(() => {});
    return null;
  }

  return session.userId;
}
