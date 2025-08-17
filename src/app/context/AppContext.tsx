"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Shop } from '../lib/types';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth';

type AppState = {
  shops: Shop[];
  setShops: (value: Shop[]) => void;
  user: User | null;
  setUser: (value: User | null) => void;
  loading: boolean;
};

const AppContext = createContext<AppState>({
  shops: [],
  setShops: () => {},
  user: null,
  setUser: () => {},
  loading: true,
});

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Signed In:", user.displayName);
        setUser(user);
      } else {
        console.log("Signed Out");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{
      shops,
      setShops,
      user, 
      setUser,
      loading,
    }}>
      {children}
    </AppContext.Provider>
  );
}