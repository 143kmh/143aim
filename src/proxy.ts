import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'ru'];
const defaultLocale = 'en';

// Обратите внимание: функция теперь называется proxy!
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Проверяем, есть ли уже язык в ссылке
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
 
  // Если языка нет, перекидываем на английский по умолчанию
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
 
export const config = {
  matcher: [
    // Игнорируем системные пути Next.js и картинки
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};