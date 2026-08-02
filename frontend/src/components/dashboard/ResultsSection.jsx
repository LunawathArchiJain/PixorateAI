import {
    FiCopy,
    FiDownload,
    FiRefreshCw,
    FiCheckCircle
} from "react-icons/fi";

import { useDashboard } from "../../context/DashboardContext";
import toast from "react-hot-toast";

export default function ResultsSection() {

    const {
        generatedResult,
        contentType
    } = useDashboard();

    if (!generatedResult) {
        return (
            <div className="mt-12 rounded-3xl border bg-white p-16 text-center text-gray-500">
                Nothing generated yet.
            </div>
        );
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(
            JSON.stringify(generatedResult, null, 2)
        );

        toast.success("Copied to clipboard");
    };

    const download = () => {

        const blob = new Blob(
            [JSON.stringify(generatedResult, null, 2)],
            {
                type: "application/json"
            }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "pixorate-content.json";
        a.click();

        URL.revokeObjectURL(url);
    };

    const Section = ({ title, children }) => (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">
                {title}
            </h3>

            {children}
        </div>
    );

    const renderContent = () => {

        switch (contentType) {

            // ==========================
            // Caption
            // ==========================

            case "caption":

                return (
                    <>
                        {generatedResult.sceneDescription && (
                            <Section title="Scene Description">
                                <p className="whitespace-pre-wrap">
                                    {generatedResult.sceneDescription}
                                </p>
                            </Section>
                        )}

                        <Section title="Caption">
                            <p className="whitespace-pre-wrap">
                                {generatedResult.caption}
                            </p>
                        </Section>

                        {generatedResult.hashtags?.length > 0 && (
                            <Section title="Hashtags">
                                <div className="flex flex-wrap gap-2">
                                    {generatedResult.hashtags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-2 rounded-full bg-violet-100 text-violet-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {generatedResult.emojiSuggestions?.length > 0 && (
                            <Section title="Emoji Suggestions">
                                <div className="flex flex-wrap gap-2 text-2xl">
                                    {generatedResult.emojiSuggestions.map(
                                        (emoji) => (
                                            <span key={emoji}>
                                                {emoji}
                                            </span>
                                        )
                                    )}
                                </div>
                            </Section>
                        )}

                        {generatedResult.callToAction && (
                            <Section title="Call To Action">
                                <p>
                                    {generatedResult.callToAction}
                                </p>
                            </Section>
                        )}
                    </>
                );

            // ==========================
            // Blog
            // ==========================

            case "blog":

                return (
                    <>
                        <Section title="Blog Title">
                            <h2 className="text-2xl font-bold">
                                {generatedResult.title}
                            </h2>
                        </Section>

                        <Section title="Introduction">
                            <p className="whitespace-pre-wrap">
                                {generatedResult.introduction}
                            </p>
                        </Section>

                        {generatedResult.body && (
                            <Section title="Blog">
                                <p className="whitespace-pre-wrap">
                                    {generatedResult.body}
                                </p>
                            </Section>
                        )}

                        {generatedResult.conclusion && (
                            <Section title="Conclusion">
                                <p className="whitespace-pre-wrap">
                                    {generatedResult.conclusion}
                                </p>
                            </Section>
                        )}
                    </>
                );

            // ==========================
            // Script
            // ==========================

            case "script":

                return (
                    <>
                        <Section title="Title">
                            <h2 className="text-2xl font-bold">
                                {generatedResult.title}
                            </h2>
                        </Section>

                        <Section title="Script">
                            <p className="whitespace-pre-wrap">
                                {generatedResult.script}
                            </p>
                        </Section>
                    </>
                );

            // ==========================
            // Summary
            // ==========================

            case "summary":

                return (
                    <>
                        {generatedResult.sceneDescription && (
                            <Section title="Scene Description">
                                <p className="whitespace-pre-wrap">
                                    {generatedResult.sceneDescription}
                                </p>
                            </Section>
                        )}

                        <Section title="Summary">
                            <p className="whitespace-pre-wrap">
                                {generatedResult.summary}
                            </p>
                        </Section>

                        {generatedResult.keyPoints?.length > 0 && (
                            <Section title="Key Points">
                                <ul className="list-disc list-inside space-y-2">
                                    {generatedResult.keyPoints.map(
                                        (point, index) => (
                                            <li key={index}>
                                                {point}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </Section>
                        )}
                    </>
                );

            // ==========================
            // Hashtags
            // ==========================

            case "hashtags":

                return (
                    <Section title="Generated Hashtags">
                        <div className="flex flex-wrap gap-3">
                            {generatedResult.hashtags?.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-2 rounded-full bg-violet-100 text-violet-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Section>
                );

            // ==========================
            // SEO
            // ==========================

            case "seo":

                return (
                    <>
                        <Section title="SEO Title">
                            <p>{generatedResult.title}</p>
                        </Section>

                        <Section title="Meta Description">
                            <p>{generatedResult.metaDescription}</p>
                        </Section>

                        <Section title="Keywords">
                            <div className="flex flex-wrap gap-2">
                                {generatedResult.keywords?.map(keyword => (
                                    <span
                                        key={keyword}
                                        className="px-3 py-2 rounded-full bg-violet-100 text-violet-700"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </Section>

                        {generatedResult.altText && (
                            <Section title="Alt Text">
                                <p>{generatedResult.altText}</p>
                            </Section>
                        )}
                    </>
                );
            // ==========================
            // Rewrite
            // ==========================
            case "rewrite":
                return (
                    <Section title="Rewritten Content">
                        <p className="whitespace-pre-wrap">
                            {generatedResult.rewrittenText}
                        </p>
                    </Section>
                );
            // ==========================
            // Translate
            // ==========================
            case "translate":
                return (
                    <Section title="Translated Text">
                        <p className="whitespace-pre-wrap">
                            {generatedResult.translatedText}
                        </p>
                    </Section>
                );
            // ==========================
            // Default
            // ==========================

            default:
                return (
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(
                            generatedResult,
                            null,
                            2
                        )}
                    </pre>
                );
        }
    };
    return (
        <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <FiCheckCircle
                        size={28}
                        className="text-green-500"
                    />
                    <h2 className="text-3xl font-bold">
                        AI Generated Content
                    </h2>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 rounded-xl border hover:bg-gray-50 flex items-center gap-2"
                    >
                        <FiCopy />
                        Copy
                    </button>
                    <button
                        onClick={download}
                        className="px-4 py-2 rounded-xl border hover:bg-gray-50 flex items-center gap-2"
                    >
                        <FiDownload />
                        Download
                    </button>
                    <button
                        className="px-4 py-2 rounded-xl bg-violet-600 text-white flex items-center gap-2"
                    >
                        <FiRefreshCw />
                        Regenerate
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-3xl border shadow-sm p-10">
                <div className="rounded-2xl border bg-gradient-to-br from-violet-50 via-white to-pink-50 p-8 leading-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}