"use client";

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useConverterStore, GAMES } from './useConverterStore';
import { Settings2, Info, Copy, Check, ChevronDown, Search, HelpCircle } from 'lucide-react';

// === КОМПОНЕНТ: TOOLTIP (Увеличенный Z-index и размер) ===
const Tooltip = ({ text, children }: { text: React.ReactNode, children: React.ReactNode }) => (
  <div className="group/tooltip relative inline-flex items-center justify-center cursor-help ml-1">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] p-3 bg-[#0d0d14]/95 backdrop-blur-xl border border-imperial/50 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.9)] text-[11px] leading-relaxed text-ivory opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-[999] text-center pointer-events-none">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-imperial/50" />
    </div>
  </div>
);

// === КОМПОНЕНТ: Кастомный Выпадающий Список ===
function CustomSelect({ value, onChange, placeholder }: { value: string, onChange: (id: string) => void, placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = GAMES.find(g => g.id === value);
  const filtered = GAMES.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.id.includes(search.toLowerCase()));

  return (
    <div className="relative w-full" ref={ref}>
      <div 
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full bg-[#0a0a0f] border border-imperial/30 hover:border-imperial/60 hover:shadow-[0_0_15px_rgba(96,81,155,0.2)] text-ivory rounded-lg p-3.5 cursor-pointer transition-all"
      >
        <span className="text-[13px] font-bold w-full text-left">{selected?.name || placeholder}</span>
        <ChevronDown size={16} className={`text-lavender transition-transform duration-300 ${open ? 'rotate-180 text-imperial' : ''}`} />
      </div>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#0d0d14]/95 backdrop-blur-2xl border border-imperial/50 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-white/10 flex items-center gap-2 bg-black/50">
            <Search size={14} className="text-imperial ml-2" />
            <input 
              autoFocus
              type="text" 
              placeholder="Search game..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-ivory text-xs font-bold outline-none w-full placeholder-lavender/50 py-1.5"
            />
          </div>
          <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-imperial scrollbar-track-transparent">
            {filtered.length > 0 ? filtered.map(g => (
              <div key={g.id} onClick={() => { onChange(g.id); setOpen(false); setSearch(""); }}
                className="px-4 py-3 text-[13px] font-bold text-lavender/80 hover:bg-imperial/30 hover:text-ivory cursor-pointer transition-colors border-b border-white/5 last:border-0"
              >
                {g.name}
              </div>
            )) : <div className="p-4 text-xs font-bold text-lavender/50 text-center">Not found</div>}
          </div>
        </div>
      )}
    </div>
  );
}

