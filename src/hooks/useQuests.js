import { useCallback, useEffect, useState } from "react";
import { fetchQuests } from "../services/questService";

export function useQuests() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuests();
  }, []);

  const refreshQuests = useCallback(() => {
    getQuests();
  }, []);

  async function getQuests() {
    setLoading(true);

    try {
      const data = await fetchQuests();
      setQuests(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch player stats:", error);
      setLoading(false);
    }
  }

  return {
    quests,
    loading,
    refreshQuests,
  };
}
