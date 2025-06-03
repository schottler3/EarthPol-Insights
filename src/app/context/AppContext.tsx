"use client"
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { Nation, Town } from '../lib/types';

// Define the type for the context
type AppContextType = {
  selectedEntity: Nation | Town | null;
  setSelectedEntity: Dispatch<SetStateAction<Nation | Town | null>>;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
};

// Create the context with undefined as default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEntity, setSelectedEntity] = useState<Nation | Town | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{
      selectedEntity,
      setSelectedEntity,
      expanded,
      setExpanded
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};