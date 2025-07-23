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