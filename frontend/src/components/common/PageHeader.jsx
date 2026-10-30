export default function PageHeader({ title, description, action }) {
    return (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
                {description && <p className="mt-2 max-w-xl text-muted">{description}</p>}
            </div>
            {action}
        </div>
    );
}
