import { useCallback, useEffect, useState } from "react";
import { fetchAccountGamemasters } from "../services/accountService";

export function useAccountGamemasters() {
  const [gamemasters, setGamemasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamemasters();
  }, []);

  const refreshGamemasters = useCallback(async () => {
    await fetchGamemasters();
  }, []);

  async function fetchGamemasters() {
    setLoading(true);

    try {
      const data = await fetchAccountGamemasters();
      setGamemasters(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch account gamemasters:", error);
      setLoading(false);
    }
  }

  return {
    gamemasters,
    setGamemasters,
    refreshGamemasters,
    loading,
  };
}
