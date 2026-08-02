import { useDashboard } from "../../context/DashboardContext";

const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Spanish",
    "French"
];

export default function LanguageSelector() {
    const {
        language,
        setLanguage
    } = useDashboard();

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-5">
                Select Language
            </h2>
            <div className="flex flex-wrap gap-4">
                {
                    languages.map((item) => (
                        <button
                            key={item}
                            onClick={() => setLanguage(item)}
                            className={`
                                px-6
                                py-3
                                rounded-full
                                transition-all
                                capitalize

                                ${
                                    language === item
                                        ? "bg-violet-600 text-white"
                                        : "bg-white border hover:border-violet-400"
                                }
                            `}
                        >
                            {item}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}