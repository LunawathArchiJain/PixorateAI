import api from "./api";

export const getProfile = async () => (await api.get("/user/profile")).data;
export const updateProfile = async (payload) => (await api.put("/user/profile", payload)).data;
export const updatePreferences = async (payload) => (await api.put("/user/preferences", payload)).data;
export const changePassword = async (payload) => (await api.put("/user/password", payload)).data;
export const deleteAccount = async (password) => (await api.delete("/user/account", { data: { password } })).data;
