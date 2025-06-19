const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function fetchStats() {
  const res = await fetch(`${API_URL}/stats/getStats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchPlayerStats() {
  const playerId = JSON.parse(sessionStorage.getItem("selectedHero")).id;
  const res = await fetch(`${API_URL}/stats/getPlayerStats/${playerId}`);
  if (!res.ok) throw new Error("Failed to fetch player stats");
  return res.json();
}