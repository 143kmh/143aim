import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'ru'];
const defaultLocale = 'en';

// Функция обрабатывает входящие запросы и настраивает локализацию (языковые префиксы)
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Проверяем, есть ли уже язык (en или ru) в начале пути ссылки
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
 
  // Если префикса языка нет, принудительно перенаправляем на английскую версию по умолчанию
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
 
export const config = {
  matcher: [
    // Регулярное выражение (фильтр): перехватывать ВСЕ пути, КРОМЕ указанных в скобках после знака ?!
    // Мы добавили "riot\\.txt" в этот список исключений
    '/((?!_next/static|_next/image|favicon.ico|api|ranks|riot\\.txt).*)',
  ],
};
