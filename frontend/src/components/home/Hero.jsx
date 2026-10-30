import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SAMPLE_TAGS = ["#morningcoffee", "#slowmornings", "#cafevibes", "#latteart", "#coffeetime"];

export default function Hero() {
    const { user } = useAuth();
    return (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:pt-16">
            <div>
                <h1 className="text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">One image in. Every post you need out.</h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                    Upload a photo, choose the platform, tone and language, and PIXORATE AI writes the caption, hashtags, blog post, script, SEO copy or translation for it. Ready to paste.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                    <Link to={user ? "/dashboard" : "/register"} className="btn btn-primary px-6 py-3.5 text-base">{user ? "Open dashboard" : "Start creating"}</Link>
                    {!user && <Link to="/login" className="btn btn-outline px-6 py-3.5 text-base">I have an account</Link>}
                </div>
                <p className="mt-5 text-sm text-muted">Works with JPG, PNG and WEBP. Your original image is never stored.</p>
            </div>

            <figure aria-label="Sample output" className="rounded-lg bg-black p-6 text-[#F6F5F1] sm:p-8">
                <figcaption className="flex items-center justify-between border-b border-white/15 pb-4 text-sm">
                    <span className="font-semibold">Caption</span>
                    <span className="text-[#F6F5F1]/60">Instagram, friendly, English</span>
                </figcaption>
                <p className="mt-5 font-display text-2xl font-semibold leading-snug">Golden hour, second cup, zero plans. Some mornings are just for this.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                    {SAMPLE_TAGS.map((tag) => <span key={tag} className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-black">{tag}</span>)}
                </div>
                <p className="mt-6 border-t border-white/15 pt-4 text-sm text-[#F6F5F1]/60">Sample output. Yours is written from your own image.</p>
            </figure>
        </section>
    );
}
