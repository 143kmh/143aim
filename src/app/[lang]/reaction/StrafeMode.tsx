"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, Trophy } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, TARGET: 0x38bdf8 };

export default function StrafeMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const targetRef = useRef<PIXI.Graphics | null>(null);

  const engineState = useRef({ 
    status: 'idle',
    timeoutId: 0 as any, 
    offTargetTimeoutId: 0 as any,
    startTime: 0,
    isHovered: false,
    vx: 7, // Снижена базовая скорость для стабильного трекинга
    x: 0,                  
    hasDriftedOff: false,  
    trackedTime: 0,        
    requiredTrackTime: 2000 
  });

  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'tracking'|'reaction_phase'>('idle');
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
        antialias: true 
      });
      if (isDestroyed || !canvasContainerRef.current) { app.destroy(true); return; }
      
      canvasContainerRef.current.appendChild(app.canvas);
      appRef.current = app;

      const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
      bg.width = app.screen.width; bg.height = app.screen.height; bg.tint = COLORS.NIGHT;
      bg.eventMode = 'static';
      bg.cursor = 'crosshair';
      app.stage.addChild(bg);

      const target = new PIXI.Graphics();
      target.circle(0, 0, 30).fill(COLORS.TARGET);
      target.eventMode = 'static';
      target.cursor = 'crosshair';
      target.visible = false;

      target.on('pointerover', () => {
        const s = engineState.current;
        s.isHovered = true;
        
        // КРИТИЧЕСКИЙ ФИКС: Обязательно снимаем таймер наказания, если курсор вернулся
        if (s.offTargetTimeoutId) {
          clearTimeout(s.offTargetTimeoutId);
          s.offTargetTimeoutId = 0;
        }
        
        if (s.status === 'waiting') {
          changeStatus('tracking');
          s.trackedTime = 0; 
        }

        if (s.status === 'reaction_phase' && s.hasDriftedOff) {
          handleReactionSuccess();
        }
      });

      target.on('pointerout', () => {
        const s = engineState.current;
        s.isHovered = false;
        
        if (s.status === 'reaction_phase') {
          s.hasDriftedOff = true;
        }

        if (s.status === 'tracking' || s.status === 'reaction_phase') {
          // КРИТИЧЕСКИЙ ФИКС: Сбрасываем старый таймер перед запуском нового, чтобы избежать наслоения
          if (s.offTargetTimeoutId) clearTimeout(s.offTargetTimeoutId);
          
          s.offTargetTimeoutId = setTimeout(() => {
            if (!s.isHovered && (engineState.current.status === 'tracking' || engineState.current.status === 'reaction_phase')) {
              handleFail("TRACKING FAILED! STRAYED FROM TARGET.");
            }
          }, 800); // Увеличен буфер до 800мс для реалистичного окна доводки
        }
      });

      app.stage.addChild(target);
      targetRef.current = target;

      app.ticker.add((ticker) => {
        const s = engineState.current;
        if ((s.status === 'tracking' || s.status === 'reaction_phase') && targetRef.current) {
          
          s.x += s.vx * ticker.deltaTime;
          
          const paddingX = 50;
          if (s.x < paddingX) { s.x = paddingX; s.vx = -s.vx; }
          if (s.x > app.screen.width - paddingX) { s.x = app.screen.width - paddingX; s.vx = -s.vx; }

          targetRef.current.x = s.x;
          targetRef.current.y = app.screen.height / 2;

          if (s.status === 'tracking' && s.isHovered) {
            s.trackedTime += ticker.elapsedMS;
            
            const margin = 100;
            const canStrafe = s.x > margin && s.x < app.screen.width - margin;

            if (s.trackedTime >= s.requiredTrackTime && canStrafe) {
              triggerStrafe(); 
            }
          }
        }
      });

      const handleResize = () => { if (bg && appRef.current) { bg.width = appRef.current.screen.width; bg.height = appRef.current.screen.height; }};
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    initPixi();
    return () => {
      isDestroyed = true;
      if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
      if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
      if (appRef.current) { appRef.current.destroy(true, { children: true }); appRef.current = null; }
    };
  }, []);

  const changeStatus = (status: any) => {
    engineState.current.status = status; setUiStatus(status);
    if (status === 'idle' && targetRef.current) targetRef.current.visible = false;
  };

  const handleStart = () => {
    if (useReactionStore.getState().results.length >= 10) return;
    
    setErrorMsg(null);
    setLastTime(null);
    
    const s = engineState.current;
    s.x = appRef.current ? appRef.current.screen.width / 2 : 200;
    s.vx = Math.random() > 0.5 ? 7 : -7; 
    s.trackedTime = 0;
    s.isHovered = false;
    s.hasDriftedOff = false;
    s.requiredTrackTime = Math.floor(Math.random() * 1500) + 1500; 

    if (targetRef.current && appRef.current) {
      targetRef.current.position.set(s.x, appRef.current.screen.height / 2);
      targetRef.current.visible = true;
    }

    changeStatus('waiting');
  };

  const triggerStrafe = () => {
    const s = engineState.current;
    s.status = 'reaction_phase';
    setUiStatus('reaction_phase');
    s.vx = -s.vx * 1.05; // Снижен резкий рывок скорости
    s.startTime = performance.now(); 
    s.hasDriftedOff = !s.isHovered; 
  };

  const handleReactionSuccess = () => {
    const s = engineState.current;
    const reactionTime = Math.round(performance.now() - s.startTime);
    
    if (reactionTime < 100) {
      handleFail("IMPOSSIBLE REACTION TIME (< 100ms)");
      return;
    }

    setLastTime(reactionTime);
    state.addResult(reactionTime);

    const nextCount = useReactionStore.getState().results.length;
    if (nextCount < 10) {
      handleStart(); 
    } else {
      changeStatus('idle');
    }
  };

  const handleFail = (msg: string) => {
    setErrorMsg(msg);
    if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
    if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
    changeStatus('idle');
  };

  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'strafe', avgMs: avgTime }) })
      .then(res => res.json()).then(data => { if (data.isNewRecord) setIsNewPb(true); state.triggerRefresh(); }).catch(console.error);
    }
  }, [state.results.length]);

  const isFinished = state.results.length >= 10;

  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-imperial/40 shadow-glass-glow min-h-[400px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center z-10">
        {isFinished ? (
          <div className="bg-[#0b0812]/95 backdrop-blur-2xl border border-imperial/50 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(96,81,155,0.4)] animate-in zoom-in-95 duration-500 pointer-events-auto min-w-[320px]">
            {isNewPb && <div className="text-yellow-400 text-xs font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse"><Trophy size={14}/> NEW PERSONAL BEST!</div>}
            <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Strafe Test Complete</h2>
            <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">{avgTime} <span className="text-2xl text-lavender/50">ms</span></div>
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); changeStatus('idle'); }} className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer pointer-events-auto"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        ) : errorMsg ? (
          <div className="flex flex-col items-center gap-4 pointer-events-auto">
            <p className="text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2">
              <AlertTriangle size={16} /> {errorMsg}
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]"
            >
              RETRY ATTEMPT
            </button>
          </div>
        ) : uiStatus === 'idle' ? (
          <div className="flex flex-col items-center gap-4 pointer-events-auto">
            {lastTime !== null && (
              <p className="text-2xl font-bold text-lavender/80 tracking-wider">React: {lastTime} ms</p>
            )}
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]"
            >
              START STRAFE TEST
            </button>
          </div>
        ) : (
          <div className="absolute top-8 left-0 right-0 flex justify-center">
            {uiStatus === 'waiting' && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-purple-400 animate-pulse bg-purple-950/40 px-4 py-2 border border-purple-500/20 rounded">
                HOVER OVER THE TARGET TO BEGIN TRACKING
              </span>
            )}
            {(uiStatus === 'tracking' || uiStatus === 'reaction_phase') && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-purple-400 bg-purple-950/40 px-4 py-2 border border-purple-500/20 rounded">
                KEEP TRACKING THE TARGET!
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}