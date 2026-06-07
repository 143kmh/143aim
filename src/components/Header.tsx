"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/app/[lang]/auth/useAuthStore';
import { Crosshair, Zap, BarChart2, LogIn, Loader2, User, Trophy, BookOpen } from 'lucide-react';

export default function Header({ dict, lang }: { dict: any, lang: string }) {
  const pathname = usePathname();
  const { user, isLoading, checkSession, login, logout } = useAuthStore();
  
  const [showSetup, setShowSetup] = useState(false);
  const [customName, setCustomName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (user && !user.hasCustomName) {
      setShowSetup(true);
    } else {
      setShowSetup(false);
    }
  }, [user]);

  const handleSetupName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/profile/setup-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: customName })
      });
      const data = await res.json();

      if (data.success) {
        setShowSetup(false);
        checkSession();
      } else {
        setErrorMsg(data.error || 'Ошибка сохранения');
      }
    } catch (e) {
      setErrorMsg('Системная ошибка. Попробуйте позже.');
    }
    setIsSubmitting(false);
  };

  const toggleLang = lang === 'ru' ? 'en' : 'ru';
  const newPath = pathname.replace(`/${lang}`, `/${toggleLang}`);

  const navLinks = [
    { href: `/${lang}/converter`, label: dict.header.converter, icon: <Crosshair size={14} /> },
    { href: `/${lang}/reaction`, label: dict.header.reaction, icon: <Zap size={14} /> },
    { href: `/${lang}/benchmarks`, label: dict.header.benchmarks, icon: <BarChart2 size={14} /> },
    { href: `/${lang}/tournaments`, label: dict.header.tournaments, icon: <Trophy size={14} /> },
    { href: `/${lang}/routines`, label: dict.header.routines, icon: <BookOpen size={14} /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#05020a]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* ЛОГО: иконка сердца + шрифт Orbitron */}
          <Link href={`/${lang}`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] rounded-lg flex items-center justify-center border border-purple-500/50 group-hover:shadow-[0_0_18px_rgba(124,58,237,0.7)] transition-all">
              {/* Сердце SVG фиолетовое */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </div>
            {/* Современный шрифт через Google Fonts inline */}
            <span 
              className="font-black text-ivory text-sm hidden sm:block tracking-widest"
              style={{ fontFamily: "'Orbitron', 'Rajdhani', 'Inter', sans-serif", letterSpacing: '0.15em' }}
            >
              143 AIM CLUB
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.includes(link.href);
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? 'bg-imperial/20 text-ivory border border-imperial/30 shadow-[0_0_15px_rgba(96,81,155,0.2)]' : 'text-lavender/60 hover:text-ivory hover:bg-white/5 border border-transparent'}`}
                >
                  {link.icon} {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link href={newPath} className="text-xs font-black text-lavender/50 hover:text-ivory hover:drop-shadow-[0_0_8px_#A985FF] transition-all uppercase tracking-widest">
              {toggleLang}
            </Link>
            <div className="w-[1px] h-6 bg-white/10" />

            {isLoading ? (
              <div className="flex items-center justify-center w-[120px]">
                <Loader2 size={16} className="text-imperial animate-spin" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <Link href={`/${lang}/profile`} className="text-xs font-bold text-ivory hover:text-imperial transition-colors cursor-pointer block">
                    {user.customName || user.username}
                  </Link>
                  <button onClick={(e) => { e.preventDefault(); logout(); }} className="text-[10px] text-lavender/50 hover:text-blood transition-colors uppercase font-bold tracking-widest flex items-center gap-1 justify-end w-full mt-0.5 cursor-pointer">
                    {dict.header.logout}
                  </button>
                </div>
                <Link href={`/${lang}/profile`}>
                  <img src={user.avatarUrl} alt="Avatar" className="w-9 h-9 rounded-lg border border-imperial/40 hover:border-imperial hover:shadow-[0_0_12px_rgba(96,81,155,0.5)] transition-all" />
                </Link>
              </div>
            ) : (
              <button 
                onClick={login}
                className="flex items-center gap-2 bg-[#171a21] hover:bg-[#2a475e] border border-[#2a475e] text-ivory px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <LogIn size={16} /> <span className="hidden sm:block">{dict.header.login_steam}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ONBOARDING MODAL */}
      {showSetup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-imperial/60 to-transparent max-w-md w-full shadow-glass-glow">
            <div className="bg-[#09090f]/95 rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-imperial/20 border border-imperial/50 rounded-xl flex items-center justify-center mx-auto text-imperial mb-4">
                  <User size={24} />
                </div>
                <h3 className="text-xl font-black text-ivory tracking-widest uppercase">CREATE UNIQUE PROFILE</h3>
                <p className="text-xs text-lavender mt-2 leading-relaxed">
                  Пожалуйста, введите ваш никнейм. Только английские буквы, цифры, знаки подчёркивания (_) и дефисы (-).
                </p>
              </div>
              <form onSubmit={handleSetupName} className="flex flex-col gap-4">
                <input type="text" maxLength={15} value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="e.g. AimGod_143" className="w-full bg-black/50 border border-imperial/30 hover:border-imperial/60 focus:border-imperial text-ivory rounded-lg p-3 text-sm font-bold outline-none text-center tracking-wider transition-all" />
                {errorMsg && <p className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded border border-red-500/20 text-center font-bold">{errorMsg}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-imperial/30 hover:bg-imperial/50 border border-imperial/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer">
                  {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : 'CONFIRM USERNAME'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}