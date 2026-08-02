import api from "./api";

export const generateContent = async (formData) => {
    const { data } = await api.post(
        "/generate",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return data;

};