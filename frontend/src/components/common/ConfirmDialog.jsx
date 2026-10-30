import { useEffect, useId, useRef, useState } from "react";

function DialogBody({ title, description, confirmLabel, danger, passwordLabel, onConfirm, onClose }) {
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const titleId = useId();
    const cancelRef = useRef(null);

    useEffect(() => {
        cancelRef.current?.focus();
        const onKey = (event) => event.key === "Escape" && !busy && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [busy, onClose]);

    const submit = async (event) => {
        event.preventDefault();
        setBusy(true);
        try {
            await onConfirm(password);
            onClose();
        } catch {
            setBusy(false); // the caller already showed the error; keep the dialog open to retry
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseDown={(e) => e.target === e.currentTarget && !busy && onClose()}>
            <form role="dialog" aria-modal="true" aria-labelledby={titleId} onSubmit={submit} className="panel w-full max-w-md p-6">
                <h2 id={titleId} className="text-xl font-bold">{title}</h2>
                <p className="mt-2 text-muted">{description}</p>
                {passwordLabel && (
                    <div className="mt-5">
                        <label htmlFor={`${titleId}-pw`} className="label">{passwordLabel}</label>
                        <input id={`${titleId}-pw`} type="password" className="input" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                )}
                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" ref={cancelRef} className="btn btn-outline" onClick={onClose} disabled={busy}>Cancel</button>
                    <button type="submit" className={danger ? "btn btn-danger" : "btn btn-primary"} disabled={busy || (passwordLabel && !password)}>
                        {busy ? "Working…" : confirmLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}

/**
 * Modal confirmation. For irreversible actions pass `danger`; pass `passwordLabel` to ask for the password.
 * onConfirm(password) may be async; the dialog closes when it resolves and stays open if it throws.
 */
export default function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", danger = false, passwordLabel, onConfirm, onClose }) {
    if (!open) return null;
    return <DialogBody {...{ title, description, confirmLabel, danger, passwordLabel, onConfirm, onClose }} />;
}
