import api from "./api";

export const analyzeImage = async (formData) => {
    const { data } = await api.post("/vision", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return data;

};