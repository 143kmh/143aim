"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, Trophy, Target } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, GRAY: 0x2a2a35, YELLOW: 0xeab308, GREEN: 0x4ade80 };

export default function ChoiceMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const targetsRef = useRef<PIXI.Graphics[]>([]);

  const engineState = useRef({ 
    status: 'idle', 
    timeoutId: 0 as any, 
    yellowTimeoutId: 0 as any,
    startTime: 0, 
    correctIndex: -1,
    isGreen: false
  });

  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'ready'>('idle');
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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

      // Создаем ровно 2 Сферы (Левую и Правую)
      for (let i = 0; i < 2; i++) {
        const circle = new PIXI.Graphics();
        circle.circle(0, 0, 60).fill(COLORS.GRAY);
        circle.eventMode = 'static'; 
        circle.cursor = 'crosshair'; // КУРСОР КРЕСТИК НА СФЕРАХ
        
        circle.on('pointerdown', (e) => {
          if (!e.isTrusted) return;
          handleTargetClick(i);
        });

        app.stage.addChild(circle);
        targetsRef.current.push(circle);
      }

      const positionTargets = () => {
        if (!appRef.current) return;
        const w = appRef.current.screen.width; const h = appRef.current.screen.height;
        const spacing = w / 3;
        // Распределяем равномерно на 1/3 и 2/3 экрана
        targetsRef.current[0]?.position.set(spacing, h / 2);
        targetsRef.current[1]?.position.set(spacing * 2, h / 2);
      };
      
      positionTargets();
      window.addEventListener('resize', positionTargets);
      return () => window.removeEventListener('resize', positionTargets);
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (engineState.current.yellowTimeoutId) clearTimeout(engineState.current.yellowTimeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeStatus = (status: any) => {
    engineState.current.status = status; setUiStatus(status);
    if (status === 'idle' || status === 'waiting') {
      targetsRef.current.forEach(t => { t.clear(); t.circle(0, 0, 60).fill(COLORS.GRAY); });
    }
  };

  const spawnChoice = () => {
    const s = engineState.current;
    s.correctIndex = Math.floor(Math.random() * 2); // 0 или 1
    s.isGreen = Math.random() > 0.3; // 70% Зеленый, 30% Желтый
    
    targetsRef.current.forEach((t, i) => {
      t.clear();
      t.circle(0, 0, 60).fill(i === s.correctIndex ? (s.isGreen ? COLORS.GREEN : COLORS.YELLOW) : COLORS.GRAY);
    });
    
    changeStatus('ready');
    s.startTime = performance.now();

    if (!s.isGreen) {
      s.yellowTimeoutId = setTimeout(() => {
        if (engineState.current.status === 'ready') {
          changeStatus('waiting');
          s.timeoutId = setTimeout(spawnChoice, Math.floor(Math.random() * 1500) + 500);
        }
      }, 1000);
    }
  };

  const handleStart = () => {
    if (useReactionStore.getState().results.length >= 10) return;
    setErrorMsg(null); changeStatus('waiting');
    engineState.current.timeoutId = setTimeout(spawnChoice, Math.floor(Math.random() * 2000) + 1000);
  };

  const handleTargetClick = (index: number) => {
    const s = engineState.current;
    
    if (s.status === 'waiting') {
      clearTimeout(s.timeoutId);
      setErrorMsg("TOO EARLY! RESTARTING...");
      state.resetResults(); 
      changeStatus('idle');
    } else if (s.status === 'ready') {
      if (index === s.correctIndex) {
        if (s.isGreen) {
          const reactionTime = Math.round(performance.now() - s.startTime);
          if (reactionTime < 120) { setErrorMsg("IMPOSSIBLE REACTION (< 120ms)"); state.resetResults(); changeStatus('idle'); return; }
          
          setLastTime(reactionTime); 
          state.addResult(reactionTime);
          
          const nextCount = useReactionStore.getState().results.length;
          if (nextCount < 10) {
            changeStatus('waiting');
            s.timeoutId = setTimeout(spawnChoice, Math.floor(Math.random() * 1500) + 500);
          } else {
            changeStatus('idle');
          }
        } else {
          clearTimeout(s.yellowTimeoutId);
          setErrorMsg("FAILED! YOU CLICKED YELLOW. RESTARTING...");
          state.resetResults();
          changeStatus('idle');
        }
      } else {
        clearTimeout(s.yellowTimeoutId);
        setErrorMsg("WRONG TARGET! RESTARTING...");
        state.resetResults();
        changeStatus('idle');
      }
    }
  };

  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'choice', avgMs: avgTime }) })
      .then(res => res.json()).then(data => { if (data.isNewRecord) setIsNewPb(true); state.triggerRefresh(); }).catch(console.error);
    }
  }, [state.results.length]);

  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-imperial/40 shadow-glass-glow min-h-[400px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center z-10">
        {state.results.length >= 10 ? (
          <div className="bg-[#0b0812]/95 backdrop-blur-2xl border border-imperial/50 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(96,81,155,0.4)] animate-in zoom-in-95 duration-500 pointer-events-auto min-w-[320px]">
            {isNewPb && <div className="text-yellow-400 text-xs font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse"><Trophy size={14}/> NEW PERSONAL BEST!</div>}
            <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Choice Test Complete</h2>
            <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">{avgTime} <span className="text-2xl text-lavender/50">ms</span></div>
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); changeStatus('idle'); }} className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        ) : (
          <>
            {uiStatus === 'idle' && (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase bg-black/60 p-4 rounded-xl border border-white/5">
                  <span className="flex items-center gap-2 text-green-400"><Target size={16}/> CLICK GREEN</span>
                  <span className="text-white/20">|</span>
                  <span className="flex items-center gap-2 text-yellow-400 font-bold"><AlertTriangle size={16}/> IGNORE YELLOW</span>
                </div>
                <button onClick={handleStart} className="pointer-events-auto px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]">
                  START CHOICE TEST
                </button>
              </div>
            )}
            {uiStatus === 'idle' && lastTime !== null && !errorMsg && <p className="mt-6 text-2xl font-bold text-lavender/80 tracking-wider">Hit: {lastTime} ms</p>}
            {errorMsg && <p className="mt-6 text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2"><AlertTriangle size={16} /> {errorMsg}</p>}
          </>
        )}
      </div>
    </div>
  );
}