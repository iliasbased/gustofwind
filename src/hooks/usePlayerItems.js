import { useCallback, useEffect, useState } from "react";
import { fetchPlayerItems } from "../services/itemService";

export function usePlayerItems() {
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
      const data = await fetchPlayerItems();
      setPlayerItems(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch player items:", error);
      setLoading(false);
    }
  }

  return {
    playerItems,
    setPlayerItems,
    refreshItems,
    loading,
  };
}
