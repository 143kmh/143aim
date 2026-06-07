// Путь: src/app/[lang]/components/ComingSoon.tsx
"use client";

import React from 'react';
import { Settings2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center max-w-md mx-auto">
      <div className="p-4 bg-imperial/10 border border-imperial/30 text-imperial rounded-2xl mb-6 shadow-[0_0_20px_rgba(96,81,155,0.2)] animate-pulse">
        <Settings2 size={48} className="animate-spin" style={{ animationDuration: '4s' }} />
      </div>
      <h1 className="text-2xl font-black text-ivory tracking-widest uppercase mb-2">{title}</h1>
      <p className="text-xs text-lavender uppercase tracking-widest mb-8 leading-relaxed">
        Этот раздел находится в стадии закрытой бета-разработки.<br/>
        Следите за обновлениями в Discord!
      </p>
      <Link href="/" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-xs font-bold text-lavender hover:text-ivory hover:border-imperial hover:bg-imperial/10 transition-all cursor-pointer">
        <ArrowLeft size={14} /> Back to Hub
      </Link>
    </div>
  );
}