// === ОСНОВНОЙ КОМПОНЕНТ ===
export default function ConverterClient({ dict }: { dict: any }) {
  const state = useConverterStore();
  const [copied, setCopied] = useState(false);

  const targetGameKey = state.mainMode === 'cm' ? state.gameCm : state.gameTo;
  const hasAdvanced = ['cs2', 'pubg', 'apex', 'ow2', 'r6s', 'tf', 'fn', 'arena', 'delta'].includes(targetGameKey);

  useEffect(() => {
    if (!hasAdvanced && state.showAdvanced) state.setField('showAdvanced', false);
  }, [targetGameKey, hasAdvanced, state]);

  const getPubgBaseFov = () => state.pubgMode === 'TPP' ? 80 : state.pubgFov;
  const getEffectiveYaw = (gameKey: string, sens: number) => {
    if (gameKey === 'pubg') return (0.002 * Math.pow(10, sens / 50)) * (getPubgBaseFov() / 36);
    if (gameKey === 'r6s') return sens * (state.r6sMult * 0.2864788975);
    if (gameKey === 'delta') return sens * (state.deltaMouseSens || 3) * 0.01;
    const game = GAMES.find(g => g.id === gameKey);
    return game ? sens * game.yaw : 0;
  };
  const convertFromEffectiveYaw = (gameKey: string, effectiveYaw: number) => {
    if (gameKey === 'pubg') {
      const configSens = effectiveYaw / (getPubgBaseFov() / 36);
      return configSens <= 0 ? 0 : 50 * Math.log10(configSens / 0.002);
    }
    if (gameKey === 'r6s') return effectiveYaw / (state.r6sMult * 0.2864788975);
    if (gameKey === 'delta') return effectiveYaw / ((state.deltaMouseSens || 3) * 0.01);
    const game = GAMES.find(g => g.id === gameKey);
    return game ? effectiveYaw / game.yaw : 0;
  };

  const getTfCm = (base: number, fovMult: number | null, isSniper: boolean, zoomMult: number) => {
    if (!state.tfFls) return base / zoomMult;
    const hip_rad = (state.tfFov / 2) * (Math.PI / 180);
    const ads_rad = isSniper ? (25 / 2) * (Math.PI / 180) : ((state.tfFov * (fovMult || 1)) / 2) * (Math.PI / 180);
    const zoom_ratio = Math.tan(hip_rad) / Math.tan(ads_rad);
    return (base * zoom_ratio) / zoomMult;
  };

  const calc = useMemo(() => {
    let resultText = "0.00";
    let actualBaseCm360 = 0;
    let configText = "";
    
    const targetGame = GAMES.find(g => g.id === targetGameKey) || GAMES[0];
    const dpi = state.dpi || 800;

    if (state.mainMode === 'g2g') {
      const sens = parseFloat(state.sensInput);
      if (!isNaN(sens) && sens > 0) {
        const effectiveYaw1 = getEffectiveYaw(state.gameFrom, sens);
        const converted = convertFromEffectiveYaw(state.gameTo, effectiveYaw1);
        
        if (['tf', 'pubg', 'r6s'].includes(state.gameTo)) {
          resultText = Math.round(converted).toString();
          if (state.gameTo === 'pubg') configText = (0.002 * Math.pow(10, converted / 50)).toFixed(6);
          if (state.gameTo === 'r6s') configText = `MultiplierUnit=${((converted * state.r6sMult) / 50).toFixed(6)}`;
          if (state.gameTo === 'tf') configText = (converted / 100).toFixed(6);
          actualBaseCm360 = (360 * 2.54) / (dpi * getEffectiveYaw(state.gameTo, converted));
        } else {
          resultText = converted.toFixed(targetGame.decimals) + (targetGame.suffix || '');
          actualBaseCm360 = (360 * 2.54) / (dpi * getEffectiveYaw(state.gameTo, converted));
        }
      }
    } else {
      const val = parseFloat(state.cmInput);
      if (!isNaN(val) && val > 0 && dpi > 0) {
        if (state.cmMode === 'cm2game') {
          const reqYaw = (360 * 2.54) / (val * dpi);
          const converted = convertFromEffectiveYaw(state.gameCm, reqYaw);
          if (['tf', 'pubg', 'r6s'].includes(state.gameCm)) {
            resultText = Math.round(converted).toString();
            if (state.gameCm === 'pubg') configText = (0.002 * Math.pow(10, converted / 50)).toFixed(6);
            if (state.gameCm === 'r6s') configText = `MultiplierUnit=${((converted * state.r6sMult) / 50).toFixed(6)}`;
            if (state.gameCm === 'tf') configText = (converted / 100).toFixed(6);
            actualBaseCm360 = val;
          } else {
            resultText = converted.toFixed(targetGame.decimals) + (targetGame.suffix || '');
            actualBaseCm360 = val;
          }
        } else {
          actualBaseCm360 = (360 * 2.54) / (dpi * getEffectiveYaw(state.gameCm, val));
          resultText = actualBaseCm360.toFixed(2); 
        }
      }
    }
    return { resultText, actualBaseCm360, configText, targetGameKey };
  }, [state, targetGameKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(calc.resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 p-4 w-full max-w-[900px] mx-auto min-h-[80vh]">
      
      <style>{`
        input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
        input[type="range"] { -webkit-appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-runnable-track { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 14px; width: 14px; border-radius: 50%; background: #c2bbe0; margin-top: -5px; cursor: pointer; transition: background 0.2s; }
        input[type="range"]::-webkit-slider-thumb:hover { background: #A985FF; box-shadow: 0 0 10px rgba(169,133,255,0.5); }
      `}</style>

      {/* === ЛЕВАЯ КАРТОЧКА === */}
      <div 
        onMouseMove={handleMouseMove} 
        className="w-full max-w-[420px] relative p-[1px] rounded-[1.5rem] bg-gradient-to-b from-imperial/40 to-transparent shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex-shrink-0 z-20 mt-8 group/card cursor-default"
      >
        <div className="absolute inset-[1px] bg-[#0b0812]/95 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] overflow-hidden z-0">
          <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" 
               style={{ background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(169,133,255,0.12), transparent 40%)' }} />
        </div>

        <div className="relative z-10 p-6 flex flex-col gap-5 h-full">
          
          <h1 className="text-2xl font-black text-center tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-br from-white to-imperial drop-shadow-[0_0_10px_rgba(169,133,255,0.4)] uppercase mt-2 mb-2">
            143 AIM CLUB
          </h1>

          <div className="flex bg-black/60 p-1 rounded-xl border border-imperial/20 relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
            <button onClick={() => state.setField('mainMode', 'cm')} className={`flex-1 py-3 text-[11px] font-bold tracking-widest z-10 transition-colors uppercase ${state.mainMode === 'cm' ? 'text-ivory' : 'text-lavender/50 hover:text-lavender'}`}>{dict.converter.tab_cm}</button>
            <button onClick={() => state.setField('mainMode', 'g2g')} className={`flex-1 py-3 text-[11px] font-bold tracking-widest z-10 transition-colors uppercase ${state.mainMode === 'g2g' ? 'text-ivory' : 'text-lavender/50 hover:text-lavender'}`}>{dict.converter.tab_g2g}</button>
            <div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-b from-imperial/60 to-imperial/10 border border-imperial/40 rounded-lg transition-all shadow-[0_0_12px_rgba(169,133,255,0.4)]" style={{ left: state.mainMode === 'cm' ? '4px' : 'calc(50%)' }} />
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-lavender font-bold uppercase tracking-widest ml-1">{state.mainMode === 'g2g' ? dict.converter.from_game : dict.converter.game}</label>
              <CustomSelect value={state.mainMode === 'g2g' ? state.gameFrom : state.gameCm} onChange={(id) => state.setField(state.mainMode === 'g2g' ? 'gameFrom' : 'gameCm', id)} placeholder="Select Game" />
            </div>

            {state.mainMode === 'g2g' ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-lavender font-bold uppercase tracking-widest ml-1">{dict.converter.sens}</label>
                <input type="number" step="0.001" value={state.sensInput} onChange={e => state.setField('sensInput', e.target.value)} placeholder="e.g. 1.5" className="w-full bg-[#0a0a0f] border border-imperial/30 text-ivory rounded-lg p-3.5 text-sm font-bold outline-none focus:border-imperial hover:border-imperial/60 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-lavender font-bold uppercase tracking-widest ml-1">{dict.converter.dpi}</label>
                <input type="number" value={state.dpi || ''} onChange={e => state.setField('dpi', Number(e.target.value))} placeholder="e.g. 800" className="w-full bg-[#0a0a0f] border border-imperial/30 text-ivory rounded-lg p-3.5 text-sm font-bold outline-none focus:border-imperial hover:border-imperial/60 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              {state.mainMode === 'g2g' ? (
                <>
                  <label className="text-[10px] text-lavender font-bold uppercase tracking-widest ml-1">{dict.converter.to_game}</label>
                  <CustomSelect value={state.gameTo} onChange={(id) => state.setField('gameTo', id)} placeholder="Select Game" />
                </>
              ) : (
                <>
                  <div className="flex bg-black/60 p-1 rounded-lg border border-imperial/20 relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] mb-1">
                    <button onClick={() => state.setField('cmMode', 'cm2game')} className={`flex-1 py-1.5 text-[9px] font-bold z-10 uppercase tracking-widest ${state.cmMode === 'cm2game' ? 'text-ivory' : 'text-lavender/50'}`}>{dict.converter.sub_cm2game}</button>
                    <button onClick={() => state.setField('cmMode', 'game2cm')} className={`flex-1 py-1.5 text-[9px] font-bold z-10 uppercase tracking-widest ${state.cmMode === 'game2cm' ? 'text-ivory' : 'text-lavender/50'}`}>{dict.converter.sub_game2cm}</button>
                    <div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-b from-imperial/60 to-imperial/10 border border-imperial/40 rounded transition-all shadow-[0_0_10px_rgba(169,133,255,0.4)]" style={{ left: state.cmMode === 'cm2game' ? '4px' : '50%' }} />
                  </div>
                  <label className="text-[10px] text-imperial font-bold uppercase tracking-widest ml-1 mt-1">{state.cmMode === 'cm2game' ? dict.converter.target_cm : dict.converter.sens}</label>
                  <input type="number" step="0.01" value={state.cmInput} onChange={e => state.setField('cmInput', e.target.value)} placeholder={state.cmMode === 'cm2game' ? "e.g. 35" : "e.g. 1.5"} className="w-full bg-[#0a0a0f] border border-imperial/30 text-ivory rounded-lg p-3.5 text-sm font-bold outline-none focus:border-imperial hover:border-imperial/60 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                </>
              )}
            </div>

            {hasAdvanced && (
              <button onClick={() => state.setField('showAdvanced', !state.showAdvanced)} 
                      className={`mt-2 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.15em] transition-all border p-2.5 rounded-lg ${state.showAdvanced ? 'bg-imperial/20 text-ivory border-imperial/50 shadow-[0_0_10px_rgba(96,81,155,0.2)]' : 'bg-transparent text-lavender border-imperial/20 hover:border-imperial/50 hover:bg-imperial/10 hover:text-ivory'}`}>
                <Settings2 size={14} /> {state.showAdvanced ? 'HIDE ADVANCED SETTINGS' : 'SHOW ADVANCED SETTINGS'}
              </button>
            )}

            <div className="mt-2 p-6 bg-gradient-to-b from-imperial/10 to-black/80 rounded-xl border border-imperial/40 shadow-[inset_0_0_20px_rgba(137,102,245,0.1)] flex flex-col items-center justify-center relative group/btn">
              <span className="text-[10px] font-bold text-lavender/70 uppercase tracking-[0.2em] mb-2">{dict.converter.result}</span>
              <div className="text-4xl font-black text-ivory drop-shadow-[0_0_20px_rgba(169,133,255,0.8)] tracking-wide">
                {calc.resultText}
                {(state.mainMode === 'cm' && state.cmMode === 'game2cm') && <span className="text-lg text-lavender/50 ml-1">cm</span>}
              </div>
              <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-imperial/20 border border-white/10 hover:border-imperial/50 rounded-lg transition-all cursor-pointer opacity-0 group-hover/btn:opacity-100">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-imperial" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* === ПРАВАЯ КАРТОЧКА (АДВАНСЕД) === */}
      {state.showAdvanced && hasAdvanced && (
        <div 
          onMouseMove={handleMouseMove} 
          className="w-full max-w-[420px] relative p-[1px] rounded-[1.5rem] bg-gradient-to-b from-imperial/30 to-transparent shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-in lg:slide-in-from-left-8 slide-in-from-top-8 fade-in duration-300 z-30 lg:mt-8 group/card cursor-default"
        >
          <div className="absolute inset-[1px] bg-[#0b0812]/95 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] overflow-hidden z-0">
            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" 
                 style={{ background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(169,133,255,0.12), transparent 40%)' }} />
          </div>

          <div className="relative z-10 p-6 flex flex-col gap-5 h-full">
            <h2 className="text-xs font-black text-imperial tracking-[0.2em] uppercase border-b border-imperial/20 pb-3 mb-2 flex items-center gap-2">
              <Settings2 size={16} /> Advanced Settings
            </h2>

            {/* OVERWATCH 2 */}
            {calc.targetGameKey === 'ow2' && (
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(state.ow2Heroes).map(hero => (
                  <div key={hero} className="flex flex-col bg-black/40 p-3 rounded-lg border border-imperial/20 gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-lavender uppercase">{hero === 'ana' ? 'ANA/WIDOW' : hero}</span>
                      <Tooltip text={<>Optimal tracking feel (1:1 MDH 0%):<br/><span className="text-imperial font-bold text-[12px]">{hero==='ana'?'37.89%':hero==='ashe'?'51.47%':hero==='freja'?'62.22%':'54.99%'}</span></>}>
                        <HelpCircle size={16} className="text-imperial/70 hover:text-imperial transition-colors" />
                      </Tooltip>
                    </div>
                    <div className="flex items-center justify-between bg-black/50 border border-imperial/30 rounded px-2 py-1">
                      <input type="number" step="0.01" value={state.ow2Heroes[hero]} onChange={e => state.setScope('ow2Heroes', hero, parseFloat(e.target.value) || 100)} className="w-full bg-transparent text-center text-ivory text-[12px] font-bold outline-none focus:border-imperial" />
                      <span className="text-[10px] text-lavender">%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* THE FINALS */}
            {calc.targetGameKey === 'tf' && (
              <div className="flex flex-col gap-4">
                <div className="bg-black/40 p-3 rounded-lg border border-imperial/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-lavender tracking-widest uppercase">Focal Length Scaling</span>
                      <Tooltip text={<><span className="text-imperial font-bold">ON:</span> Matches physical movement with visual FOV.<br/><span className="text-imperial font-bold">OFF:</span> Uses flat multipliers.</>}><HelpCircle size={16} className="text-imperial/70 hover:text-imperial transition-colors" /></Tooltip>
                    </div>
                    <input type="checkbox" checked={state.tfFls} onChange={e => state.setField('tfFls', e.target.checked)} className="w-4 h-4 accent-imperial cursor-pointer" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-lavender uppercase tracking-widest">Hipfire FOV</span>
                      <Tooltip text={<>The Finals uses Vertical FOV. Pro players use 85 to 100.</>}><HelpCircle size={16} className="text-imperial/70 hover:text-imperial transition-colors" /></Tooltip>
                    </div>
                    <input type="range" min="45" max="100" value={state.tfFov} onChange={e => state.setField('tfFov', parseInt(e.target.value))} className="w-full ml-2" />
                    <span className="text-[11px] font-bold text-ivory w-6 text-right">{state.tfFov}</span>
                  </div>

                  <div className="flex flex-col gap-1 mb-3">
                    <div className="flex justify-between"><span className="text-[9px] font-bold text-lavender uppercase">Mouse Zoom Sens Mult</span><span className="text-[10px] font-bold text-imperial">{state.tfZoom}%</span></div>
                    <input type="range" min="1" max="100" value={state.tfZoom} onChange={e => state.setField('tfZoom', parseInt(e.target.value))} className="w-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between"><span className="text-[9px] font-bold text-lavender uppercase">Scoped Zoom Sens Mult</span><span className="text-[10px] font-bold text-imperial">{state.tfScopedZoom}%</span></div>
                    <input type="range" min="1" max="200" value={state.tfScopedZoom} onChange={e => state.setField('tfScopedZoom', parseInt(e.target.value))} className="w-full" />
                  </div>
                </div>
              </div>
            )}

            {/* CS2 */}
            {calc.targetGameKey === 'cs2' && (
              <div className="flex flex-col gap-5">
                <div className="bg-black/40 p-3 rounded-lg border border-imperial/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-lavender tracking-widest uppercase">I use stretched res</span>
                    <input type="checkbox" checked={state.cs2Stretched} onChange={e => state.setField('cs2Stretched', e.target.checked)} className="w-4 h-4 accent-imperial cursor-pointer" />
                  </div>
                  {state.cs2Stretched && (
                    <div className="flex gap-1.5">
                      {['43', '54', '1610'].map(res => (
                        <button key={res} onClick={() => state.setField('cs2Res', res)} className={`flex-1 py-1.5 text-[10px] font-bold rounded border transition-all ${state.cs2Res === res ? 'bg-imperial/40 border-imperial text-ivory shadow-[0_0_10px_rgba(169,133,255,0.3)]' : 'bg-black/60 border-white/5 text-lavender'}`}>{res === '43' ? '4:3' : res === '54' ? '5:4' : '16:10'}</button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-black/40 p-4 rounded-lg border border-imperial/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-lavender tracking-widest uppercase">Zoom Sens Multiplier</span>
                      <Tooltip text={<>For a 1:1 feel (MDH 0%), use <span className="text-imperial font-bold">0.82</span>.</>}><HelpCircle size={16} className="text-imperial/70 hover:text-imperial transition-colors" /></Tooltip>
                    </div>
                    <input type="number" step="0.01" value={state.cs2Zoom} onChange={e => state.setField('cs2Zoom', parseFloat(e.target.value) || 1)} className="w-16 bg-black/80 border border-imperial/30 rounded p-1 text-center text-ivory text-[11px] font-bold outline-none focus:border-imperial" />
                  </div>
                  <input type="range" min="0.01" max="3.00" step="0.01" value={state.cs2Zoom} onChange={e => state.setField('cs2Zoom', parseFloat(e.target.value))} className="w-full" />
                </div>
              </div>
            )}

            {/* PUBG */}
            {calc.targetGameKey === 'pubg' && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-1.5">
                  {['FPP', 'TPP'].map(m => (
                    <button key={m} onClick={() => state.setField('pubgMode', m)} className={`flex-1 py-2 text-[10px] font-bold rounded-lg border ${state.pubgMode === m ? 'bg-imperial/40 border-imperial text-ivory' : 'bg-black/40 border-white/5 text-lavender'}`}>{m}</button>
                  ))}
                </div>
                {state.pubgMode === 'FPP' && (
                  <div className="bg-black/40 p-3 rounded-lg border border-imperial/20 flex items-center gap-3">
                    <span className="text-[10px] font-bold text-lavender tracking-widest flex-1 uppercase">Hipfire FOV</span>
                    <input type="range" min="80" max="103" value={state.pubgFov} onChange={e => state.setField('pubgFov', parseInt(e.target.value))} className="flex-2" />
                    <span className="text-[11px] font-bold text-ivory w-6 text-right">{state.pubgFov}</span>
                  </div>
                )}
                <div className="bg-black/40 p-3 rounded-lg border border-imperial/20 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-lavender tracking-widest uppercase">Vertical Sens Mult</span>
                  <input type="number" step="0.01" value={state.pubgVert} onChange={e => state.setField('pubgVert', parseFloat(e.target.value) || 1)} className="w-14 bg-black/80 border border-imperial/30 rounded p-1.5 text-center text-ivory text-[11px] font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {Object.keys(state.pubgScopes).map(scope => (
                    <div key={scope} className="flex flex-col bg-black/20 p-2 rounded border border-white/5">
                      <div className="flex justify-between mb-1.5"><span className="text-[9px] font-bold text-lavender uppercase">{scope}</span><span className="text-[10px] text-imperial font-bold">{state.pubgScopes[scope]}</span></div>
                      <input type="range" min="0" max="100" value={state.pubgScopes[scope]} onChange={e => state.setScope('pubgScopes', scope, parseInt(e.target.value))} className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APEX */}
            {calc.targetGameKey === 'apex' && (
              <div className="flex flex-col gap-4">
                <div className="bg-black/40 p-3 rounded-lg border border-imperial/20 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 flex-1">
                    <span className="text-[10px] font-bold text-lavender uppercase tracking-widest">In-Game FOV</span>
                  </div>
                  <input type="range" min="70" max="110" value={state.apexFov} onChange={e => state.setField('apexFov', parseInt(e.target.value))} className="flex-2" />
                  <span className="text-[11px] font-bold text-ivory w-6 text-right">{state.apexFov}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {Object.keys(state.apexScopes).map(scope => (
                    <div key={scope} className="flex flex-col bg-black/20 p-2 rounded border border-white/5">
                      <div className="flex justify-between mb-1.5"><span className="text-[9px] font-bold text-lavender uppercase">{scope}</span><span className="text-[10px] text-imperial font-bold">{state.apexScopes[scope].toFixed(1)}</span></div>
                      <input type="range" min="0.1" max="10.0" step="0.1" value={state.apexScopes[scope]} onChange={e => state.setScope('apexScopes', scope, parseFloat(e.target.value))} className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* === ИТОГИ ПО СКОУПАМ (SCOPED DISTANCES) === */}
            {calc.actualBaseCm360 > 0 && (
              <div className="mt-auto pt-4 border-t border-imperial/20">
                {calc.configText && (
                  <div className="mb-4 bg-imperial/10 border border-imperial/30 p-2 rounded flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-lavender uppercase mb-0.5">{dict.converter.config}</span>
                    <span className="text-[11px] font-bold text-imperial tracking-wider">{calc.configText}</span>
                  </div>
                )}

                {calc.targetGameKey === 'cs2' && state.cs2Stretched && (
                  <div className="mb-4 bg-orange-500/10 border border-orange-500/30 p-2 rounded flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-orange-400/70 uppercase mb-0.5">{dict.converter.feels_like}</span>
                    <span className="text-[12px] font-bold text-orange-400 tracking-wider">
                      {(calc.actualBaseCm360 / (state.cs2Res === '43' ? 1.3333 : state.cs2Res === '54' ? 1.4222 : 1.1111)).toFixed(2)} CM/360
                    </span>
                  </div>
                )}

                <p className="text-[10px] text-lavender/70 font-bold tracking-[0.1em] mb-2 uppercase text-center">Scoped Distances (1:1 Tracking)</p>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    <span className="text-[9px] text-lavender font-bold uppercase">Base Hipfire</span>
                    <span className="text-[11px] font-black text-ivory">{calc.actualBaseCm360.toFixed(1)} cm</span>
                  </div>
                  
                  {calc.targetGameKey === 'tf' && (
                    <>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">Iron/Red Dot</span><span className="text-[11px] font-black text-ivory">{getTfCm(calc.actualBaseCm360, 0.78, false, state.tfZoom/100).toFixed(1)} cm</span></div>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">Magnifex</span><span className="text-[11px] font-black text-ivory">{getTfCm(calc.actualBaseCm360, 0.68, false, state.tfZoom/100).toFixed(1)} cm</span></div>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">SR-84 Sniper</span><span className="text-[11px] font-black text-ivory">{getTfCm(calc.actualBaseCm360, null, true, state.tfScopedZoom/100).toFixed(1)} cm</span></div>
                    </>
                  )}

                  {calc.targetGameKey === 'cs2' && (
                    <>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">AUG / SG</span><span className="text-[11px] font-black text-ivory">{((calc.actualBaseCm360 * 2) / state.cs2Zoom).toFixed(1)} cm</span></div>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">AWP 1X</span><span className="text-[11px] font-black text-ivory">{((calc.actualBaseCm360 * 2.25) / state.cs2Zoom).toFixed(1)} cm</span></div>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">AWP 2X</span><span className="text-[11px] font-black text-ivory">{((calc.actualBaseCm360 * 9) / state.cs2Zoom).toFixed(1)} cm</span></div>
                    </>
                  )}

                  {calc.targetGameKey === 'ow2' && Object.keys(state.ow2Heroes).map(hero => (
                     <div key={hero} className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center">
                       <span className="text-[9px] text-lavender font-bold uppercase">{hero === 'ana' ? 'ANA/WIDOW' : hero}</span>
                       <span className="text-[11px] font-black text-ivory">{(calc.actualBaseCm360 / (state.ow2Heroes[hero] / 100)).toFixed(1)} cm</span>
                     </div>
                  ))}

                  {calc.targetGameKey === 'pubg' && (
                    <>
                      <div className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">Vertical</span><span className="text-[11px] font-black text-ivory">{(calc.actualBaseCm360 / state.pubgVert).toFixed(1)} cm</span></div>
                      {Object.keys(state.pubgScopes).slice(0, 5).map(s => {
                        const yaw = (0.002 * Math.pow(10, state.pubgScopes[s] / 50)) * ({'aim':getPubgBaseFov(), '1x':70, '2x':40, '3x':26.66, '4x':19.04, '6x':13.33, '8x':10, '15x':6.66}[s] as number / 36);
                        return <div key={s} className="bg-[#0b0812] border border-imperial/30 p-2 rounded flex justify-between items-center"><span className="text-[9px] text-lavender font-bold uppercase">{s}</span><span className="text-[11px] font-black text-ivory">{((360 * 2.54) / ((state.dpi || 800) * yaw)).toFixed(1)} cm</span></div>
                      })}
                    </>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}