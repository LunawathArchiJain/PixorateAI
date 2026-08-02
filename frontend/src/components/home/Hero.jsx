import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
    FiArrowRight,
    FiImage,
    FiHash,
    FiFileText,
    FiZap
} from "react-icons/fi";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-8 py-24">

                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT */}

                    <div>

                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-5
                                py-2
                                rounded-full
                                bg-violet-100
                                text-violet-700
                                font-semibold
                            "
                        >
                            AI Powered Content Creation
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="
                                mt-8
                                text-5xl
                                lg:text-7xl
                                font-black
                                leading-tight
                            "
                        >
                            Transform

                            <br />

                            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Images
                            </span>

                            {" "}into

                            <br />

                            <TypeAnimation
                                sequence={[
                                    "Captions",
                                    2000,
                                    "Blogs",
                                    2000,
                                    "SEO Content",
                                    2000,
                                    "Descriptions",
                                    2000,
                                    "Hashtags",
                                    2000
                                ]}
                                wrapper="span"
                                speed={45}
                                repeat={Infinity}
                            />

                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="
                                mt-8
                                text-lg
                                text-gray-600
                                leading-8
                                max-w-xl
                            "
                        >
                            Upload any image and let Pixora AI instantly
                            generate engaging captions, blogs, social posts,
                            hashtags, SEO content, summaries and much more
                            using powerful AI + Computer Vision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-10 flex flex-wrap gap-5"
                        >

                            <Link
                                to="/register"
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-8
                                    py-4
                                    rounded-2xl
                                    text-white
                                    font-semibold
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-pink-500
                                    shadow-xl
                                    hover:scale-105
                                    transition
                                "
                            >
                                Get Started

                                <FiArrowRight />
                            </Link>

                            <Link
                                to="/login"
                                className="
                                    px-8
                                    py-4
                                    rounded-2xl
                                    border
                                    border-violet-200
                                    bg-white
                                    hover:border-violet-500
                                    hover:bg-violet-50
                                    transition
                                "
                            >
                                Login
                            </Link>

                        </motion.div>

                        {/* Feature Pills */}

                        <div className="flex flex-wrap gap-4 mt-14">

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow">

                                <FiImage className="text-violet-600"/>

                                Captions

                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow">

                                <FiFileText className="text-violet-600"/>

                                Blogs

                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow">

                                <FiHash className="text-violet-600"/>

                                SEO

                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow">

                                <FiZap className="text-violet-600"/>

                                AI Powered

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative flex justify-center"
                    >

                        {/* Glow */}

                        <div className="
                            absolute
                            w-[420px]
                            h-[420px]
                            rounded-full
                            bg-violet-400/20
                            blur-[100px]
                        "/>

                        {/* Main Glass Card */}

                        <div
                            className="
                                relative
                                bg-white/70
                                backdrop-blur-xl
                                rounded-3xl
                                p-8
                                border
                                border-white
                                shadow-2xl
                                w-[420px]
                            "
                        >

                            <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 p-6 text-white">

                                <h3 className="text-2xl font-bold">

                                    AI Content Generator

                                </h3>

                                <p className="mt-2 text-sm">

                                    One image.

                                    Unlimited content.

                                </p>

                            </div>

                            <div className="space-y-5 mt-8">

                                <div className="rounded-xl bg-violet-50 p-4">

                                    📸 Image Uploaded

                                </div>

                                <div className="rounded-xl bg-violet-50 p-4">

                                    🧠 AI Analysing Scene...

                                </div>

                                <div className="rounded-xl bg-violet-50 p-4">

                                    ✍️ Generating Caption...

                                </div>

                                <div className="rounded-xl bg-violet-50 p-4">

                                    🚀 Ready!

                                </div>

                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>
    );
}