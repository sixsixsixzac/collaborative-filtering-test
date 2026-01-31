import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/interfaces';

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
  initializeUser: () => Promise<void>;
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

      initializeUser: async () => {
        const { currentUser } = get();
        if (currentUser) return; 

        try {
          const response = await fetch('/api/users');
          if (response.ok) {
            const users: User[] = await response.json();
            if (users.length > 0) {
              const randomUser = users[0];
              set({ currentUser: randomUser });
            }
          }
        } catch (error) {
          console.error('Failed to initialize user:', error);
        }
      },
    }),
    {
      name: 'user-store',
    }
  )
);