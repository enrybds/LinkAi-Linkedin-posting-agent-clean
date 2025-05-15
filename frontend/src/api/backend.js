import axios from "axios";

const API_BASE = "http://localhost:8000";

export async function generatePrompts(instructions) {
  const res = await axios.post(`${API_BASE}/prompt/generate`, { instructions });
  return res.data;
}

export async function generatePost(topic, includeImage, profileId = 1, promptId = null) {
  const res = await axios.post(`${API_BASE}/posts/generate`, {
    profile_id: profileId,
    topic,
    include_image: includeImage,
    prompt_id: promptId
  });
  return res.data;
}

export async function publishPost(profileId, text, imageUrl) {
  const res = await axios.post(`${API_BASE}/posts/publish`, {
    profile_id: profileId,
    text,
    image_url: imageUrl
  });
  return res.data;
}
