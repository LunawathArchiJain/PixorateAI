import { FiImage, FiBook, FiHash, FiFileText, FiGlobe, FiEdit, FiTrendingUp } from "react-icons/fi";
import { MdMovie } from "react-icons/md";

import { useDashboard } from "../../context/DashboardContext";

const actions = [
    {
        id: "caption",
        title: "Caption",
        icon: <FiImage />
    },

    {
        id: "blog",
        title: "Blog",
        icon: <FiBook />
    },

    {
        id: "script",
        title: "Script",
        icon: <MdMovie />
    },

    {
        id: "hashtags",
        title: "Hashtags",
        icon: <FiHash />
    },

    {
        id: "summary",
        title: "Summary",
        icon: <FiFileText />
    },

    {
        id: "translate",
        title: "Translate",
        icon: <FiGlobe />
    },

    {
        id: "rewrite",
        title: "Rewrite",
        icon: <FiEdit />
    },

    {
        id: "seo",
        title: "SEO",
        icon: <FiTrendingUp />
    }

];

export default function QuickActions() {
    const {
        contentType,
        setContentType
    } = useDashboard();

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-5">
                Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
                {
                    actions.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setContentType(item.id)}
                            className={`
                                flex
                                items-center
                                gap-3
                                px-5
                                py-3
                                rounded-full
                                border
                                transition

                                ${
                                    contentType === item.id
                                        ? "bg-violet-600 text-white border-violet-600"
                                        : "bg-white hover:border-violet-500"
                                }
                            `}
                        >
                            <span
                                className={`text-xl ${
                                    contentType === item.id
                                        ? "text-white"
                                        : "text-violet-600"
                                }`}
                            >
                                {item.icon}
                            </span>

                            {item.title}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}