import { useCallback, useEffect, useState } from "react";
import { fetchStarterWeapons } from "../services/itemService";

export function useStarterWeapons() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeapons();
  }, []);

  async function fetchWeapons() {
    setLoading(true);

    try {
      const data = await fetchStarterWeapons();
      setWeapons(Array.isArray(data) ? [...data] : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch starter weapons:", error);
      setLoading(false);
    }
  }

  return {
    weapons,
    setWeapons,
    loading,
  };
}
