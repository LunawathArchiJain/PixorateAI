import { Link } from "react-router-dom";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="relative mt-24 border-t border-violet-100 bg-white/70 backdrop-blur-xl">

            <div className="max-w-7xl mx-auto px-8 py-12">

                <div className="flex flex-col md:flex-row justify-between gap-10">

                    {/* Logo & Description */}

                    <div className="max-w-sm">

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-pink-500
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    font-bold
                                    text-xl
                                "
                            >
                                P
                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">
                                    PIXORA
                                </h2>

                                <p className="text-sm text-gray-500">
                                    AI Content Studio
                                </p>

                            </div>

                        </div>

                        <p className="mt-5 text-gray-600 leading-7">

                            Transform your images into captions, blogs,
                            scripts, hashtags, SEO content and much more
                            using AI-powered image understanding.

                        </p>

                    </div>

                    {/* Navigation */}

                    <div>

                        <h3 className="font-semibold text-lg mb-4">

                            Quick Links

                        </h3>

                        <div className="flex flex-col gap-3 text-gray-600">

                            <Link
                                to="/"
                                className="hover:text-violet-600 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/login"
                                className="hover:text-violet-600 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="hover:text-violet-600 transition"
                            >
                                Register
                            </Link>

                        </div>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="font-semibold text-lg mb-4">

                            Connect

                        </h3>

                        <div className="flex gap-4">

                            <a
                                href="#"
                                className="
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-violet-100
                                    text-violet-600
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-violet-600
                                    hover:text-white
                                    transition
                                "
                            >
                                <FaGithub size={20}/>
                            </a>

                            <a
                                href="#"
                                className="
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-violet-100
                                    text-violet-600
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-violet-600
                                    hover:text-white
                                    transition
                                "
                            >
                                <FaLinkedin size={20}/>
                            </a>

                            <a
                                href="#"
                                className="
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-violet-100
                                    text-violet-600
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-violet-600
                                    hover:text-white
                                    transition
                                "
                            >
                                <FaInstagram size={20}/>
                            </a>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="border-t border-violet-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">

                    <p>
                        © 2026 PIXORA AI.
                    </p>

                    <p className="mt-3 md:mt-0">
                        Built using React, Node.js & AI
                    </p>

                </div>

            </div>

        </footer>
    );
}