import { useCallback, useEffect, useState } from "react";
import { fetchPlayerItems } from "../services/itemService";

export function usePlayerItems() {
  const [playerItems, setPlayerItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshItems = useCallback(() => {
    setLoading(true);
    fetchPlayerItems()
      .then((data) => {
        setPlayerItems(Array.isArray(data) ? [...data] : []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    fetchPlayerItems()
      .then((data) => {
        setPlayerItems(Array.isArray(data) ? [...data] : []);
        setLoading(false);
      })
  }, []);

  return {
    playerItems,
    refreshItems,
    loading
  };
}
