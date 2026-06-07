"use client";

import React from 'react';
import { useReactionStore, ReactionMode } from './useReactionStore';
import { Activity, Zap, Settings2 } from 'lucide-react';
import ReactionLeaderboard from './ReactionLeaderboard';
import SimpleMode from './SimpleMode';
import ChoiceMode from './ChoiceMode';
import FlickMode from './FlickMode';
import CombinedMode from './CombinedMode';
import StrafeMode from './StrafeMode'; // Наш новый импорт!

export default function ReactionClient({ dict }: { dict: any }) {
  const state = useReactionStore();
  const avgTime = state.results.length > 0 ? Math.round(state.results.reduce((a, b) => a + b, 0) / state.results.length) : 0;

  const availableModes: ReactionMode[] = ['simple', 'choice', 'flick', 'combined', 'strafe'];

  const renderActiveEngine = () => {
    switch (state.mode) {
      case 'simple':   return <SimpleMode dict={dict} />;
      case 'choice':   return <ChoiceMode dict={dict} />;
      case 'flick':    return <FlickMode dict={dict} />;
      case 'combined': return <CombinedMode dict={dict} />;
      case 'strafe':   return <StrafeMode dict={dict} />; // Встраиваем движок
      default:
        return (
          <div className="flex-1 rounded-2xl border border-imperial/40 shadow-glass-glow bg-black/40 flex flex-col items-center justify-center p-6 text-center min-h-[400px]">
            <Settings2 size={48} className="text-imperial animate-spin-slow mb-4" />
            <h2 className="text-xl font-black text-ivory tracking-widest uppercase mb-2">UNDER CONSTRUCTION</h2>
            <p className="text-sm text-lavender">This cognitive mode is currently in development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 py-8 w-full max-w-[1200px] mx-auto min-h-[80vh] gap-6">
      
      {/* HEADER */}
      <div className="w-full flex items-center gap-4 bg-[#0b0812]/80 backdrop-blur-xl border border-imperial/30 p-5 rounded-2xl shadow-glass-glow">
        <div className="p-3 bg-imperial/20 rounded-xl border border-imperial/50 text-imperial">
          <Activity size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-[0.2em] text-ivory drop-shadow-[0_0_10px_rgba(240,235,224,0.3)] uppercase">{dict.reaction.title}</h1>
          <p className="text-lavender text-xs uppercase tracking-widest">{dict.reaction.desc}</p>
        </div>
      </div>

      {/* РЕЖИМЫ (TABS) */}
      <div className="w-full flex flex-wrap gap-2 bg-[#0b0812]/80 backdrop-blur-xl border border-white/5 p-2 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {availableModes.map((mode) => (
          <button key={mode} onClick={() => state.setMode(mode)} className={`flex-1 min-w-[120px] py-2.5 text-[11px] font-bold tracking-widest uppercase transition-all rounded-lg border ${state.mode === mode ? 'bg-imperial/40 border-imperial text-ivory shadow-[0_0_15px_rgba(96,81,155,0.3)]' : 'bg-transparent border-transparent text-lavender/50 hover:text-lavender hover:bg-white/5'}`}>
            {dict.reaction[`mode_${mode}`]}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-6 h-auto lg:h-[500px]">
        
        {/* АКТИВНЫЙ ДВИЖОК */}
        {renderActiveEngine()}

        {/* SIDEBAR (СТАТИСТИКА 10 ПОПЫТОК) */}
        <div className="w-full lg:w-[320px] bg-[#0b0812]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.8)] flex-shrink-0">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
            <Zap size={18} className="text-imperial" />
            <h3 className="text-sm font-bold text-ivory uppercase tracking-[0.15em]">{dict.reaction.attempts}</h3>
            <span className="ml-auto text-xs font-bold text-lavender/50">{state.results.length} / 10</span>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1 items-start content-start">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${state.results[i] ? 'bg-imperial/10 border-imperial/30 shadow-[inset_0_0_10px_rgba(96,81,155,0.1)]' : 'bg-black/40 border-white/5'}`}>
                <span className="text-[9px] font-bold text-lavender/40 uppercase">Try {i + 1}</span>
                <span className={`text-sm font-black tracking-wider ${state.results[i] ? 'text-ivory' : 'text-white/10'}`}>{state.results[i] ? `${state.results[i]}` : '---'}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-imperial/20 flex flex-col items-center justify-center bg-gradient-to-b from-imperial/10 to-transparent p-4 rounded-xl">
            <span className="text-[10px] font-bold text-lavender/70 uppercase tracking-[0.2em] mb-1">{dict.reaction.avg}</span>
            <div className="text-3xl font-black text-ivory drop-shadow-[0_0_10px_rgba(169,133,255,0.5)]">
              {avgTime > 0 ? avgTime : '0'} <span className="text-sm text-lavender/50 font-bold ml-1">{dict.reaction.ms}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ЛИДЕРБОРД */}
      <ReactionLeaderboard dict={dict} />
    </div>
  );
}