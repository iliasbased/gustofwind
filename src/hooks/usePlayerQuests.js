import { useCallback, useEffect, useState } from "react";
import { fetchPlayerQuests } from "../services/questService";

export function usePlayerQuests(playerId) {
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
      const data = await fetchPlayerQuests(playerId);
      setQuests(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch gm quests:", error);
      setLoading(false);
    }
  }

  return {
    playerQuests: quests,
    loading,
    refreshPlayerQuests: refreshQuests,
  };
}
