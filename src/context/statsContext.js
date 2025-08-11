import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchStats, fetchPlayerStats } from "../services/statsService";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayerStats();
    fetchStats().then((data) => {
      setStats(data);
    });
  }, []);

  const refreshStats = useCallback(() => {
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

  return (
    <StatsContext.Provider value={{ stats, playerStats, loading, refreshStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  return useContext(StatsContext);
}

export function getStatName(stats, statId) {
  if (!stats) return undefined;
  const stat = stats.find((s) => s.id === statId);
  return stat ? stat.name : undefined;
}
