"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReactionStore } from './useReactionStore';
import { useAuthStore } from '../auth/useAuthStore';
import * as PIXI from 'pixi.js';
import { AlertTriangle, RotateCcw, Trophy } from 'lucide-react';

const COLORS = { NIGHT: 0x09090F, TRACKING: 0x38bdf8, FLICK: 0x4ade80 };

export default function CombinedMode({ dict }: { dict: any }) {
  const state = useReactionStore();
  const { user } = useAuthStore();
  
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  
  const trackingTargetRef = useRef<PIXI.Graphics | null>(null);
  const flickTargetRef = useRef<PIXI.Graphics | null>(null);

  const engineState = useRef({ 
    status: 'idle', // 'idle', 'waiting', 'tracking', 'ready'
    timeoutId: 0 as any, 
    offTargetTimeoutId: 0 as any,
    startTime: 0,
    isHovered: false,
    time: 0,              // Физическое время траектории
    elapsedTrackingTime: 0 // Прошедшее время трекинга в миллисекундах
  });

  const [uiStatus, setUiStatus] = useState<'idle'|'waiting'|'tracking'|'ready'>('idle');
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

      // Слой фона для промахов во время флика
      const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
      bg.width = app.screen.width; bg.height = app.screen.height; bg.tint = COLORS.NIGHT;
      bg.eventMode = 'static';
      bg.cursor = 'crosshair';
      bg.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        if (engineState.current.status === 'ready') {
          handleFail("MISSED THE FLICK TARGET!");
        }
      });
      app.stage.addChild(bg);

      // Сфера трекинга (Синяя)
      const trackingTarget = new PIXI.Graphics();
      trackingTarget.circle(0, 0, 30).fill(COLORS.TRACKING);
      trackingTarget.eventMode = 'static';
      trackingTarget.cursor = 'crosshair';
      trackingTarget.visible = false;

      // Логика наведения
      trackingTarget.on('pointerover', () => {
        engineState.current.isHovered = true;
        if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
      });

      trackingTarget.on('pointerout', () => {
        engineState.current.isHovered = false;
        engineState.current.offTargetTimeoutId = setTimeout(() => {
          if (!engineState.current.isHovered && engineState.current.status === 'tracking') {
            handleFail("TRACKING FAILED! KEEP YOUR CROSSHAIR ON TARGET.");
          }
        }, 150);
      });

      // Первый клик по шарику в центре запускает движение
      trackingTarget.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        const s = engineState.current;
        if (s.status === 'waiting') {
          changeStatus('tracking');
          s.isHovered = true;
          s.time = 0; // Начинаем движение строго с 0!
          s.elapsedTrackingTime = 0; // Сбрасываем время разгона
          
          // Случайное время удержания от 3 до 7 секунд
          const trackingDuration = Math.floor(Math.random() * 4000) + 3000;
          
          s.timeoutId = setTimeout(() => {
            if (engineState.current.status === 'tracking') {
              spawnFlickTarget();
            }
          }, trackingDuration);
        }
      });

      app.stage.addChild(trackingTarget);
      trackingTargetRef.current = trackingTarget;

      // Сфера флика (Зеленая)
      const flickTarget = new PIXI.Graphics();
      flickTarget.circle(0, 0, 25).fill(COLORS.FLICK);
      flickTarget.eventMode = 'static';
      flickTarget.cursor = 'crosshair';
      flickTarget.visible = false;

      flickTarget.on('pointerdown', (e) => {
        if (!e.isTrusted) return;
        handleFlickHit();
      });

      app.stage.addChild(flickTarget);
      flickTargetRef.current = flickTarget;

      // ТИКЕР ДВИЖЕНИЯ С ПЛАВНЫМ РАЗГОНОМ
      app.ticker.add((ticker) => {
        const s = engineState.current;
        if (s.status === 'tracking' && trackingTargetRef.current) {
          s.elapsedTrackingTime += ticker.elapsedMS;
          
          // Коэффициент плавного разгона в первую секунду (от 0.0 до 1.0)
          const accel = Math.min(s.elapsedTrackingTime / 1000, 1.0);
          
          // Мягкая и плавная базовая скорость с инерцией
          const speed = 0.024 * accel * ticker.deltaTime;
          s.time += speed;
          
          const cx = app.screen.width / 2;
          const cy = app.screen.height / 2;
          
          trackingTargetRef.current.x = cx + Math.sin(s.time) * 200;
          trackingTargetRef.current.y = cy + Math.sin(s.time * 2) * 90;
        }
      });

      const handleResize = () => { if (bg) { bg.width = app.screen.width; bg.height = app.screen.height; }};
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
    if (status === 'idle') {
      if (trackingTargetRef.current) trackingTargetRef.current.visible = false;
      if (flickTargetRef.current) flickTargetRef.current.visible = false;
    }
  };

  const handleFail = (msg: string) => {
    setErrorMsg(msg);
    // КРИТИЧЕСКИЙ ФИКС: Больше не сбрасываем результаты в 0! Просто перезапускаем ТЕКУЩУЮ попытку.
    if (engineState.current.timeoutId) clearTimeout(engineState.current.timeoutId);
    if (engineState.current.offTargetTimeoutId) clearTimeout(engineState.current.offTargetTimeoutId);
    changeStatus('idle');
  };

  const handleStart = () => {
    if (useReactionStore.getState().results.length >= 10) return;
    setErrorMsg(null); 
    
    // Полное обнуление физики траектории перед спавном
    engineState.current.time = 0;
    engineState.current.elapsedTrackingTime = 0;
    engineState.current.isHovered = false;
    
    if (appRef.current && trackingTargetRef.current) {
      trackingTargetRef.current.position.set(appRef.current.screen.width / 2, appRef.current.screen.height / 2);
      trackingTargetRef.current.visible = true;
    }
    
    changeStatus('waiting');
  };

  const spawnFlickTarget = () => {
    if (!appRef.current || !flickTargetRef.current || !trackingTargetRef.current) return;
    
    trackingTargetRef.current.visible = false;
    
    const w = appRef.current.screen.width;
    const h = appRef.current.screen.height;
    const padding = 60;
    
    const rx = Math.random() * (w - padding * 2) + padding;
    const ry = Math.random() * (h - padding * 2) + padding;
    
    flickTargetRef.current.position.set(rx, ry);
    flickTargetRef.current.visible = true;
    
    changeStatus('ready');
    engineState.current.startTime = performance.now();
  };

  const handleFlickHit = () => {
    const s = engineState.current;
    if (s.status === 'ready') {
      const reactionTime = Math.round(performance.now() - s.startTime);
      if (reactionTime < 100) { handleFail("IMPOSSIBLE REACTION (< 100ms)"); return; }
      
      setLastTime(reactionTime);
      state.addResult(reactionTime);
      
      const nextCount = useReactionStore.getState().results.length;
      if (nextCount < 10) {
        if (flickTargetRef.current) flickTargetRef.current.visible = false;
        handleStart(); // Мгновенно готовит следующий шар в центре
      } else {
        changeStatus('idle');
      }
    }
  };

  // АВТОСОХРАНЕНИЕ
  useEffect(() => {
    if (state.results.length === 10 && user) {
      fetch('/api/reaction/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'combined', avgMs: avgTime }) })
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
            <h2 className="text-sm font-bold text-lavender tracking-[0.2em] uppercase">Combined Test Complete</h2>
            <div className="text-7xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)]">{avgTime} <span className="text-2xl text-lavender/50">ms</span></div>
            <button onClick={() => { state.resetResults(); setLastTime(null); setIsNewPb(false); changeStatus('idle'); }} className="mt-4 w-full py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-xl text-sm font-bold text-ivory tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        ) : (
          <>
            {uiStatus === 'idle' && (
              <button onClick={handleStart} className="pointer-events-auto px-8 py-4 bg-imperial/20 hover:bg-imperial/40 border border-imperial/50 rounded-full text-lg font-black text-ivory tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(96,81,155,0.4)]">
                {errorMsg ? 'RETRY ATTEMPT' : 'START COMBINED TEST'}
              </button>
            )}
            {uiStatus === 'waiting' && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-sky-400 animate-pulse bg-sky-950/40 px-4 py-2 border border-sky-500/20 rounded">CLICK THE BLUE SPHERE TO START MOVEMENT</span>
            )}
            {uiStatus === 'tracking' && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-sky-400 animate-pulse bg-sky-950/40 px-4 py-2 border border-sky-500/20 rounded">TRACK THE BLUE TARGET</span>
            )}
            {uiStatus === 'ready' && (
              <span className="text-xs font-black tracking-[0.3em] uppercase text-green-400 animate-pulse bg-green-950/40 px-4 py-2 border border-green-500/20 rounded">FLICK AND CLICK!</span>
            )}
            {uiStatus === 'idle' && lastTime !== null && !errorMsg && <p className="mt-6 text-2xl font-bold text-lavender/80 tracking-wider">Flick Time: {lastTime} ms</p>}
            {errorMsg && <p className="mt-6 text-sm font-bold text-red-400 bg-red-950/50 px-4 py-2 rounded-lg border border-red-500/30 flex items-center gap-2"><AlertTriangle size={16} /> {errorMsg}</p>}
          </>
        )}
      </div>
    </div>
  );
}