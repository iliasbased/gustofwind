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

export async function getPlayerByName(name) {
  const res = await fetch(`${API_URL}/player/getPlayerByName/${name}`, {
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to get player by name: ${res.status}`);
  }

  return res.json();
}

export async function getPlayerGamemasters(playerId) {
  const res = await fetch(`${API_URL}/player/getPlayerGamemasters/${playerId}`, {
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to get player gamemasters: ${res.status}`);
  }

  return res.json();
}

export async function sendGamemasterInvite(playerId) {
  const res = await fetch(`${API_URL}/player/sendGamemasterInvite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerId }), // Assuming gamemasterId is 1 for this example
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to send invite: ${res.status}`);
  }

  return res.json();
}
