import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import ConfirmDialog from "../components/common/ConfirmDialog";
import HistoryCard from "../components/cards/HistoryCard";
import { CONTENT_TYPES } from "../constants/options";
import { clearHistory, deleteHistoryItem, getHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../utils/format";

const PAGE_SIZE = 10;

export default function History() {
    const { setStats } = useAuth();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [filter, setFilter] = useState("");
    const [status, setStatus] = useState("loading"); // loading | ready | error
    const [loadingMore, setLoadingMore] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [confirmClear, setConfirmClear] = useState(false);

    const load = useCallback(async (nextPage, nextFilter, append) => {
        try {
            const data = await getHistory({ page: nextPage, limit: PAGE_SIZE, contentType: nextFilter });
            setItems((current) => (append ? [...current, ...data.history] : data.history));
            setTotal(data.total);
            setPage(data.page);
            setPages(data.pages);
            setStatus("ready");
        } catch (error) {
            if (append) toast.error(errorMessage(error, "Could not load more."));
            else setStatus("error");
        }
    }, []);

    useEffect(() => {
        load(1, filter, false);
    }, [filter, load]);

    const changeFilter = (next) => {
        if (next === filter) return;
        setStatus("loading");
        setFilter(next);
    };

    const loadMore = async () => {
        setLoadingMore(true);
        await load(page + 1, filter, true);
        setLoadingMore(false);
    };

    const removeItem = async () => {
        try {
            await deleteHistoryItem(toDelete._id);
            setItems((current) => current.filter((item) => item._id !== toDelete._id));
            setTotal((t) => Math.max(t - 1, 0));
            setStats((s) => (s ? { ...s, totalGenerations: Math.max((s.totalGenerations || 1) - 1, 0) } : s));
            toast.success("Deleted");
        } catch (error) {
            toast.error(errorMessage(error, "Could not delete this item."));
            throw error;
        }
    };

    const clearAll = async () => {
        try {
            await clearHistory();
            setItems([]); setTotal(0); setPages(1); setFilter("");
            setStats((s) => (s ? { ...s, totalGenerations: 0, lastGeneratedAt: null } : s));
            toast.success("History cleared");
        } catch (error) {
            toast.error(errorMessage(error, "Could not clear history."));
            throw error;
        }
    };

    return (
        <Layout>
            <PageHeader
                title="History"
                description="Everything you have generated. Original images are not stored, only a small preview."
                action={status === "ready" && (total > 0 || filter) ? <button type="button" className="btn btn-danger" onClick={() => setConfirmClear(true)}>Clear all</button> : null}
            />

            <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by content type">
                <button type="button" className="chip" aria-pressed={filter === ""} onClick={() => changeFilter("")}>All</button>
                {CONTENT_TYPES.map((type) => (
                    <button key={type.id} type="button" className="chip" aria-pressed={filter === type.id} onClick={() => changeFilter(type.id)}>{type.label}</button>
                ))}
            </div>

            {status === "loading" && <div className="panel p-10 text-center text-muted" role="status">Loading history…</div>}

            {status === "error" && (
                <EmptyState title="History could not be loaded" action={<button type="button" className="btn btn-primary" onClick={() => { setStatus("loading"); load(1, filter, false); }}>Try again</button>}>
                    Check that the server is running, then try again.
                </EmptyState>
            )}

            {status === "ready" && items.length === 0 && (
                <EmptyState title={filter ? "Nothing here yet" : "No generations yet"} action={<Link to="/dashboard" className="btn btn-primary">Create content</Link>}>
                    {filter ? "You have not generated this type of content. Pick another filter or create some." : "Your captions, blog posts, scripts and other results will appear here."}
                </EmptyState>
            )}

            {status === "ready" && items.length > 0 && (
                <>
                    <p className="mb-4 text-sm text-muted">{total} {total === 1 ? "item" : "items"}</p>
                    <div className="space-y-4">{items.map((item) => <HistoryCard key={item._id} item={item} onDelete={setToDelete} />)}</div>
                    {page < pages && (
                        <div className="mt-8 flex justify-center">
                            <button type="button" className="btn btn-outline" onClick={loadMore} disabled={loadingMore}>{loadingMore ? "Loading…" : "Load more"}</button>
                        </div>
                    )}
                </>
            )}

            <ConfirmDialog open={!!toDelete} danger title="Delete this item?" description="This removes the generated content from your history. It cannot be undone." confirmLabel="Delete" onConfirm={removeItem} onClose={() => setToDelete(null)} />
            <ConfirmDialog open={confirmClear} danger title="Clear all history?" description="Every generated result in your account will be deleted. This cannot be undone." confirmLabel="Clear all" onConfirm={clearAll} onClose={() => setConfirmClear(false)} />
        </Layout>
    );
}
