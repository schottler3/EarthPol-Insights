"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { InUser, Shop } from '../lib/types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth';
import { signInUser } from '../lib/databasing';

type AppState = {
  shops: Shop[];
  setShops: (value: Shop[]) => void;
  user: InUser | null;
  setUser: (value: InUser | null) => void;
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
  const [user, setUser] = useState<InUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await signInUser(firebaseUser);
          const cachedAccount = localStorage.getItem("userName");
          if(cachedAccount && userData.userName == ""){
            userData.userName = cachedAccount;
          }
          setUser(userData);
        } catch (error) {
          console.error("Error signing in user:", error);
        }
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