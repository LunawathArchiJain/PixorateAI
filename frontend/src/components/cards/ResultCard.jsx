import CopyButton from "../common/CopyButton";

function Field({ title, text, children }) {
    return (
        <section className="border-t border-line py-5 first:border-t-0 first:pt-0 last:pb-0">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="font-sans text-sm font-semibold text-muted">{title}</h3>
                {text && <CopyButton compact text={text} label={`Copy ${title.toLowerCase()}`} />}
            </div>
            {children ?? <p className="whitespace-pre-wrap leading-7">{text}</p>}
        </section>
    );
}

const Tags = ({ items }) => (
    <div className="flex flex-wrap gap-2">{items.map((item, index) => <span key={`${item}-${index}`} className="tag">{item}</span>)}</div>
);

/** Renders one generated result. `type` decides the layout; empty fields are skipped. */
export default function ResultCard({ type, data = {} }) {
    const show = (title, value) => (value ? <Field title={title} text={value} /> : null);
    const tags = (title, items, joiner = " ") => (items?.length ? <Field title={title} text={items.join(joiner)}><Tags items={items} /></Field> : null);

    switch (type) {
        case "caption":
            return <>{show("Caption", data.caption)}{tags("Hashtags", data.hashtags)}{data.emojiSuggestions?.length ? <Field title="Emoji ideas"><p className="text-2xl">{data.emojiSuggestions.join(" ")}</p></Field> : null}{show("Call to action", data.callToAction)}{show("What the AI saw", data.sceneDescription)}</>;
        case "blog":
            return <>{show("Title", data.title)}{show("Introduction", data.introduction)}{show("Body", data.body)}{show("Conclusion", data.conclusion)}</>;
        case "script":
            return <>{show("Title", data.title)}{show("Hook", data.hook)}{show("Script", data.script)}{show("Call to action", data.callToAction)}</>;
        case "hashtags":
            return tags("Hashtags", data.hashtags);
        case "summary":
            return <>{show("Summary", data.summary)}{data.keyPoints?.length ? <Field title="Key points" text={data.keyPoints.map((p) => `- ${p}`).join("\n")}><ul className="list-disc space-y-1.5 pl-5 leading-7">{data.keyPoints.map((point, i) => <li key={i}>{point}</li>)}</ul></Field> : null}{show("What the AI saw", data.sceneDescription)}</>;
        case "seo":
            return <>{show("SEO title", data.title)}{show("Meta description", data.metaDescription)}{tags("Keywords", data.keywords, ", ")}{show("Image alt text", data.altText)}</>;
        case "rewrite":
            return show("Rewritten text", data.rewrittenText);
        case "translate":
            return show("Translated text", data.translatedText);
        default:
            return <pre className="overflow-x-auto text-sm">{JSON.stringify(data, null, 2)}</pre>;
    }
}
