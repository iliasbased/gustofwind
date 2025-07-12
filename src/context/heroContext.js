import { createContext, useContext, useState } from 'react';

const HeroContext = createContext();

export function HeroProvider({ children }) {
  const [selectedHero, setSelectedHero] = useState(() => {
    // Initialize from sessionStorage if available
    const stored = sessionStorage.getItem('selectedHero');
    return stored ? JSON.parse(stored) : null;
  });

  const selectHero = (hero) => {
    setSelectedHero(hero);
    sessionStorage.setItem('selectedHero', JSON.stringify(hero));
  };

  const clearHero = () => {
    setSelectedHero(null);
    sessionStorage.removeItem('selectedHero');
  };

  return (
    <HeroContext.Provider value={{
      hero: selectedHero,
      selectHero,
      clearHero
    }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
}