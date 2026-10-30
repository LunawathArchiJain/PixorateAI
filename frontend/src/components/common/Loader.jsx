export default function Loader({ label = "Loading" }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-canvas" role="status" aria-live="polite">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
            <span className="sr-only">{label}</span>
        </div>
    );
}
