import { useCallback, useEffect, useState } from "react";
import { fetchAccountPlayers } from "../services/accountService";

export function useAccountPlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const refreshPlayers = useCallback(async () => {
    await fetchPlayers();
  }, []);

  async function fetchPlayers() {
    setLoading(true);

    try {
      const data = await fetchAccountPlayers();
      setPlayers(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch account players:", error);
      setLoading(false);
    }
  }

  return {
    players,
    setPlayers,
    refreshPlayers,
    loading,
  };
}
