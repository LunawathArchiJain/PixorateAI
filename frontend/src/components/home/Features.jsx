import { CONTENT_TYPES, PLATFORMS } from "../../constants/options";
import { CONTENT_ICONS } from "../../constants/icons";

const STEPS = [
    ["Upload", "Drop in a JPG, PNG or WEBP up to 5 MB."],
    ["Choose", "Pick the content type, platform, tone and language."],
    ["Generate", "Gemini reads the image and writes the result. Copy it, download it, or regenerate."],
];

export default function Features() {
    return (
        <>
            <section className="border-y border-line bg-surface py-20" aria-labelledby="types-heading">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 id="types-heading" className="max-w-2xl text-4xl font-bold">Eight kinds of content from a single upload</h2>
                    <ul className="mt-12 grid gap-x-12 sm:grid-cols-2">
                        {CONTENT_TYPES.map((type) => (
                            <li key={type.id} className="flex gap-4 border-t border-line py-6">
                                <span className="mt-1 text-2xl text-accent-text" aria-hidden="true">{CONTENT_ICONS[type.id]}</span>
                                <div>
                                    <h3 className="text-xl font-semibold">{type.label}</h3>
                                    <p className="mt-1 text-muted">{type.hint}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-10 text-muted">
                        Written for {PLATFORMS.map((p) => p.label).join(", ")}, in English, Hindi, Telugu, Spanish or French.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-20" aria-labelledby="how-heading">
                <h2 id="how-heading" className="text-4xl font-bold">How it works</h2>
                <ol className="mt-12 grid gap-10 md:grid-cols-3">
                    {STEPS.map(([title, text], index) => (
                        <li key={title}>
                            <span className="font-display text-6xl font-bold text-accent-text" aria-hidden="true">{index + 1}</span>
                            <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
                            <p className="mt-2 text-muted">{text}</p>
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}
