import { createContext, useContext, useState } from "react";
import { initCombat } from "../services/combatService";
import { fetchAdventures } from "../services/adventureService";

const AdventureContext = createContext();

export function AdventureProvider({ children }) {
  const [availableAdventures, setAvailableAdventures] = useState([]);
  const [currentAdventure, setCurrentAdventure] = useState(null);
  const [currentCombat, setCurrentCombat] = useState(null);

  async function getAvailableAdventures() {
    const adventures = await fetchAdventures();
    setAvailableAdventures(adventures);
  }

  async function startAdventure(adventure, level, party) {
    setCurrentAdventure(adventure);
    await initCombat(
      adventure.levels.find((adventureLevel) => adventureLevel.level == level),
      party
    );
  }

  function stopAdventure() {
    setCurrentAdventure(null);
    setCurrentCombat(null);
  }

  return (
    <AdventureContext.Provider
      value={{
        adventure: currentAdventure,
        adventures: availableAdventures,
        getAdventures: getAvailableAdventures,
        combat: currentCombat,
        startAdventure,
        stopAdventure,
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
}

export function useAdventures() {
  const context = useContext(AdventureContext);
  if (!context) {
    throw new Error("useAdventures must be used within an AdventureProvider");
  }
  return context;
}
