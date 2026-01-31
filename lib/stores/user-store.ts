import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/interfaces';

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      currentUser: null,

      setCurrentUser: (user: User) => {
        set({ currentUser: user });
      },

      clearCurrentUser: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: 'user-store',
    }
  )
);