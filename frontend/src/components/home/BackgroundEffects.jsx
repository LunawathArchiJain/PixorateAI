import { motion } from "framer-motion";

export default function BackgroundEffects() {
    return (
        <>
            <motion.div
                animate={{
                    x: [0, 60, 0],
                    y: [0, 40, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity
                }}
                className="absolute
                           -top-48
                           -left-48
                           h-[500px]
                           w-[500px]
                           rounded-full
                           bg-violet-300/30
                           blur-[120px]"
            />

            <motion.div
                animate={{
                    x: [0, -50, 0],
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity
                }}
                className="absolute
                           top-32
                           right-0
                           h-[450px]
                           w-[450px]
                           rounded-full
                           bg-pink-300/30
                           blur-[120px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.15, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity
                }}
                className="absolute
                           bottom-0
                           left-1/3
                           h-[350px]
                           w-[350px]
                           rounded-full
                           bg-cyan-300/20
                           blur-[120px]"
            />
        </>
    );
}