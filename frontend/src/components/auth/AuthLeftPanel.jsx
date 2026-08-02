import { motion } from "framer-motion";
import {
    FiImage,
    FiHash,
    FiFileText,
    FiTrendingUp,
    FiGlobe,
    FiCpu
} from "react-icons/fi";

const features = [
    {
        icon: <FiImage />,
        title: "AI Image Analysis"
    },
    {
        icon: <FiFileText />,
        title: "Smart Content Generation"
    },
    {
        icon: <FiHash />,
        title: "Trending Hashtags"
    },
    {
        icon: <FiTrendingUp />,
        title: "SEO Optimized Content"
    },
    {
        icon: <FiGlobe />,
        title: "Multi-language Support"
    },
    {
        icon: <FiCpu />,
        title: "Vision + OCR + RAG"
    }
];

export default function AuthLeftPanel() {

    return (

        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-pink-500 text-white">

            {/* Background Glow */}

            <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-300/20 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-center px-20 py-16 w-full">

                {/* Logo */}

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4"
                >

                    <div
                        className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-white
                            text-violet-700
                            flex
                            items-center
                            justify-center
                            text-2xl
                            font-black
                            shadow-xl
                        "
                    >
                        P
                    </div>

                    <div>

                        <h2 className="text-3xl font-black">

                            PIXORA AI

                        </h2>

                        <p className="text-violet-100">

                            AI Content Studio

                        </p>

                    </div>

                </motion.div>

                {/* Heading */}

                <motion.h1
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-16 text-6xl font-black leading-tight"
                >

                    Create

                    <br />

                    Amazing

                    <br />

                    <span className="text-yellow-300">

                        AI Content

                    </span>

                </motion.h1>

                {/* Subtitle */}

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-xl leading-9 text-violet-100 max-w-xl"
                >

                    Upload an image and instantly generate captions,
                    blogs, scripts, SEO content, hashtags and much
                    more using AI-powered image understanding.

                </motion.p>

                {/* Feature Grid */}

                <div className="grid grid-cols-2 gap-5 mt-14">

                    {features.map((feature, index) => (

                        <motion.div
                            key={feature.title}
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: 0.2 + index * 0.08
                            }}
                            whileHover={{
                                y: -5,
                                scale: 1.03
                            }}
                            className="
                                flex
                                items-center
                                gap-4
                                p-5
                                rounded-2xl
                                bg-white/10
                                backdrop-blur-lg
                                border
                                border-white/20
                            "
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-xl
                                    bg-white/20
                                    flex
                                    items-center
                                    justify-center
                                    text-2xl
                                "
                            >
                                {feature.icon}
                            </div>

                            <h3 className="font-semibold">

                                {feature.title}

                            </h3>

                        </motion.div>

                    ))}

                </div>

                {/* Bottom Stats */}

                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.8
                    }}
                    className="flex gap-10 mt-16"
                >

                    <div>

                        <h2 className="text-4xl font-black">

                            8+

                        </h2>

                        <p className="text-violet-100">

                            Content Types

                        </p>

                    </div>

                    <div>

                        <h2 className="text-4xl font-black">

                            AI

                        </h2>

                        <p className="text-violet-100">

                            Vision Powered

                        </p>

                    </div>

                    <div>

                        <h2 className="text-4xl font-black">

                            OCR

                        </h2>

                        <p className="text-violet-100">

                            Text Extraction

                        </p>

                    </div>

                </motion.div>

            </div>

        </div>

    );

}