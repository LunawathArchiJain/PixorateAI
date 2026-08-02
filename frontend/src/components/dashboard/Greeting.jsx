import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function Greeting() {
    const { user } = useAuth();
    const hour = new Date().getHours();
    let greeting = "Hello";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";
    else greeting = "Good Evening";
    return (
        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
        >
            <h1 className="text-4xl font-bold text-[var(--text)]">

                {greeting},{" "}
                <span className="text-violet-600">
                    {user?.name || "Creator"}
                </span>
                👋
            </h1>
            <p className="mt-2 text-gray-500 text-lg">
                Upload an image and let AI generate content
                tailored for your favorite platform.
            </p>
        </motion.div>
    );
}