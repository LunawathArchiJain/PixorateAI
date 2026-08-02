import { createContext, useContext, useRef, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    // Image
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // Generation Options
    const [contentType, setContentType] = useState("caption");
    const [platform, setPlatform] = useState("instagram");
    const [tone, setTone] = useState("professional");
    const [language, setLanguage] = useState("English");

    // Generated Result
    const [generatedResult, setGeneratedResult] = useState(null);

    // Loading
    const [loading, setLoading] = useState(false);

    // Scroll Refs
    const optionsRef = useRef(null);
    const resultRef = useRef(null);

    // Reset Dashboard
    const clearDashboard = () => {
        setSelectedImage(null);
        setPreview(null);

        setPlatform("instagram");
        setTone("professional");
        setLanguage("English");
        setContentType("caption");

        setGeneratedResult(null);
        setLoading(false);
    };

    return (
        <DashboardContext.Provider
            value={{
                // Image
                selectedImage,
                setSelectedImage,
                preview,
                setPreview,

                // Options
                contentType,
                setContentType,
                platform,
                setPlatform,
                tone,
                setTone,
                language,
                setLanguage,

                // Generation
                generatedResult,
                setGeneratedResult,
                loading,
                setLoading,

                // UI
                optionsRef,
                resultRef,

                // Utils
                clearDashboard
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);