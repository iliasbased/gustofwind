import { createContext, useContext, useState } from 'react';
import { getPlayer, getGMPlayers } from '../services/playerService.js';

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

  const refreshPlayer = async () => {
    let player = await getPlayer(selectedGMPlayer.id);
    if (player) {
      setSelectedGMPlayer(player);
      sessionStorage.setItem('selectedGMPlayer', JSON.stringify(player));
    } else {
      console.error("Failed to refresh player data");
    }
  }

  const refreshGMPlayers = async () => {
    let players = await getGMPlayers(selectedGamemaster.id);
    if (players && players.length > 0) {
      let gm = {... selectedGamemaster};
      gm.players = players;
      setSelectedGamemaster(gm);
    } else {
      console.error("Failed to refresh player data");
    }
  }

  return (
    <GamemasterContext.Provider value={{
      gamemaster: selectedGamemaster,
      selectGamemaster,
      clearGamemaster,
      gmPlayer: selectedGMPlayer,
      selectGMPlayer,
      refreshPlayer,
      refreshGMPlayers
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