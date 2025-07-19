import { useCallback, useEffect, useState } from "react";
import { getPlayerQuests } from "../services/questService";

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
      const data = await getPlayerQuests(playerId);
      setQuests(data);
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
