'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useUserStore } from '@/lib/stores/user-store';
import type { User } from '@/lib/interfaces';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
  initialUser: User;
}

export function Providers({ children, initialUser }: ProvidersProps) {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    setCurrentUser(initialUser);
  }, [initialUser, currentUser, setCurrentUser]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}