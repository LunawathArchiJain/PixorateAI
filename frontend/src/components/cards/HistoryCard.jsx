import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import ResultCard from "./ResultCard";
import CopyButton from "../common/CopyButton";
import { CONTENT_TYPES, PLATFORMS, TONES, labelOf } from "../../constants/options";
import { CONTENT_ICONS } from "../../constants/icons";
import { resultToText } from "../../utils/formatResult";
import { formatDate } from "../../utils/format";

const previewOf = (type, d = {}) =>
    ({
        caption: d.caption, blog: d.title, script: d.title || d.hook, hashtags: d.hashtags?.join(" "), summary: d.summary,
        seo: d.title, rewrite: d.rewrittenText, translate: d.translatedText,
    })[type] || "Generated content";

export default function HistoryCard({ item, onDelete }) {
    const [open, setOpen] = useState(false);
    return (
        <article className="panel p-5">
            <div className="flex gap-4">
                {item.thumbnail ? (
                    <img src={item.thumbnail} alt="" className="h-16 w-16 shrink-0 rounded-md object-cover" />
                ) : (
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-accent-tint text-2xl" aria-hidden="true">{CONTENT_ICONS[item.contentType]}</span>
                )}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="tag">{labelOf(CONTENT_TYPES, item.contentType)}</span>
                        <span className="text-muted">{labelOf(PLATFORMS, item.platform)}, {labelOf(TONES, item.tone).toLowerCase()}, {item.language}</span>
                        <time className="ml-auto text-muted" dateTime={item.createdAt}>{formatDate(item.createdAt, true)}</time>
                    </div>
                    <p className={`mt-2 whitespace-pre-wrap ${open ? "" : "line-clamp-2"}`}>{previewOf(item.contentType, item.generatedContent)}</p>
                </div>
            </div>

            {open && <div className="mt-5 border-t border-line pt-5"><ResultCard type={item.contentType} data={item.generatedContent} /></div>}

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => setOpen((v) => !v)} className="btn btn-outline" aria-expanded={open}>
                    {open ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}{open ? "Hide details" : "View details"}
                </button>
                <CopyButton text={resultToText(item.contentType, item.generatedContent)} />
                <button type="button" onClick={() => onDelete(item)} className="btn btn-danger ml-auto" aria-label="Delete this item"><FiTrash2 aria-hidden="true" />Delete</button>
            </div>
        </article>
    );
}
