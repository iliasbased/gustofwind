const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function initCombat(adventureLevelId, party) {
  const res = await fetch(`${API_URL}/combat/initCombat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adventureLevelId: adventureLevelId,
      party: party,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to edit quest: ${res.status}`);
  }

  return res.json();
}

export async function fetchActiveCombat() {
  const res = await fetch(`${API_URL}/combat/getActiveCombat`, {});

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to fetch active combat: ${res.status}`);
  }

  return res.json();
}

export async function startCombat(combatId) {
  const res = await fetch(`${API_URL}/combat/startCombat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      combatId: combatId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to start combat: ${res.status}`);
  }

  return res.json();
}

export async function endPlayerTurn(combatId, action) {
  console.log("Sending player action:", action);

  const res = await fetch(`${API_URL}/combat/endTurn/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      combatId: combatId,
      action: action,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Action failed");
  }

  return res.json();
}

export async function acceptPlayerLoot(combatId) {
  const res = await fetch(`${API_URL}/combat/acceptLoot/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      combatId: combatId,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to accept loot: ${res.status}`);
  }
  return res.json();
}
