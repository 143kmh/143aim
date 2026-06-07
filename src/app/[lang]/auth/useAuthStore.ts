import { create } from 'zustand';

// Полный защищенный интерфейс пользователя со всеми привязками по ТЗ
interface User {
  id: string;
  steamId: string;
  username: string;
  customName?: string | null;
  hasCustomName: boolean;
  avatarUrl: string;
  
  // Добавляем все игровые поля для TypeScript
  discordId?: string | null;
  riotId?: string | null;
  riotPuuid?: string | null;
  faceitId?: string | null;
  owId?: string | null;
  marvelId?: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  login: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  
  checkSession: async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      set({ user: data.user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: () => {
    window.location.href = '/api/auth/steam';
  },
  
  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null });
  }
}));