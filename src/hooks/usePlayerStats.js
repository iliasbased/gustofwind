import { useCallback, useEffect, useState } from "react";
import { fetchPlayerStats } from "../services/statsService";

export function usePlayerStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshStats = useCallback(() => {
    setLoading(true);
    fetchPlayerStats().then((data) => {
      setPlayerStats(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    fetchPlayerStats().then((data) => {
      setPlayerStats(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    });
  }, []);

  return {
    playerStats,
    refreshStats,
    loading,
  };
}
