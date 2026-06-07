"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../auth/useAuthStore';
import { User, LogIn, Save, Loader2, Link as LinkIcon, Trophy, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ProfileClient({ dict }: { dict: any }) {
  const { user, isLoading: isAuthLoading, login, checkSession } = useAuthStore();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSaved] = useState(false);

  // Стейты ввода
  const [marvelId, setMarvelId] = useState('');

  // Двухэтапная верификация Valorant
  const [showRiotModal, setShowRiotModal] = useState(false);
  const [inputRiotId, setInputRiotId] = useState('');
  const [riotError, setRiotError] = useState('');
  const [riotStep, setRiotStep] = useState<'init' | 'handshake'>('init');
  const [riotVerifying, setRiotVerifying] = useState(false);
  const [verifyMeta, setVerifyData] = useState<{ originalCardId: string, riotId: string } | null>(null);

  // Двухэтапная верификация Overwatch 2 (НОВОЕ ИСПРАВЛЕННОЕ!)
  const [showOwModal, setShowOwModal] = useState(false);
  const [inputOwId, setInputOwId] = useState('');
  const [owError, setOwError] = useState('');
  const [owStep, setOwStep] = useState<'init' | 'handshake'>('init');
  const [owVerifying, setOwVerifying] = useState(false);
  const [verifyOwMeta, setVerifyOwData] = useState<{ originalAvatar: string, owId: string } | null>(null);

  const fetchFullProfile = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/profile/get-user');
      const data = await res.json();
      if (data.user) {
        setProfileData(data.user);
        setMarvelId(data.user.marvelId || '');
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFullProfile();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSaved(false);

    try {
      const res = await fetch('/api/profile/save-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marvelId })
      });
      const data = await res.json();
      if (data.success) {
        setSavedSaved(true);
        fetchFullProfile();
        checkSession();
        setTimeout(() => setSavedSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  // ВЕРИФИКАЦИЯ RIOT (ANY-TO-ANY)
  const handleInitiateRiot = async (e: React.FormEvent) => {
    e.preventDefault();
    setRiotVerifying(true);
    setRiotError('');

    try {
      const res = await fetch('/api/profile/verify-riot/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riotId: inputRiotId })
      });
      const data = await res.json();

      if (data.success) {
        setVerifyData({
          originalCardId: data.originalCardId,
          riotId: data.riotId
        });
        setRiotStep('handshake');
      } else {
        setRiotError(data.error || 'Ошибка инициализации');
      }
    } catch (e) {
      setRiotError('Системная ошибка. Попробуйте еще раз.');
    }
    setRiotVerifying(false);
  };

  const handleConfirmRiot = async () => {
    if (!verifyMeta) return;
    setRiotVerifying(true);
    setRiotError('');

    try {
      const res = await fetch('/api/profile/verify-riot/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riotId: verifyMeta.riotId,
          originalCardId: verifyMeta.originalCardId
        })
      });
      const data = await res.json();

      if (data.success) {
        setShowRiotModal(false);
        setRiotStep('init');
        setVerifyData(null);
        fetchFullProfile();
        checkSession();
      } else {
        setRiotError(data.error || 'Ошибка верификации');
      }
    } catch (e) {
      setRiotError('Системная ошибка подтверждения.');
    }
    setRiotVerifying(false);
  };

  // ВЕРИФИКАЦИЯ OVERWATCH 2 (ANY-TO-ANY)
  const handleInitiateOw = async (e: React.FormEvent) => {
    e.preventDefault();
    setOwVerifying(true);
    setOwError('');

    try {
      const res = await fetch('/api/profile/verify-ow/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owId: inputOwId })
      });
      const data = await res.json();

      if (data.success) {
        setVerifyOwData({
          originalAvatar: data.originalAvatar,
          owId: data.owId
        });
        setOwStep('handshake');
      } else {
        setOwError(data.error || 'Ошибка инициализации');
      }
    } catch (e) {
      setOwError('Системная ошибка. Попробуйте еще раз.');
    }
    setOwVerifying(false);
  };

  const handleConfirmOw = async () => {
    if (!verifyOwMeta) return;
    setOwVerifying(true);
    setOwError('');

    try {
      const res = await fetch('/api/profile/verify-ow/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owId: verifyOwMeta.owId,
          originalAvatar: verifyOwMeta.originalAvatar
        })
      });
      const data = await res.json();

      if (data.success) {
        setShowOwModal(false);
        setOwStep('init');
        setVerifyOwData(null);
        fetchFullProfile();
        checkSession();
      } else {
        setOwError(data.error || 'Ошибка верификации');
      }
    } catch (e) {
      setOwError('Системная ошибка подтверждения.');
    }
    setOwVerifying(false);
  };

  const handleLinkDiscord = () => { window.location.href = '/api/auth/discord'; };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 py-12 flex flex-col gap-8">
      
      {/* КАРТОЧКА ПОЛЬЗОВАТЕЛЯ */}
      <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-r from-imperial/50 to-transparent shadow-glass-glow w-full">
        <div className="bg-[#0b0812]/95 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
          <img src={profileData?.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-2xl border border-imperial/40 shadow-[0_0_20px_rgba(96,81,155,0.3)] flex-shrink-0" />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-ivory tracking-wider">{profileData?.customName}</h1>
              <span className="text-[10px] font-black text-imperial bg-imperial/10 px-2 py-1 rounded border border-imperial/20 uppercase tracking-widest">RANKED PLAYER</span>
            </div>
            <p className="text-xs text-lavender/50 font-bold uppercase tracking-widest mt-1">STEAM ID: {profileData?.steamId}</p>
            <p className="text-xs text-lavender/30 font-bold uppercase tracking-widest mt-0.5">MEMBER SINCE: {new Date(profileData?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* КАРТОЧКИ СВЯЗАННЫХ ИГР */}
        <form onSubmit={handleSaveProfile} className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-sm font-black text-imperial tracking-[0.2em] uppercase border-b border-white/5 pb-2 mb-2 flex items-center gap-2">
            <LinkIcon size={16} /> Link game accounts & ranks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* FACEIT CS2 */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#ff5500]/30 to-black shadow-[0_0_30px_rgba(255,85,0,0.15)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff5500]/20 blur-[30px]" />
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 border border-white/[0.02] flex flex-col gap-3 h-full relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#ff5500] tracking-widest uppercase">Faceit CS2</span>
                  <span className="text-[8px] bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40 px-2 py-0.5 rounded font-bold uppercase">43 MATCHES SYNC</span>
                </div>
                {profileData?.faceitId ? (
                  <div className="flex flex-col gap-2">
                    <a 
                      href={`https://www.faceit.com/en/players/${profileData.faceitId}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-bold text-lavender hover:text-[#ff5500] hover:underline transition-all flex items-center gap-1.5"
                    >
                      Linked Account: <span className="text-ivory font-black">{profileData.faceitId}</span>
                    </a>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-ivory drop-shadow-[0_0_10px_rgba(255,85,0,0.4)] uppercase">
                        {profileData.faceitRank || "No Level"}
                      </span>
                      {profileData.faceitElo && (
                        <span className="text-xs text-lavender/50 font-bold">({profileData.faceitElo} ELO)</span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-2 pt-2.5 border-t border-white/5">
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">K/D (43 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.faceitKd || "0.00"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">Winrate (43 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.faceitWinrate || "0"}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">Headshots (43 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.faceitHs || "0"}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-lavender/40 font-bold uppercase py-4">No linked Faceit account found on this Steam ID</div>
                )}
              </div>
            </div>

            {/* VALORANT */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#ff4655]/30 to-[#0f1923] shadow-[0_0_30px_rgba(255,70,85,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff4655]/20 blur-[30px]" />
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 border border-white/[0.02] flex flex-col gap-3 h-full relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#ff4655] tracking-widest uppercase">Valorant</span>
                  <span className="text-[8px] bg-[#ff4655]/20 text-[#ff4655] border border-[#ff4655]/40 px-2 py-0.5 rounded font-bold uppercase">10 MATCHES SYNC</span>
                </div>
                
                {profileData?.riotId && profileData?.riotRank ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs font-bold text-lavender">Linked Account: <span className="text-ivory font-black">{profileData.riotId}</span></div>
                    
                    <div className="flex items-center gap-3">
                      {profileData.riotImage && (
                        <img src={profileData.riotImage} alt="" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,70,85,0.5)]" />
                      )}
                      <div>
                        <p className="text-[9px] text-lavender/40 font-bold uppercase">Riot Rank</p>
                        <p className="text-sm font-black text-ivory">{profileData.riotRank}</p>
                        {profileData.riotElo !== null && (
                          <p className="text-[10px] text-lavender/50 font-medium">{profileData.riotElo} RR</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-1.5 pt-2 border-t border-white/5">
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">K/D (10 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.riotKd || "0.00"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">Winrate (10 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.riotWinrate || "0"}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-lavender/40 font-bold uppercase">Headshots (10 matches)</p>
                        <p className="text-sm font-black text-ivory">{profileData.riotHs || "0"}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => { setInputRiotId(''); setRiotError(''); setRiotStep('init'); setVerifyData(null); setShowRiotModal(true); }} 
                    className="w-full py-3.5 mt-2 bg-[#ff4655]/20 hover:bg-[#ff4655]/40 border border-[#ff4655]/50 text-ivory text-xs font-bold tracking-widest uppercase rounded transition-all cursor-pointer"
                  >
                    Link Riot Account
                  </button>
                )}
              </div>
            </div>

            {/* OVERWATCH 2 */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#00c3ff]/30 to-[#0e1624] shadow-[0_0_30px_rgba(0,195,255,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00c3ff]/20 blur-[30px]" />
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 border border-white/[0.02] flex flex-col gap-4 h-full relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#00c3ff] tracking-widest uppercase">Overwatch 2</span>
                  <span className="text-[8px] bg-[#00c3ff]/20 text-[#00c3ff] border border-[#00c3ff]/40 px-2 py-0.5 rounded font-bold uppercase">BATTLE.NET SYNC</span>
                </div>
                
                {profileData?.owId && profileData?.owRank ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs font-bold text-lavender">Linked Account: <span className="text-ivory font-black">{profileData.owId}</span></div>
                    
                    <div className="flex items-center gap-3">
                      {profileData.owImage && (
                        <img src={profileData.owImage} alt="" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,195,255,0.5)]" />
                      )}
                      <div>
                        <p className="text-[9px] text-lavender/40 font-bold uppercase">Peak Competitive Rank</p>
                        <p className="text-sm font-black text-ivory">{profileData.owRank}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => { setInputOwId(''); setOwError(''); setOwStep('init'); setVerifyOwData(null); setShowOwModal(true); }} 
                    className="w-full py-3.5 mt-2 bg-[#00c3ff]/20 hover:bg-[#00c3ff]/40 border border-[#00c3ff]/50 text-ivory text-xs font-bold tracking-widest uppercase rounded transition-all cursor-pointer"
                  >
                    Link Overwatch Account
                  </button>
                )}
              </div>
            </div>

            {/* DISCORD */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#5865F2]/30 to-black shadow-[0_0_30px_rgba(88,101,242,0.15)] relative overflow-hidden">
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 border border-white/[0.02] flex flex-col gap-4 h-full">
                <span className="text-[10px] font-black text-[#5865F2] tracking-widest uppercase">Discord</span>
                {profileData?.discordId ? (
                  <div className="text-xs font-bold text-lavender">Linked Account: <span className="text-ivory font-black">{profileData.discordId}</span></div>
                ) : (
                  <button type="button" onClick={handleLinkDiscord} className="w-full py-3.5 bg-[#5865F2]/20 hover:bg-[#5865F2]/40 border border-[#5865F2]/50 text-ivory text-xs font-bold tracking-widest uppercase rounded transition-all cursor-pointer">
                    Link Discord Account
                  </button>
                )}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#0a051b] border border-[#8b5cf6]/20">
              <div className="bg-[#060408]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 flex flex-col gap-4 h-full">
                <span className="text-[10px] font-black text-[#8b5cf6] tracking-widest uppercase">Marvel Rivals</span>
                <input type="text" placeholder="Marvel Rivals ID" value={marvelId} onChange={e => setMarvelId(e.target.value)} className="w-full bg-black/60 border border-[#8b5cf6]/30 text-ivory rounded p-3 text-xs font-bold outline-none focus:border-[#8b5cf6]" />
                <div className="text-[10px] text-lavender/30 uppercase font-black tracking-widest text-center mt-2">Rank synced via API (Soon)</div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end gap-4 mt-6">
            {savedSuccess && <span className="text-xs font-bold text-green-400 flex items-center gap-1.5 uppercase tracking-widest mr-2 animate-pulse">SAVED SUCCESSFULLY!</span>}
            <button type="submit" disabled={isSaving} className="px-8 py-3.5 bg-imperial/30 hover:bg-imperial/50 border border-imperial/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(96,81,155,0.3)] cursor-pointer">
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SAVE ALL CHANGES
            </button>
          </div>
        </form>

        {/* СТАТИСТИКА ТЕСТОВ РЕАКЦИИ */}
        <div className="w-full bg-[#0b0812]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col shadow-glass-glow h-fit">
          <h2 className="text-sm font-black text-imperial tracking-[0.2em] uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
            <Trophy size={16} /> Personal Bests
          </h2>

          <div className="flex flex-col gap-3">
            {['simple', 'choice', 'flick', 'combined', 'strafe'].map(mode => {
              const score = profileData?.reactionScores?.find((s: any) => s.mode === mode);
              return (
                <div key={mode} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-lavender uppercase">{mode}</span>
                  <span className="text-sm font-black text-ivory tracking-wider">
                    {score ? `${score.bestMs} ms` : '---'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* === ДВУХЭТАПНОЕ МОДАЛЬНОЕ ОКНО ВЕРИФИКАЦИИ RIOT === */}
      {showRiotModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-[#ff4655]/60 to-transparent max-w-md w-full shadow-lg">
            <div className="bg-[#09090f]/95 rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6">
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#ff4655]/20 border border-[#ff4655]/50 rounded-xl flex items-center justify-center mx-auto text-[#ff4655] mb-4">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-black text-ivory tracking-widest uppercase">Verify Riot Account</h3>
                {riotStep === 'init' ? (
                  <p className="text-xs text-lavender mt-3 leading-relaxed">Введите ваш Riot ID (например, `Jett#143`). На первом шаге система бесшумно зафиксирует вашу текущую игровую карточку.</p>
                ) : (
                  <div className="text-xs text-lavender mt-3 leading-relaxed bg-[#ff4655]/5 p-4 rounded-xl border border-[#ff4655]/20 text-left flex flex-col gap-2">
                    <p className="font-bold text-ivory text-center">ИНСТРУКЦИЯ ПО ПОДТВЕРЖДЕНИЮ:</p>
                    <p>1. Наша система зафиксировала вашу текущую карточку игрока (Player Card) в Valorant.</p>
                    <p className="font-bold text-yellow-400">2. Зайдите в Valorant, откройте Коллекцию и измените вашу карточку игрока на ЛЮБУЮ ДРУГУЮ карточку в вашей коллекции.</p>
                    <p>3. Вернитесь сюда и нажмите кнопку **«Confirm Verification»**.</p>
                  </div>
                )}
              </div>

              {riotStep === 'init' ? (
                <form onSubmit={handleInitiateRiot} className="flex flex-col gap-4">
                  <input type="text" value={inputRiotId} onChange={(e) => setInputRiotId(e.target.value)} placeholder="e.g. Jett#143" className="w-full bg-black/50 border border-[#ff4655]/30 focus:border-[#ff4655] text-ivory rounded-lg p-3 text-sm font-bold outline-none text-center tracking-wider transition-all" />
                  {riotError && <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded border border-red-500/20 text-center font-bold flex items-center gap-1.5 justify-center"><ShieldAlert size={14} /> {riotError}</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowRiotModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-black tracking-widest uppercase rounded-lg cursor-pointer">Cancel</button>
                    <button type="submit" disabled={riotVerifying} className="flex-1 py-3 bg-[#ff4655]/30 hover:bg-[#ff4655]/50 border border-[#ff4655]/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,70,85,0.3)]">{riotVerifying ? <Loader2 size={14} className="animate-spin" /> : 'Next Step'}</button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-4">
                  {riotError && <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded border border-red-500/20 text-center font-bold flex items-center gap-1.5 justify-center"><ShieldAlert size={14} /> {riotError}</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => { setRiotStep('init'); setVerifyData(null); setRiotError(''); }} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-black tracking-widest uppercase rounded-lg cursor-pointer">Back</button>
                    <button type="button" onClick={handleConfirmRiot} disabled={riotVerifying} className="flex-1 py-3 bg-green-600/30 hover:bg-green-600/50 border border-green-500/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                      {riotVerifying ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} 
                      {riotVerifying ? 'Verifying...' : 'Confirm Verification'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* === ДВУХЭТАПНОЕ МОДАЛЬНОЕ ОКНО ВЕРИФИКАЦИИ OVERWATCH 2 === */}
      {showOwModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-[#00c3ff]/60 to-transparent max-w-md w-full shadow-lg">
            <div className="bg-[#09090f]/95 rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6">
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#00c3ff]/20 border border-[#00c3ff]/50 rounded-xl flex items-center justify-center mx-auto text-[#00c3ff] mb-4 shadow-[0_0_15px_rgba(0,195,255,0.3)]">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-black text-ivory tracking-widest uppercase">Verify Overwatch 2 Account</h3>
                
                {owStep === 'init' ? (
                  <p className="text-xs text-lavender mt-3 leading-relaxed">
                    Введите ваш BattleTag (например, `Genji#1234`). Система зафиксирует вашу текущую иконку профиля (Avatar).
                  </p>
                ) : (
                  <div className="text-xs text-lavender mt-3 leading-relaxed bg-[#00c3ff]/5 p-4 rounded-xl border border-[#00c3ff]/20 text-left flex flex-col gap-2">
                    <p className="font-bold text-ivory text-center">ИНСТРУКЦИЯ ПО ВЕРИФИКАЦИИ:</p>
                    <p>1. Наша система зафиксировала вашу текущую иконку профиля в Overwatch 2.</p>
                    <p className="font-bold text-yellow-400">2. Откройте клиент Overwatch 2, зайдите в Карьерный Профиль -&gt; Настройка и измените иконку вашего профиля (Avatar) на любую другую.</p>
                    <p>3. Вернитесь сюда и нажмите кнопку **«Confirm Verification»**.</p>
                  </div>
                )}
              </div>

              {owStep === 'init' ? (
                <form onSubmit={handleInitiateOw} className="flex flex-col gap-4">
                  <input 
                    type="text" 
                    value={inputOwId}
                    onChange={(e) => setInputOwId(e.target.value)}
                    placeholder="e.g. Genji#1234"
                    className="w-full bg-black/50 border border-[#00c3ff]/30 focus:border-[#00c3ff] text-ivory rounded-lg p-3 text-sm font-bold outline-none text-center tracking-wider transition-all"
                  />

                  {owError && (
                    <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded border border-red-500/20 text-center font-bold flex items-center gap-1.5 justify-center">
                      <ShieldAlert size={14} /> {owError}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowOwModal(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-black tracking-widest uppercase rounded-lg cursor-pointer">Cancel</button>
                    <button type="submit" disabled={owVerifying} className="flex-1 py-3 bg-[#00c3ff]/30 hover:bg-[#00c3ff]/50 border border-[#00c3ff]/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,195,255,0.3)]">
                      {owVerifying ? <Loader2 size={14} className="animate-spin" /> : 'Next Step'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-4">
                  {owError && <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded border border-red-500/20 text-center font-bold flex items-center gap-1.5 justify-center"><ShieldAlert size={14} /> {owError}</p>}
                  <div className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => { setOwStep('init'); setVerifyOwData(null); setOwError(''); }} 
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory text-xs font-black tracking-widest uppercase rounded-lg cursor-pointer"
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      onClick={handleConfirmOw}
                      disabled={owVerifying}
                      className="flex-1 py-3 bg-green-600/30 hover:bg-green-600/50 border border-green-500/50 text-ivory text-xs font-black tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                    >
                      {owVerifying ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} 
                      {owVerifying ? 'Verifying...' : 'Confirm Verification'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}