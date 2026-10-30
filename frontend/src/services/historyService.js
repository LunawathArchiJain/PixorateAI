import api from "./api";

export const getHistory = async ({ page = 1, limit = 12, contentType } = {}) =>
    (await api.get("/history", { params: { page, limit, ...(contentType ? { contentType } : {}) } })).data;
export const deleteHistoryItem = async (id) => (await api.delete(`/history/${id}`)).data;
export const clearHistory = async () => (await api.delete("/history")).data;
