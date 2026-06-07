import Link from "next/link";
import { getDictionary } from "@/dictionaries/getDictionary";
import { Crosshair, Zap, ChevronRight, Lock } from "lucide-react";

type Props = {
  params: Promise<{ lang: 'en' | 'ru' }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 py-20 min-h-[80vh]">
      
      {/* HEADER ТЕКСТ */}
      <div className="text-center mb-16 animate-in slide-in-from-bottom-4 fade-in duration-700">
        <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-b from-white to-imperial drop-shadow-[0_0_20px_rgba(169,133,255,0.4)] uppercase mb-4">
          {dict.home.title}
        </h1>
        <p className="text-lavender uppercase tracking-widest text-sm md:text-base font-bold">
          {dict.home.subtitle}
        </p>
      </div>

      {/* СЕТКА МОДУЛЕЙ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* КАРТОЧКА: CONVERTER */}
        <Link href={`/${lang}/converter`} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-imperial/40 to-transparent hover:from-imperial hover:shadow-[0_0_30px_rgba(169,133,255,0.3)] transition-all duration-500 overflow-hidden block">
          <div className="absolute top-0 right-0 w-32 h-32 bg-imperial/20 blur-[50px] group-hover:bg-imperial/40 transition-all pointer-events-none" />
          <div className="bg-[#0b0812]/95 backdrop-blur-xl rounded-[calc(1rem-1px)] p-8 h-full flex flex-col items-start gap-4">
            <div className="p-4 bg-imperial/10 rounded-xl border border-imperial/30 text-imperial group-hover:scale-110 transition-transform duration-500">
              <Crosshair size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black text-ivory tracking-widest uppercase mb-2">{dict.home.mod_converter_title}</h2>
              <p className="text-sm font-medium text-lavender/70">{dict.home.mod_converter_desc}</p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-imperial uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              ENTER MODULE <ChevronRight size={14} />
            </div>
          </div>
        </Link>

        {/* КАРТОЧКА: REACTION TESTER (Будущий модуль 2) */}
        <Link href={`/${lang}/reaction`} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-imperial/40 to-transparent hover:from-imperial hover:shadow-[0_0_30px_rgba(169,133,255,0.3)] transition-all duration-500 overflow-hidden block">
          <div className="absolute top-0 left-0 w-32 h-32 bg-imperial/20 blur-[50px] group-hover:bg-imperial/40 transition-all pointer-events-none" />
          <div className="bg-[#0b0812]/95 backdrop-blur-xl rounded-[calc(1rem-1px)] p-8 h-full flex flex-col items-start gap-4 relative">
            <div className="p-4 bg-imperial/10 rounded-xl border border-imperial/30 text-imperial group-hover:scale-110 transition-transform duration-500">
              <Zap size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black text-ivory tracking-widest uppercase mb-2">{dict.home.mod_reaction_title}</h2>
              <p className="text-sm font-medium text-lavender/70">{dict.home.mod_reaction_desc}</p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-imperial uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              ENTER MODULE <ChevronRight size={14} />
            </div>
          </div>
        </Link>

        {/* КАРТОЧКА: BENCHMARKS (Заглушка) */}
        <div className="md:col-span-2 relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-60">
          <div className="bg-[#0b0812]/95 backdrop-blur-xl rounded-[calc(1rem-1px)] p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-lavender/50">
                <Lock size={32} />
              </div>
              <div>
                <h2 className="text-xl font-black text-ivory/50 tracking-widest uppercase mb-1">Aimbeast Benchmarks</h2>
                <p className="text-sm font-medium text-lavender/40">Global leaderboard & tier progression</p>
              </div>
            </div>
            <div className="px-4 py-2 border border-white/10 rounded-lg text-xs font-bold text-lavender/50 tracking-widest uppercase">
              {dict.home.coming_soon}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}