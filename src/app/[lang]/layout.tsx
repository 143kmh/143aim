import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import BackgroundParticles from "../BackgroundParticles";
import Header from "@/components/Header";
import { getDictionary } from "@/dictionaries/getDictionary";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "143 Aim Club",
  description: "Ultimate platform for Aimbeast players and esports athletes",
};

// ИСПРАВЛЕНИЕ: Next.js 16 передаёт params как Promise<{ lang: string }>,
// а не Promise<{ lang: 'ru' | 'en' }>. Кастуем внутри функции.
type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

type Lang = 'ru' | 'en';

export default async function RootLayout({ children, params }: Props) {
  const { lang: rawLang } = await params;
  
  // Безопасный каст: если пришло что-то кроме 'ru'/'en' — фоллбэк на 'en'
  const lang: Lang = rawLang === 'ru' ? 'ru' : 'en';
  
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${inter.className} min-h-screen bg-night text-ivory antialiased selection:bg-imperial/40 selection:text-white`}>
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-imperial/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-imperial/5 blur-[100px] rounded-full" />
        </div>

        <BackgroundParticles />
        
        <Header dict={dict} lang={lang} />

        <main className="relative z-10 w-full max-w-[1920px] mx-auto min-h-[calc(100vh-64px)] flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}