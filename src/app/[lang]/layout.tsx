import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "../globals.css";
import BackgroundParticles from "../BackgroundParticles";
import Header from "@/components/Header";
import { getDictionary } from "@/dictionaries/getDictionary";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap"
});

export const metadata: Metadata = {
  title: "143 Aim Club",
  description: "Ultimate platform for Aimbeast players and esports athletes",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

type Lang = 'ru' | 'en';

export default async function RootLayout({ children, params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === 'ru' ? 'ru' : 'en';
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${inter.className} ${orbitron.variable} min-h-screen bg-night text-ivory antialiased selection:bg-imperial/40 selection:text-white`}>
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