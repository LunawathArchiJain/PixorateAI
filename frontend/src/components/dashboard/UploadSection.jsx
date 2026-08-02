import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

import { useDashboard } from "../../context/DashboardContext";

export default function UploadSection() {

    const {
        selectedImage,
        setSelectedImage,
        preview,
        setPreview,
        optionsRef
    } = useDashboard();

    const handleChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);

        setPreview(URL.createObjectURL(file));

        setTimeout(() => {
            optionsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`
                rounded-3xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-500
                ${selectedImage ? "p-5" : "p-10"}
            `}
        >
            <div
                className={`
                    border-2
                    border-dashed
                    border-violet-300
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-50
                    via-white
                    to-pink-50
                    transition-all
                    duration-500
                    flex
                    items-center
                    justify-center
                    ${selectedImage ? "h-44" : "h-[420px]"}
                `}
            >
                {!selectedImage ? (
                    <div className="text-center">
                        <FiUploadCloud
                            size={70}
                            className="mx-auto text-violet-600"
                        />

                        <h2 className="text-2xl font-bold mt-6">
                            Upload an Image
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Drag & Drop your image here
                            <br />
                            or click below to browse.
                        </p>

                        <label
                            className="
                                inline-block
                                mt-8
                                px-8
                                py-3
                                rounded-xl
                                bg-gradient-to-r
                                from-violet-600
                                to-purple-500
                                text-white
                                font-semibold
                                cursor-pointer
                                hover:scale-105
                                transition
                            "
                        >
                            Browse Files

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleChange}
                            />
                        </label>

                        <p className="mt-4 text-sm text-gray-400">
                            JPG • PNG • WEBP
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center gap-6 w-full px-6">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-28 h-28 rounded-xl object-cover shadow"
                        />

                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <FiCheckCircle
                                    className="text-green-500"
                                    size={28}
                                />

                                <h2 className="text-2xl font-bold">
                                    Image Uploaded Successfully
                                </h2>
                            </div>

                            <p className="text-gray-500 mt-2">
                                {selectedImage.name}
                            </p>

                            <label
                                className="
                                    inline-block
                                    mt-5
                                    px-5
                                    py-2
                                    rounded-lg
                                    bg-violet-600
                                    text-white
                                    cursor-pointer
                                    hover:bg-violet-700
                                    transition
                                "
                            >
                                Change Image

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}