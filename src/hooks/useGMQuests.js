import { useCallback, useEffect, useState } from "react";
import { fetchGamemasterQuests } from "../services/questService";

export function useGMQuests() {
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
      const data = await fetchGamemasterQuests();
      setQuests(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch gm quests:", error);
      setLoading(false);
    }
  }

  return {
    gmQuests: quests,
    loading,
    refreshGmQuests: refreshQuests,
  };
}
