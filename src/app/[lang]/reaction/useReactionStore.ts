import { create } from 'zustand';

// Убран 'movement'
export type ReactionMode = 'simple' | 'choice' | 'flick' | 'combined' | 'strafe';

interface ReactionState {
  mode: ReactionMode;
  setMode: (mode: ReactionMode) => void;
  
  results: number[];
  addResult: (time: number) => void;
  resetResults: () => void;

  refreshTrigger: number;
  triggerRefresh: () => void;
}

export const useReactionStore = create<ReactionState>((set) => ({
  mode: 'simple',
  setMode: (mode) => set({ mode, results: [] }),
  
  results: [],
  addResult: (time) => set((state) => ({ results: [...state.results, time] })),
  resetResults: () => set({ results: [] }),

  refreshTrigger: 0,
  triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 }))
}));