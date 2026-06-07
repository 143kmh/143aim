// Путь: src/app/api/reaction/save/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/session";

// ИСПРАВЛЕНИЕ: Допустимые режимы — только известные, не любая строка от клиента.
const VALID_MODES = ['simple', 'choice', 'flick', 'strafe', 'combined'] as const;
type ValidMode = typeof VALID_MODES[number];

// ИСПРАВЛЕНИЕ: Физически невозможные значения отбрасываем.
// Человеческий минимум ~70ms, но оставляем запас до 50ms на случай идеальных условий.
// Максимум 2000ms — если больше, это просто не результат.
const MIN_MS = 50;
const MAX_MS = 2000;

// In-memory rate limit: не более 10 сохранений в минуту с одного userId.
// (Для продакшна лучше Redis, но для VPS с небольшим трафиком это ок)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 60_000 });
    return true; // ок
  }

  if (entry.count >= 10) {
    return false; // превышен лимит
  }

  entry.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit
    if (!checkRateLimit(userId)) {
      return NextResponse.json(
        { error: 'Слишком много запросов. Подождите минуту.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { mode, avgMs } = body;

    // ИСПРАВЛЕНИЕ: Проверяем что mode — известный режим, а не произвольная строка
    if (!mode || !VALID_MODES.includes(mode as ValidMode)) {
      return NextResponse.json({ error: 'Неверный режим' }, { status: 400 });
    }

    // ИСПРАВЛЕНИЕ: Проверяем что avgMs — число в физически возможном диапазоне
    if (
      typeof avgMs !== 'number' ||
      !Number.isFinite(avgMs) ||
      avgMs < MIN_MS ||
      avgMs > MAX_MS
    ) {
      return NextResponse.json(
        { error: `Недопустимое значение: ${MIN_MS}–${MAX_MS} ms` },
        { status: 400 }
      );
    }

    // Округляем до целых — дробные ms не имеют смысла
    const bestMs = Math.round(avgMs);

    const existing = await prisma.reactionScore.findUnique({
      where: { userId_mode: { userId, mode } },
    });

    // Сохраняем только если лучше предыдущего рекорда
    if (!existing || bestMs < existing.bestMs) {
      await prisma.reactionScore.upsert({
        where: { userId_mode: { userId, mode } },
        update: { bestMs },
        create: { userId, mode, bestMs },
      });
      return NextResponse.json({ success: true, isNewRecord: true });
    }

    return NextResponse.json({ success: true, isNewRecord: false });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
