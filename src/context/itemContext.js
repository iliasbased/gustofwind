import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getPlayer } from "../services/playerService.js";
import { fetchPlayerItems } from "../services/itemService.js";
import { useHero } from "./heroContext.js";

const ItemContext = createContext();

export function ItemProvider({ children }) {
  const { hero } = useHero();
  const [playerItems, setPlayerItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshItems = useCallback(async () => {
    await fetchItems();
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);

    try {
      const data = await fetchPlayerItems(hero.id);
      setPlayerItems(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch player items:", error);
      setLoading(false);
    }
  }

  return (
    <ItemContext.Provider
      value={{
        playerItems,
        setPlayerItems,
        refreshItems,
        loading,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemProvider");
  }
  return context;
}
