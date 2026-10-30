import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-canvas text-ink">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <Navbar />
                <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 lg:px-10 lg:py-10">{children}</main>
            </div>
        </div>
    );
}
