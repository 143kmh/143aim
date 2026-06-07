// Путь: src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('auth_session')?.value;

  // ИСПРАВЛЕНИЕ: удаляем сессию из БД, а не только куку.
  // Раньше при логауте токен оставался валидным в БД — 
  // кто перехватил куку до логаута, продолжал иметь доступ.
  if (sessionToken) {
    await prisma.session.delete({
      where: { id: sessionToken },
    }).catch(() => {
      // Если сессии уже нет в БД — не страшно, просто чистим куку
    });
  }

  cookieStore.delete('auth_session');
  return NextResponse.json({ success: true });
}
