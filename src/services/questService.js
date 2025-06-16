const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function fetchQuests() {
  const res = await fetch(`${API_URL}/quests/getCurrentQuests/`);
  // if (!res.ok) throw new Error("Failed to fetch quests");
  return res.json();
}

export async function submitQuestProof(questId, proofTxt, proofImg) {
  const formData = new FormData();
  
  formData.append('questId', questId);
  
  if (proofTxt && proofTxt.trim()) {
    formData.append('proof_txt', proofTxt.trim());
  }
  
  if (proofImg) {
    formData.append('proof_img', proofImg);
  }

  const res = await fetch(`${API_URL}/quests/submitQuestProof`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `Failed to complete quest: ${res.status}`);
  }
  
  return res.json();
}


