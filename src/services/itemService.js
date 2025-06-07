const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function fetchPlayerItems() {
  const res = await fetch(`${API_URL}/items/getPlayerItems/`);
  if (!res.ok) throw new Error("Failed to fetch player items");
  return res.json();
}

export async function changeSlot(itemId, slot) {
  const res = await fetch(`${API_URL}/items/changeSlot/${itemId}/${slot}`);
  if (!res.ok) throw new Error("Failed to equip item");
  return res.json();
}

