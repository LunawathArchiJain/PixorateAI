/** A labelled group of single-select chips. Used for platform, tone and language. */
export default function ChipGroup({ legend, options, value, onChange, icons }) {
    return (
        <fieldset>
            <legend className="mb-2.5 text-sm font-semibold">{legend}</legend>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const id = option.id ?? option;
                    const label = option.label ?? option;
                    return (
                        <button key={id} type="button" className="chip" aria-pressed={value === id} onClick={() => onChange(id)}>
                            {icons?.[id] && <span aria-hidden="true">{icons[id]}</span>}
                            {label}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
