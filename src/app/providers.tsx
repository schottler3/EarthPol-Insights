"use client"

import { AppContextProvider } from './context/AppContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      {children}
    </AppContextProvider>
  );
}