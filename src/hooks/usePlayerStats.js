import { useCallback, useEffect, useState } from "react";
import { fetchPlayerStats } from "../services/statsService";

export function usePlayerStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshStats = useCallback(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() { 
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
