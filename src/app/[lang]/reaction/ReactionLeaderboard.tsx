"use client";

import React, { useEffect, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { Trophy, Globe, User, Settings2 } from 'lucide-react';

export default function ReactionLeaderboard({ dict }: { dict: any }) {
  const state = useReactionStore();
  const [tab, setTab] = useState<'current' | 'global'>('current');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      setIsLoading(true);
      try {
        const modeQuery = tab === 'global' ? 'global' : state.mode;
        const res = await fetch(`/api/reaction/leaderboard?mode=${modeQuery}`);
        const json = await res.json();
        if (Array.isArray(json)) setData(json);
        else setData([]);
      } catch (e) {
        console.error(e);
        setData([]);
      }
      setIsLoading(false);
    };

    fetchBoard();
  }, [state.mode, tab, state.refreshTrigger]); // Реагирует на триггер автосохранения!

  return (
    <div className="w-full mt-4 bg-[#0b0812]/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-imperial/20 rounded-lg border border-imperial/40 text-imperial">
            <Trophy size={20} />
          </div>
          <h2 className="text-lg font-black text-ivory tracking-widest uppercase">Leaderboard</h2>
        </div>
        
        <div className="flex bg-black/60 p-1 rounded-xl border border-white/5 relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] w-full sm:w-[300px]">
          <button onClick={() => setTab('current')} className={`flex-1 py-2 text-[10px] font-bold tracking-widest z-10 transition-colors uppercase ${tab === 'current' ? 'text-ivory' : 'text-lavender/50 hover:text-lavender'}`}>
            Mode: {dict.reaction[`mode_${state.mode}`]}
          </button>
          <button onClick={() => setTab('global')} className={`flex-1 py-2 text-[10px] font-bold tracking-widest z-10 transition-colors uppercase flex items-center justify-center gap-1 ${tab === 'global' ? 'text-ivory' : 'text-lavender/50 hover:text-lavender'}`}>
            <Globe size={12} /> GLOBAL
          </button>
          <div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-b from-imperial/60 to-imperial/10 border border-imperial/40 rounded-lg transition-all" style={{ left: tab === 'current' ? '4px' : 'calc(50%)' }} />
        </div>
      </div>

      <div className="p-0 min-h-[200px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-12"><Settings2 size={24} className="text-imperial animate-spin" /></div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-lavender/50">
            <Trophy size={32} className="mb-2 opacity-50" />
            <p className="text-sm font-bold uppercase tracking-widest">No records yet. Be the first!</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-bold text-lavender/50 uppercase tracking-widest w-16 text-center">Rank</th>
                <th className="px-6 py-4 text-[10px] font-bold text-lavender/50 uppercase tracking-widest">Player</th>
                <th className="px-6 py-4 text-[10px] font-bold text-lavender/50 uppercase tracking-widest text-right">{tab === 'global' ? 'Reaction Power' : 'Average Time'}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                let rankColor = "text-lavender/40";
                if (index === 0) rankColor = "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]";
                else if (index === 1) rankColor = "text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]";
                else if (index === 2) rankColor = "text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.5)]";

                return (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className={`px-6 py-4 text-sm font-black text-center ${rankColor}`}>#{index + 1}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      {row.avatarUrl ? <img src={row.avatarUrl} alt="" className="w-8 h-8 rounded border border-white/10" /> : <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center"><User size={14} className="text-lavender/50" /></div>}
                      <span className="text-sm font-bold text-ivory">{row.username}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-black text-imperial drop-shadow-[0_0_5px_rgba(96,81,155,0.4)] bg-imperial/10 px-3 py-1 rounded border border-imperial/20">{row.formatted}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}