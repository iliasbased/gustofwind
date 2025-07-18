const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function fetchQuests() {
  const res = await fetch(`${API_URL}/quests/getCurrentQuests/`);
  // if (!res.ok) throw new Error("Failed to fetch quests");
  return res.json();
}

export async function submitQuestProof(questId, proofTxt, proofImg) {
  const formData = new FormData();

  formData.append("questId", questId);

  if (proofTxt && proofTxt.trim()) {
    formData.append("proof_txt", proofTxt.trim());
  }

  if (proofImg) {
    formData.append("proof_img", proofImg);
  }

  const res = await fetch(`${API_URL}/quests/submitQuestProof`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to complete quest: ${res.status}`);
  }

  return res.json();
}

export async function fetchPlayerQuests(playerId) {
  const res = await fetch(`${API_URL}/quests/getPlayerQuests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playerId: playerId
    }),
  });
  return res.json();
}

export async function fetchGamemasterQuests() {
  const res = await fetch(`${API_URL}/quests/getGamemasterQuests/`);
  // if (!res.ok) throw new Error("Failed to fetch quests");
  return res.json();
}

export async function submitQuest(name, description, gust) {
  const res = await fetch(`${API_URL}/quests/submitQuest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      description: description.trim(),
      gust: gust,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to submit quest: ${res.status}`);
  }

  return res.json();
}

export async function editQuest(questId, name, description, gust) {
  const res = await fetch(`${API_URL}/quests/editQuest`, {
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
}

export async function deleteQuest(questId) {
  const res = await fetch(`${API_URL}/quests/deleteQuest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questId: questId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to delete quest: ${res.status}`);
  }

  return res.json();
}

export async function assignQuest(questId, playerId, isDaily) {
  const res = await fetch(`${API_URL}/quests/assignQuest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questId: questId,
      playerId: playerId,
      isDaily: isDaily,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to assign quest: ${res.status}`);
  }

  return res.json();
}

export async function removeQuest(questId, playerId) {
  const res = await fetch(`${API_URL}/quests/removeQuest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questId: questId,
      playerId: playerId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to remove quest: ${res.status}`);
  }

  return res.json();
}

export async function approveQuest(questId, playerId) {
  const res = await fetch(`${API_URL}/quests/approveQuest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questId: questId,
      playerId: playerId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to approve quest: ${res.status}`);
  }

  return res.json();
}
