const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";


export async function fetchAdventures() {
  const res = await fetch(`${API_URL}/adventure/getAdventures/`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to fetch adventures: ${res.status}`);
  }
  return res.json();
}

/* export async function initCombat(questId, name, description, gust) {
  const res = await fetch(`${API_URL}/adventure/editQuest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questId: questId,
      name: name.trim(),
      description: description.trim(),
      gust: gust,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to edit quest: ${res.status}`);
  }

  return res.json();
} */