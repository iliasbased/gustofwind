import { useCallback, useEffect, useState } from "react";
import { fetchPlayerStats } from "../services/statsService";

export function usePlayerStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshStats = useCallback(() => {
    getPlayerStats();
  }, []);

  useEffect(() => {
    getPlayerStats();
  }, []);

  async function getPlayerStats() { 
    setLoading(true);

    try {
      const data = await fetchPlayerStats();
      setPlayerStats(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch player stats:", error);
      setLoading(false);
    }
  }

  return {
    playerStats,
    refreshStats,
    loading,
  };
}
