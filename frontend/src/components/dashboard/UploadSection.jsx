import { useRef, useState } from "react";
import { FiImage, FiRefreshCw, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { useDashboard } from "../../context/DashboardContext";

const formatSize = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`);

export default function UploadSection() {
    const { selectedImage, preview, selectImage, clearImage } = useDashboard();
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);

    const onPick = (event) => {
        const file = event.target.files?.[0];
        if (file) selectImage(file);
        event.target.value = ""; // lets the same file be chosen again
    };
    const onDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file) selectImage(file);
    };

    return (
        <section aria-label="Image" className="rounded-lg bg-black p-4 text-[#F6F5F1] lg:sticky lg:top-24 lg:self-start">
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={onPick} aria-label="Choose an image" tabIndex={-1} />

            {preview ? (
                <div>
                    <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-md bg-[#0d0d0d]">
                        <img src={preview} alt="Your uploaded image" className="max-h-[26rem] w-full object-contain" />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="min-w-0 text-sm">
                            <span className="block truncate font-medium">{selectedImage?.name}</span>
                            <span className="text-[#F6F5F1]/60">{selectedImage ? formatSize(selectedImage.size) : ""}</span>
                        </p>
                        <div className="flex shrink-0 gap-2">
                            <button type="button" onClick={() => inputRef.current?.click()} className="btn border border-white/25 text-[#F6F5F1] hover:border-white"><FiRefreshCw aria-hidden="true" />Replace</button>
                            <button type="button" onClick={clearImage} className="btn border border-white/25 text-[#F6F5F1] hover:border-white" aria-label="Remove image"><FiTrash2 aria-hidden="true" /></button>
                        </div>
                    </div>
                </div>
            ) : (
                <button type="button" onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}
                    className={`flex min-h-80 w-full flex-col items-center justify-center rounded-md border-2 border-dashed px-6 text-center transition-colors ${dragging ? "border-accent bg-accent/10" : "border-accent/70 hover:border-accent"}`}>
                    <span className="text-4xl text-accent" aria-hidden="true">{dragging ? <FiImage /> : <FiUploadCloud />}</span>
                    <span className="mt-4 font-display text-xl font-semibold">{dragging ? "Drop it here" : "Drop an image here"}</span>
                    <span className="mt-1 text-sm text-[#F6F5F1]/70">or click to browse. JPG, PNG or WEBP, up to 5 MB.</span>
                </button>
            )}
        </section>
    );
}
