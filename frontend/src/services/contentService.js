import api from "./api";

/** formData: image (File), platform, tone, language, contentType, thumbnail (optional data URL) */
export const generateContent = async (formData) => (await api.post("/generate", formData)).data;
