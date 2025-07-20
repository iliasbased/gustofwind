import { useCallback, useEffect, useState } from "react";
import { getPlayerGamemasters } from "../services/playerService";

export function usePlayerGamemasters(playerId) {
  const [gamemasters, setGamemasters] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGamemasters();
  }, []);

  const refreshGamemasters = useCallback(() => {
    getGamemasters();
  }, []);

  async function getGamemasters() {
    setLoading(true);

    try {
      const data = await getPlayerGamemasters(playerId);
      setGamemasters(data.gamemasters);
      setRequests(data.requests);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch player gamemasters:", error);
      setLoading(false);
    }
  }

  return {
    gamemasters,
    requests,
    loading,
    refreshGamemasters,
  };
}
