"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, ShieldAlert, Trophy } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, BLOOD_WINE: 0x722f37, SUCCESS: 0x4ade80, IMPERIAL: 0x60519b };

export default function SimpleMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  const engineState = useRef({ status: 'idle', timeoutId: 0 as any, startTime: 0 });
  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'ready'|'early'|'finished'>('idle');
  const [lastTime, setLastTime] = useState<number | null>(null);
  
  const [cheatReason, setCheatReason] = useState<string | null>(null);
  const [robotDetected, setRobotDetected] = useState(false);
  const [isNewPb, setIsNewPb] = useState(false);

  const avgTime = state.results.length > 0 ? Math.round(state.results.reduce((a, b) => a + b, 0) / state.results.length) : 0;

  useEffect(() => {
    let isDestroyed = false;
    const initPixi = async () => {
      if (!canvasContainerRef.current) return;
      const app = new PIXI.Application();
      await app.init({ 
        resizeTo: canvasContainerRef.current, 
        backgroundColor: COLORS.NIGHT, 
        resolution: window.devicePixelRatio || 1, 
        autoDensity: true,
        antialias: true // ВКЛЮЧЕНО СГЛАЖИВАНИЕ
      });
      if (isDestroyed || !canvasContainerRef.current) { app.destroy(true); return; }
      
      canvasContainerRef.current.appendChild(app.canvas);
      appRef.current = app;

      app.canvas.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        if (!e.isTrusted) { setCheatReason("SOFTWARE SCRIPT DETECTED"); changeEngineStatus('idle', COLORS.NIGHT); return; }
        handleEngineClick();
      });
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeEngineStatus = (status: any, color: number) => {
    engineState.current.status = status; setUiStatus(status);
    if (appRef.current) appRef.current.renderer.background.color = color;
  };

  const handleEngineClick = () => {
    const s = engineState.current;
    if (state.results.length >= 10) return;

    if (s.status === 'idle' || s.status === 'early') {
      setCheatReason(null); changeEngineStatus('waiting', COLORS.BLOOD_WINE);
      s.timeoutId = setTimeout(() => { changeEngineStatus('ready', COLORS.SUCCESS); s.startTime = performance.now(); }, Math.floor(Math.random() * 3000) + 2000);
    } else if (s.status === 'waiting') {
      clearTimeout(s.timeoutId); changeEngineStatus('early', COLORS.BLOOD_WINE); setLastTime(null);
    } else if (s.status === 'ready') {
      const reactionTime = Math.round(performance.now() - s.startTime);
      if (reactionTime < 95) { setCheatReason("IMPOSSIBLE REACTION (< 95ms)"); changeEngineStatus('idle', COLORS.NIGHT); return; }
      setLastTime(reactionTime); state.addResult(reactionTime); changeEngineStatus('idle', COLORS.NIGHT);
    }
  };

  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'simple', avgMs: avgTime }) })
      .then(res => res.json()).then(data => { if (data.isNewRecord) setIsNewPb(true); state.triggerRefresh(); }).catch(console.error);
    }
  }, [state.results.length]);

  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-imperial/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] min-h-[400px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center">
        {state.results.length >= 10 ? (
          <div className="bg-[#0b0812]/95 backdrop-blur-2xl border border-imperial/50 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(96,81,155,0.4)] animate-in zoom-in-95 duration-500 pointer-events-auto min-w-[320px]">
            {robotDetected ? (
              <div className="flex flex-col items-center gap-4 text-red-500">
                <ShieldAlert size={48} />
                <h2 className="text-xl font-black tracking-widest uppercase">MACRO DETECTED</h2>
                <p className="text-sm text-lavender max-w-sm">Variance &lt; 3ms. Result blocked.</p>
              </div>
            ) : (
              <>
                {isNewPb && <div className="text-yellow-400 text-xs font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse"><Trophy size={14}/> NEW PERSONAL BEST!</div>}
                <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Test Complete</h2>
                <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">
                  {avgTime} <span className="text-2xl text-lavender/50">ms</span>
                </div>
              </>
            )}
            
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); setRobotDetected(false); changeEngineStatus('idle', COLORS.NIGHT); }} 
                    className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer">
              <RotateCcw size={18} /> PLAY AGAIN
            </button>
          </div>
        ) : (
          <>
            <h2 className={`text-4xl md:text-5xl font-black tracking-widest uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] transition-all ${uiStatus === 'ready' ? 'text-white scale-110' : 'text-white/90'}`}>
              {uiStatus === 'idle' && !cheatReason && dict.reaction.click_to_start}
              {uiStatus === 'waiting' && dict.reaction.wait}
              {uiStatus === 'ready' && dict.reaction.click_now}
              {uiStatus === 'early' && dict.reaction.too_soon}
              {cheatReason && cheatReason}
            </h2>
            {uiStatus === 'idle' && lastTime !== null && !cheatReason && <p className="mt-4 text-2xl font-bold text-lavender/80 tracking-wider">{lastTime} ms</p>}
            {cheatReason && <p className="mt-4 text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2 pointer-events-auto"><AlertTriangle size={16} /> Click to retry.</p>}
          </>
        )}
      </div>
    </div>
  );
}