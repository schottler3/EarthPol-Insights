"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

type AppState = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const AppContext = createContext<AppState>({
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
});

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{
      isSidebarOpen,
      setIsSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}