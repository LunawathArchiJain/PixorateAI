export default function EmptyState({ title, children, action }) {
    return (
        <div className="panel px-6 py-14 text-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            {children && <p className="mx-auto mt-2 max-w-md text-muted">{children}</p>}
            {action && <div className="mt-6 flex justify-center">{action}</div>}
        </div>
    );
}
