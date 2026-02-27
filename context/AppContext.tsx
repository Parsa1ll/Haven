import React, { createContext, useContext, useState } from 'react';

interface AppState {
  hasSeenDailyVerse: boolean;
  setHasSeenDailyVerse: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenDailyVerse, setHasSeenDailyVerse] = useState(false);

  return (
    <AppContext.Provider value={{ hasSeenDailyVerse, setHasSeenDailyVerse }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
