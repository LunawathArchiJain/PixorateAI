import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiCopy } from "react-icons/fi";

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for non-secure contexts / older browsers.
        const area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        return ok;
    }
}

export default function CopyButton({ text, label = "Copy", compact = false, className = "" }) {
    const [copied, setCopied] = useState(false);
    const onClick = async () => {
        if (!text) return;
        if (await copyText(text)) {
            setCopied(true);
            toast.success("Copied to clipboard");
            setTimeout(() => setCopied(false), 1500);
        } else toast.error("Could not copy. Select the text and copy it manually.");
    };
    return (
        <button type="button" onClick={onClick} aria-label={compact ? `${label} ${copied ? "(copied)" : ""}` : undefined}
            className={compact ? `rounded-md p-1.5 text-muted hover:text-ink ${className}` : `btn btn-outline ${className}`}>
            {copied ? <FiCheck /> : <FiCopy />}
            {!compact && (copied ? "Copied" : label)}
        </button>
    );
}
