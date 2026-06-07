"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, Trophy } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, TARGET: 0x4ade80 };

export default function FlickMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const targetRef = useRef<PIXI.Graphics | null>(null);

  const engineState = useRef({ status: 'idle', timeoutId: 0 as any, startTime: 0 });
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

      // Фон
      const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
      bg.width = app.screen.width; bg.height = app.screen.height; bg.tint = COLORS.NIGHT;
      bg.eventMode = 'static';
      bg.cursor = 'crosshair'; // КУРСОР КРЕСТИК НА ФОНЕ
      
      bg.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        if (engineState.current.status === 'ready') {
          setErrorMsg("MISSED TARGET!"); changeStatus('idle'); 
        }
      });
      app.stage.addChild(bg);

      // Зеленая мишень
      const target = new PIXI.Graphics();
      target.circle(0, 0, 30).fill(COLORS.TARGET); 
      target.eventMode = 'static';
      target.cursor = 'crosshair'; // КУРСОР КРЕСТИК НА МИШЕНИ
      target.visible = false;
      
      target.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        handleTargetHit();
      });

      app.stage.addChild(target);
      targetRef.current = target;

      const handleResize = () => { if (bg && appRef.current) { bg.width = appRef.current.screen.width; bg.height = appRef.current.screen.height; }};
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeStatus = (status: any) => {
    engineState.current.status = status; setUiStatus(status);
    if (status === 'idle' && targetRef.current) targetRef.current.visible = false;
  };

  const spawnTarget = () => {
    if (!appRef.current || !targetRef.current) return;
    const w = appRef.current.screen.width;
    const h = appRef.current.screen.height;
    const padding = 50;
    
    const rx = Math.random() * (w - padding * 2) + padding;
    const ry = Math.random() * (h - padding * 2) + padding;
    
    targetRef.current.position.set(rx, ry);
    targetRef.current.visible = true;
    changeStatus('ready');
    engineState.current.startTime = performance.now();
  };

  const handleStart = () => {
    if (useReactionStore.getState().results.length >= 10) return;
    setErrorMsg(null); changeStatus('waiting');
    
    engineState.current.timeoutId = setTimeout(() => {
      spawnTarget();
    }, Math.floor(Math.random() * 1500) + 500);
  };

  const handleTargetHit = () => {
    const s = engineState.current;
    if (s.status === 'ready') {
      const reactionTime = Math.round(performance.now() - s.startTime);
      if (reactionTime < 100) { setErrorMsg("IMPOSSIBLE FLICK (< 100ms)"); changeStatus('idle'); return; }
      
      setLastTime(reactionTime); 
      state.addResult(reactionTime); 
      
      const nextCount = useReactionStore.getState().results.length;
      
      if (nextCount < 10) {
        if (targetRef.current) targetRef.current.visible = false;
        changeStatus('waiting');
        s.timeoutId = setTimeout(spawnTarget, Math.floor(Math.random() * 1500) + 500);
      } else {
        changeStatus('idle');
      }
    }
  };

  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'flick', avgMs: avgTime }) })
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
            <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Flick Test Complete</h2>
            <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">{avgTime} <span className="text-2xl text-lavender/50">ms</span></div>
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); changeStatus('idle'); }} className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        ) : (
          <>
            {uiStatus === 'idle' && (
              <button onClick={handleStart} className="pointer-events-auto px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]">
                START FLICK TEST
              </button>
            )}
            {uiStatus === 'idle' && lastTime !== null && !errorMsg && <p className="mt-6 text-2xl font-bold text-lavender/80 tracking-wider">Hit: {lastTime} ms</p>}
            {errorMsg && <p className="mt-6 text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2"><AlertTriangle size={16} /> {errorMsg}</p>}
          </>
        )}
      </div>
    </div>
  );
}