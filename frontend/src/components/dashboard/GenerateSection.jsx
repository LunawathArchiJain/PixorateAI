import { FiZap } from "react-icons/fi";
import { useDashboard } from "../../context/DashboardContext";
import { CONTENT_TYPES, labelOf } from "../../constants/options";

export default function GenerateSection() {
    const { selectedImage, contentType, loading, generate } = useDashboard();
    return (
        <div>
            <button type="button" onClick={generate} disabled={loading || !selectedImage} aria-busy={loading}
                className="btn btn-primary w-full py-4 text-base">
                {loading ? (
                    <><span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" aria-hidden="true" />Generating…</>
                ) : (
                    <><FiZap aria-hidden="true" />Generate {labelOf(CONTENT_TYPES, contentType).toLowerCase()}</>
                )}
            </button>
            {!selectedImage && <p className="mt-2 text-center text-sm text-muted">Upload an image to enable generation.</p>}
        </div>
    );
}
