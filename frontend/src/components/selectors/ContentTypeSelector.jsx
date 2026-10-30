import { CONTENT_TYPES } from "../../constants/options";
import { CONTENT_ICONS } from "../../constants/icons";

export default function ContentTypeSelector({ value, onChange }) {
    const selected = CONTENT_TYPES.find((type) => type.id === value);
    return (
        <fieldset>
            <legend className="mb-2.5 text-sm font-semibold">What do you want to create?</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CONTENT_TYPES.map((type) => (
                    <button key={type.id} type="button" aria-pressed={value === type.id} onClick={() => onChange(type.id)}
                        className={`flex flex-col items-start gap-2 rounded-md border px-3.5 py-3 text-left text-sm transition-colors ${
                            value === type.id ? "border-accent bg-accent font-semibold text-black" : "border-line hover:border-ink"
                        }`}>
                        <span className="text-lg" aria-hidden="true">{CONTENT_ICONS[type.id]}</span>
                        {type.label}
                    </button>
                ))}
            </div>
            <p className="mt-2.5 min-h-5 text-sm text-muted" aria-live="polite">{selected?.hint}</p>
        </fieldset>
    );
}
