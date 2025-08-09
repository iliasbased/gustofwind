const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function fetchAdventures() {
  const res = await fetch(`${API_URL}/adventure/getAdventures/`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to fetch adventures: ${res.status}`);
  }
  return res.json();
}

export async function fetchLoot() {
  const res = await fetch(`${API_URL}/adventure/getLoot/`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to get loot: ${res.status}`);
  }
  return res.json();
}