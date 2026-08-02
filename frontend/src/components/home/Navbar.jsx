import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="
                sticky
                top-0
                z-50
                backdrop-blur-xl
                bg-white/70
                border-b
                border-white/40
            "
        >
            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <div
                        className="
                            h-11
                            w-11
                            rounded-xl
                            bg-gradient-to-br
                            from-violet-600
                            to-pink-500
                            text-white
                            flex
                            items-center
                            justify-center
                            text-xl
                            font-bold
                            shadow-lg
                        "
                    >
                        P
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-wide">
                            PIXORA
                        </h1>

                        <p className="text-xs text-gray-500">
                            AI Content Studio
                        </p>
                    </div>
                </Link>

                {/* Buttons */}
                <div className="flex items-center gap-4">

                    <Link
                        to="/login"
                        className="
                            px-5
                            py-2.5
                            rounded-xl
                            font-medium
                            hover:bg-violet-50
                            transition
                        "
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            text-white
                            bg-gradient-to-r
                            from-violet-600
                            via-purple-500
                            to-pink-500
                            shadow-lg
                            hover:scale-105
                            hover:shadow-violet-300/50
                            transition-all
                            duration-300
                        "
                    >
                        Get Started
                    </Link>

                </div>

            </div>
        </motion.header>
    );
}