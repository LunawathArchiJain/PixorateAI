import { motion } from "framer-motion";
import {
    FiImage,
    FiFileText,
    FiHash,
    FiGlobe,
    FiTrendingUp,
    FiZap,
    FiCpu,
    FiCamera
} from "react-icons/fi";

const features = [
    {
        icon: <FiCamera size={28} />,
        title: "AI Image Understanding",
        description:
            "Understands scenes, objects, colors, emotions and activities from any uploaded image."
    },
    {
        icon: <FiImage size={28} />,
        title: "Social Media Captions",
        description:
            "Generate engaging captions tailored for Instagram, Facebook, LinkedIn, Twitter and more."
    },
    {
        icon: <FiFileText size={28} />,
        title: "Blogs & Scripts",
        description:
            "Create blogs, YouTube scripts, summaries and marketing copy within seconds."
    },
    {
        icon: <FiHash size={28} />,
        title: "Smart Hashtags",
        description:
            "AI recommends trending and relevant hashtags to maximize your reach."
    },
    {
        icon: <FiTrendingUp size={28} />,
        title: "SEO Optimized",
        description:
            "Generate SEO titles, meta descriptions, keywords and image alt text automatically."
    },
    {
        icon: <FiGlobe size={28} />,
        title: "Multi-Language",
        description:
            "Create and translate content into multiple languages while preserving meaning."
    },
    {
        icon: <FiCpu size={28} />,
        title: "Vision + RAG AI",
        description:
            "Powered by Computer Vision, OCR and Retrieval-Augmented Generation for accurate content."
    },
    {
        icon: <FiZap size={28} />,
        title: "One Click Generation",
        description:
            "Upload once, choose your platform and tone, and let AI generate everything instantly."
    }
];

export default function Features() {
    return (
        <section className="py-24">

            <div className="max-w-7xl mx-auto px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <span
                        className="
                            inline-block
                            px-5
                            py-2
                            rounded-full
                            bg-violet-100
                            text-violet-700
                            font-semibold
                        "
                    >
                        Why Choose Pixora AI?
                    </span>

                    <h2
                        className="
                            mt-6
                            text-5xl
                            font-black
                        "
                    >
                        Everything You Need to Create
                        <br />

                        <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            AI Powered Content
                        </span>

                    </h2>

                    <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">

                        Pixora AI combines Computer Vision, OCR, Retrieval-Augmented
                        Generation and Large Language Models to transform a single
                        image into high-quality content for every platform.

                    </p>

                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

                    {features.map((feature, index) => (

                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.08
                            }}
                            className="
                                group
                                rounded-3xl
                                bg-white/70
                                backdrop-blur-xl
                                border
                                border-white
                                shadow-lg
                                p-8
                                hover:-translate-y-2
                                hover:shadow-2xl
                                transition-all
                                duration-300
                            "
                        >

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-pink-500
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    text-2xl
                                    group-hover:scale-110
                                    transition
                                "
                            >
                                {feature.icon}
                            </div>

                            <h3 className="mt-6 text-xl font-bold">

                                {feature.title}

                            </h3>

                            <p className="mt-4 text-gray-600 leading-7">

                                {feature.description}

                            </p>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}