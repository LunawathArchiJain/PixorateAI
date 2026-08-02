import { useDashboard } from "../../context/DashboardContext";

const tones = [
    "professional",
    "friendly",
    "marketing",
    "funny",
    "storytelling",
    "genZ",
    "luxury",
    "minimal"
];

export default function ToneSelector() {
    const {
        tone,
        setTone
    } = useDashboard();

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-5">
                Select Tone
            </h2>
            <div className="flex flex-wrap gap-4">
                {
                    tones.map((item) => (
                        <button
                            key={item}
                            onClick={() => setTone(item)}
                            className={`
                                px-6
                                py-3
                                rounded-full
                                transition-all
                                capitalize
                                ${
                                    tone === item
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