import { createContext, useContext, useState } from "react";
import { initCombat, fetchActiveCombat, endPlayerTurn } from "../services/combatService";
import { fetchAdventures } from "../services/adventureService";
import { useNavigate } from "react-router-dom";
import { useCombatSSE } from "../hooks/useCombatSSE";
import { formatPlayerAction, formatEnemyAction } from "../utilities/combatUtility";
import { useCallback } from "react";


const AdventureContext = createContext();

export function AdventureProvider({ children }) {
  const [adventures, setAdventures] = useState([]);
  const [adventure, setAdventure] = useState(null);
  const [combat, setCombat] = useState(null);
  const [combatLog, setCombatLog] = useState([]);
  const navigate = useNavigate();

  const sseUrl = combat ? `http://localhost:4000/api/combat/${combat.id}/stream` : null;

  const handleSSEMessage = useCallback((data) => {
    console.log('Processing SSE message:', data.type);
    
    switch (data.type) {
      case 'connected':
        console.log('Connected to combat stream for combat', data.combatId);
        break;
        
      case 'new_turn':
        console.log('New turn started, updating combat state');
        setCombat(data.combat);
        
        if (data.playerAction) {
          console.log('Adding player action to log');
          addToCombatLog(formatPlayerAction(data.playerAction));
        }
        
        if (data.enemyActions?.length > 0) {
          console.log(`Adding ${data.enemyActions.length} enemy actions to log`);
          data.enemyActions.forEach(action => {
            addToCombatLog(formatEnemyAction(action));
          });
        }
        break;
        
      default:
        console.warn('Unknown SSE message type:', data.type, data);
    }
  }, []);

  const { isConnected } = useCombatSSE(sseUrl, handleSSEMessage);

  function addToCombatLog(message) {
    setCombatLog(prev => {
      const newLog = [message, ...prev];
      return newLog;
    });
  };

  async function getAdventures() {
    const adventures = await fetchAdventures();
    setAdventures(adventures);
  }

  async function startAdventure(adventure, level, party) {
    setAdventure(adventure);
    const combat = await initCombat(
      adventure.levels.find((adventureLevel) => adventureLevel.level == level).id,
      party
    );
    setCombat(combat.id);
    navigate("/combat");
  }

  function stopAdventure() {
    setAdventure(null);
    setCombat(null);
  }

  async function getActiveCombat() {
    const combat = await fetchActiveCombat();

    if (!combat) {
      navigate("/tavern");
      return;
    }

    setCombat(combat);
  }

  async function endTurn(action) {
    await endPlayerTurn(combat.id, action);
  }

  return (
    <AdventureContext.Provider
      value={{
        adventure,
        adventures,
        getAdventures,
        combat,
        combatLog,
        isConnected,
        startAdventure,
        stopAdventure,
        getActiveCombat,
        endTurn
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
