const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function getPlayer(playerId) {
  const res = await fetch(`${API_URL}/player/getPlayer/${playerId}`, {
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to get player: ${res.status}`);
  }

  return res.json();
}

export async function getGMPlayers(gamemasterId) {
  const res = await fetch(`${API_URL}/player/getGMPlayers/${gamemasterId}`, {
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to get gm players: ${res.status}`);
  }

  return res.json();
}
