import { FiDownload, FiRefreshCw } from "react-icons/fi";
import { useDashboard } from "../../context/DashboardContext";
import ResultCard from "../cards/ResultCard";
import CopyButton from "../common/CopyButton";
import { CONTENT_TYPES, PLATFORMS, TONES, labelOf } from "../../constants/options";
import { resultToText } from "../../utils/formatResult";

export default function ResultsSection() {
    const { result, loading, generate, resultRef } = useDashboard();
    if (!result && !loading) return null;

    const text = result ? resultToText(result.type, result.data) : "";
    const download = () => {
        const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
        const link = Object.assign(document.createElement("a"), { href: url, download: `pixorate-${result.type}.txt` });
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <section ref={resultRef} aria-label="Result" className="mt-12 scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">{result ? labelOf(CONTENT_TYPES, result.type) : "Generating"}</h2>
                    {result && (
                        <p className="mt-1 text-sm text-muted">
                            {labelOf(PLATFORMS, result.meta.platform)}, {labelOf(TONES, result.meta.tone).toLowerCase()} tone, in {result.meta.language}
                        </p>
                    )}
                </div>
                {result && (
                    <div className="flex flex-wrap gap-2">
                        <CopyButton text={text} label="Copy all" />
                        <button type="button" onClick={download} className="btn btn-outline"><FiDownload aria-hidden="true" />Download</button>
                        <button type="button" onClick={generate} disabled={loading} className="btn btn-dark">
                            <FiRefreshCw className={loading ? "animate-spin" : ""} aria-hidden="true" />Regenerate
                        </button>
                    </div>
                )}
            </div>

            <div className={`panel p-6 transition-opacity sm:p-8 ${loading ? "opacity-50" : ""}`} aria-busy={loading}>
                {result ? <ResultCard type={result.type} data={result.data} /> : (
                    <div className="space-y-3" role="status"><span className="sr-only">Generating content</span>
                        {[90, 75, 60].map((w) => <div key={w} className="h-4 animate-pulse rounded bg-line" style={{ width: `${w}%` }} />)}
                    </div>
                )}
            </div>
        </section>
    );
}
