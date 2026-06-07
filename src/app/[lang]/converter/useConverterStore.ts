import { create } from 'zustand';

export type Game = {
  id: string;
  name: string;
  yaw: number;
  decimals: number;
  suffix?: string;
};

// Полная база данных игр (включая Deadlock)
export const GAMES: Game[] = [
  { id: 'cs2', name: 'Counter-Strike 2', yaw: 0.022, decimals: 2 },
  { id: 'val', name: 'Valorant', yaw: 0.07, decimals: 3 },
  { id: 'deadlock', name: 'Deadlock', yaw: 0.022, decimals: 3 },
  { id: 'ow2', name: 'Overwatch 2', yaw: 0.0066, decimals: 2 },
  { id: 'apex', name: 'Apex Legends', yaw: 0.022, decimals: 2 },
  { id: 'arc', name: 'ARC Raiders', yaw: 0.001360975, decimals: 2 },
  { id: 'arena', name: 'Arena Breakout: Inf.', yaw: 0.10237395, decimals: 2 },
  { id: 'cod', name: 'Call of Duty', yaw: 0.0066, decimals: 2 },
  { id: 'delta', name: 'Delta Force', yaw: 0.01, decimals: 2 },
  { id: 'fn', name: 'Fortnite', yaw: 0.005555, decimals: 1, suffix: '%' },
  { id: 'mr', name: 'Marvel Rivals', yaw: 0.0175, decimals: 2 },
  { id: 'pubg', name: 'PUBG: BATTLEGROUNDS', yaw: 1, decimals: 1 },
  { id: 'source', name: 'Quake / Source', yaw: 0.022, decimals: 2 },
  { id: 'r6s', name: 'Rainbow Six Siege', yaw: 0.00572957795, decimals: 0 },
  { id: 'rust', name: 'Rust', yaw: 0.111111, decimals: 3 },
  { id: 'tf', name: 'The Finals', yaw: 0.001, decimals: 0 },
].sort((a, b) => a.name.localeCompare(b.name));

interface ConverterState {
  // Базовые настройки
  mainMode: 'cm' | 'g2g';
  cmMode: 'cm2game' | 'game2cm';
  gameFrom: string;
  gameTo: string;
  gameCm: string;
  dpi: number;
  sensInput: string;
  cmInput: string;

  // Продвинутые настройки (Advanced)
  showAdvanced: boolean;
  
  // CS2
  cs2Stretched: boolean;
  cs2Res: '43' | '54' | '1610';
  cs2Zoom: number;

  // PUBG
  pubgMode: 'FPP' | 'TPP';
  pubgFov: number;
  pubgVert: number;
  pubgScopes: Record<string, number>;

  // Apex
  apexFov: number;
  apexScopes: Record<string, number>;

  // OW2
  ow2Heroes: Record<string, number>;

  // The Finals
  tfFls: boolean;
  tfFov: number;
  tfZoom: number;
  tfScopedZoom: number;

  // R6S, FN, Delta, Arena
  r6sMult: number;
  fnAds: number;
  fnScoped: number;
  deltaMouseSens: number;
  deltaScopes: Record<string, number>;
  arenaScopes: Record<string, number>;

  // Экшены (Actions)
  setField: (field: keyof ConverterState, value: any) => void;
  setScope: (game: 'pubgScopes' | 'apexScopes' | 'ow2Heroes' | 'deltaScopes' | 'arenaScopes', key: string, value: number) => void;
}

export const useConverterStore = create<ConverterState>((set) => ({
  mainMode: 'cm',
  cmMode: 'cm2game',
  gameFrom: 'cs2',
  gameTo: 'val',
  gameCm: 'cs2',
  dpi: 800,
  sensInput: '1.5',
  cmInput: '35',

  showAdvanced: false,

  cs2Stretched: false,
  cs2Res: '43',
  cs2Zoom: 1.0,

  pubgMode: 'FPP',
  pubgFov: 90,
  pubgVert: 1.0,
  pubgScopes: { aim: 50, '1x': 50, '2x': 50, '3x': 50, '4x': 50, '6x': 50, '8x': 50, '15x': 50 },

  apexFov: 110,
  apexScopes: { '1x': 1.0, '2x': 1.0, '3x': 1.0, '4x': 1.0, '6x': 1.0, '8x': 1.0, '10x': 1.0 },

  ow2Heroes: { ana: 100, ashe: 100, freja: 100, emre: 100 },

  tfFls: true,
  tfFov: 71,
  tfZoom: 100,
  tfScopedZoom: 100,

  r6sMult: 0.02,
  fnAds: 100,
  fnScoped: 100,
  deltaMouseSens: 3,
  deltaScopes: { '1x': 50, '2x': 50, '5x': 50, '8x': 50 },
  arenaScopes: { '1x': 1.0, '2x': 1.0, '3x': 1.0, '4x': 1.0, '6x': 1.0, '8x': 1.0, '16x': 1.0, '20x': 1.0 },

  setField: (field, value) => set({ [field]: value }),
  setScope: (game, key, value) => set((state) => ({ [game]: { ...state[game], [key]: value } })),
}));