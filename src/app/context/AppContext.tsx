"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { Shop } from '../lib/types';

type AppState = {
  shops: Shop[];
  setShops: (value: Shop[]) => void;
};

const AppContext = createContext<AppState>({
  shops: [],
  setShops: () => {},
});

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<Shop[]>([]);

  return (
    <AppContext.Provider value={{
      shops,
      setShops,
    }}>
      {children}
    </AppContext.Provider>
  );
}