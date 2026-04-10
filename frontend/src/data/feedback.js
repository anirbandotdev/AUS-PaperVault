// src/data/feedback.js

import { apiFetch } from "../api/api";

export async function getFeedback() {
  try {
    const token = localStorage.getItem("access_token");
    const data = await apiFetch("/feedback/list", "GET", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data.feedbacks
  } catch (e) {
    return [];
  }
}



export async function deleteFeedback(id) {
  const feedbackList = await getFeedback();
  const filtered = feedbackList.filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event("feedbackUpdated"));
}
