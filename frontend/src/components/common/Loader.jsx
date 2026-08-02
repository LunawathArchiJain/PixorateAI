import { motion } from "framer-motion";

export default function Loader() {

    return (

        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <motion.div
                animate={{
                    rotate: 360
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                }}
                className="w-14 h-14 border-4 border-violet-600 border-t-transparent rounded-full"
            />
        </div>

    );

}