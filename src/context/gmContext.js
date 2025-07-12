import { createContext, useContext, useState } from 'react';

const GamemasterContext = createContext();

export function GamemasterProvider({ children }) {
  const [selectedGamemaster, setSelectedGamemaster] = useState(() => {
    // Initialize from sessionStorage if available
    const stored = sessionStorage.getItem('selectedGM');
    return stored ? JSON.parse(stored) : null;
  });

  const [selectedGMPlayer, setSelectedGMPlayer] = useState(() => {
    // Initialize from sessionStorage if available
    const stored = sessionStorage.getItem('selectedGMPlayer');
    return stored ? JSON.parse(stored) : null;
  });

  const selectGMPlayer = (player) => {
    setSelectedGMPlayer(player); 
    sessionStorage.setItem('selectedGMPlayer', JSON.stringify(player));
  }

  const selectGamemaster = (gamemaster) => {
    setSelectedGamemaster(gamemaster);
    sessionStorage.setItem('selectedGM', JSON.stringify(gamemaster));
  };

  const clearGamemaster = () => {
    setSelectedGamemaster(null);
    sessionStorage.removeItem('selectedGM');
  };

  return (
    <GamemasterContext.Provider value={{
      gamemaster: selectedGamemaster,
      selectGamemaster,
      clearGamemaster,
      gmPlayer: selectedGMPlayer,
      selectGMPlayer
    }}>
      {children}
    </GamemasterContext.Provider>
  );
}

export function useGamemaster() {
  const context = useContext(GamemasterContext);
  if (!context) {
    throw new Error('useGamemaster must be used within a GamemasterProvider');
  }
  return context;
}