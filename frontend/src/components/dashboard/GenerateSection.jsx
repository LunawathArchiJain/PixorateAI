import { useDashboard } from "../../context/DashboardContext";
import { generateContent } from "../../services/contentService";
import toast from "react-hot-toast";

export default function GenerateSection() {

    const {
        selectedImage,
        platform,
        tone,
        language,
        contentType,
        setGeneratedResult,
        loading,
        setLoading,
        resultRef
    } = useDashboard();

    const handleGenerate = async () => {

        if (!selectedImage) {
            return toast.error("Please upload an image.");
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("image", selectedImage);
            formData.append("platform", platform);
            formData.append("tone", tone);
            formData.append("language", language);
            formData.append("contentType", contentType);

            const response = await generateContent(formData);

            setGeneratedResult(response.generatedContent);

            setTimeout(() => {

                resultRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 300);

            toast.success("Content Generated Successfully");

        }
        catch (err) {

            console.log(err);

            toast.error("Generation Failed");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="mt-12 flex justify-center">

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="
                    px-10
                    py-4
                    rounded-2xl
                    bg-gradient-to-r
                    from-violet-600
                    to-purple-500
                    text-white
                    text-lg
                    font-semibold
                    hover:scale-105
                    transition
                    disabled:opacity-50
                "
            >

                {
                    loading
                        ? "Generating..."
                        : "Generate AI Content"
                }

            </button>

        </div>

    );

}