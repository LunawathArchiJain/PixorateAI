import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { generateContent } from "../services/contentService";
import { DEFAULT_OPTIONS } from "../constants/options";
import { createThumbnail, validateImageFile } from "../utils/image";
import { errorMessage } from "../utils/format";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
    const { user, setStats } = useAuth();
    const prefs = user?.preferences || {};

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    // Start from the defaults saved in Settings. This provider only mounts on the Create page (after login),
    // so reading them in the initial state avoids a flash of the built-in defaults.
    const [contentType, setContentType] = useState(prefs.defaultContentType || DEFAULT_OPTIONS.contentType);
    const [platform, setPlatform] = useState(prefs.defaultPlatform || DEFAULT_OPTIONS.platform);
    const [tone, setTone] = useState(prefs.defaultTone || DEFAULT_OPTIONS.tone);
    const [language, setLanguage] = useState(prefs.defaultLanguage || DEFAULT_OPTIONS.language);
    // { type, data, meta } — `type` is what was generated, so changing the selector never mis-renders old results.
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const resultRef = useRef(null);

    // Free the blob URL when the image changes or the page unmounts.
    useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

    const selectImage = useCallback((file) => {
        const problem = validateImageFile(file);
        if (problem) { toast.error(problem); return false; }
        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
        return true;
    }, []);

    const clearImage = useCallback(() => {
        setSelectedImage(null);
        setPreview(null);
    }, []);

    const generate = useCallback(async () => {
        if (loading) return;
        if (!selectedImage) return void toast.error("Upload an image first.");
        try {
            setLoading(true);
            const form = new FormData();
            form.append("image", selectedImage);
            form.append("platform", platform);
            form.append("tone", tone);
            form.append("language", language);
            form.append("contentType", contentType);
            try { form.append("thumbnail", await createThumbnail(selectedImage)); } catch { /* preview is optional */ }

            const response = await generateContent(form);
            setResult({
                type: response.contentType || contentType,
                data: response.generatedContent,
                meta: { platform, tone, language, createdAt: response.createdAt },
            });
            setStats?.((s) => (s ? { ...s, totalGenerations: (s.totalGenerations || 0) + 1, lastGeneratedAt: response.createdAt } : s));
            toast.success("Content generated");
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
        } catch (error) {
            toast.error(errorMessage(error, "Generation failed. Please try again."));
        } finally {
            setLoading(false);
        }
    }, [loading, selectedImage, platform, tone, language, contentType, setStats]);

    const clearDashboard = useCallback(() => {
        clearImage();
        setResult(null);
    }, [clearImage]);

    const value = {
        selectedImage, preview, selectImage, clearImage,
        contentType, setContentType, platform, setPlatform, tone, setTone, language, setLanguage,
        result, loading, generate, clearDashboard, resultRef,
    };
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export const useDashboard = () => useContext(DashboardContext);
