const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function fetchAccountPlayers() {
  const res = await fetch(`${API_URL}/account/getAccountPlayers/`);
  if (!res.ok) throw new Error("Failed to fetch heroes");
  return res.json();
}

export async function createPlayer(name, itemId) {
  const res = await fetch(`${API_URL}/account/createPlayer/${name}/${itemId}`);
  if (!res.ok) throw new Error("Failed to create hero");
  return res.json();
}

export async function deletePlayer(heroId) {
  const res = await fetch(`${API_URL}/account/deletePlayer/${heroId}`);
  if (!res.ok) throw new Error("Failed to delete hero");
  return res.json();
}

export async function fetchAccountGamemasters() {
  const res = await fetch(`${API_URL}/account/getAccountGamemasters/`);
  if (!res.ok) throw new Error("Failed to fetch gamemasters");
  return res.json();
}

export async function removePlayerGamemaster(gamemasterId) {
  const res = await fetch(`${API_URL}/account/removePlayerGamemaster/${gamemasterId}`);
  if (!res.ok) throw new Error("Failed to remove gamemaster");
  return res.json();
}

export async function acceptGamemasterRequest(gamemasterId) {
  const res = await fetch(`${API_URL}/account/acceptGamemasterRequest/${gamemasterId}`);
  if (!res.ok) throw new Error("Failed to accept gamemaster request");
  return res.json();
}

export async function declineGamemasterRequest(gamemasterId) {
  const res = await fetch(`${API_URL}/account/declineGamemasterRequest/${gamemasterId}`);
  if (!res.ok) throw new Error("Failed to decline gamemaster request");
  return res.json();
}
