const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function fetchPlayerItems(playerId) {
  const res = await fetch(`${API_URL}/items/getPlayerItems/${playerId}/`);
  // if (!res.ok) throw new Error("Failed to fetch player items");
  return res.json();
}

export async function changeSlot(itemId, slot) {
  const playerId = JSON.parse(sessionStorage.getItem("selectedHero")).id;
  const res = await fetch(`${API_URL}/items/changeSlot/${playerId}/${itemId}/${slot}`);
  // if (!res.ok) throw new Error("Failed to equip item");
  return res.json();
}

export async function fetchStarterWeapons() {
  const res = await fetch(`${API_URL}/items/getStarterWeapons/`);
  // if (!res.ok) throw new Error("Failed to fetch starter weapons");
  return res.json();
}

