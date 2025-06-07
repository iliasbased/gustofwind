import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchStats } from "../services/statsService";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then((data) => {
      setStats(data);
    });
  }, []);

  return (
    <StatsContext.Provider value={{ stats }}>{children}</StatsContext.Provider>
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