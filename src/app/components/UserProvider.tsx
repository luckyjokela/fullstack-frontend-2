'use client';

import { useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';

export function UserProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useUserStore.getState().hydrate();
  }, []);

  return <>{children}</>;
}