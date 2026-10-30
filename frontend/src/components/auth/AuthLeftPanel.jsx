import Logo from "../common/Logo";
import { CONTENT_TYPES } from "../../constants/options";

export default function AuthLeftPanel({ heading, text }) {
    return (
        <aside className="hidden flex-col justify-between bg-black p-12 text-[#F6F5F1] lg:flex">
            <Logo className="text-[#F6F5F1]" />
            <div>
                <h2 className="max-w-md text-5xl font-bold leading-tight">{heading}</h2>
                <p className="mt-5 max-w-md text-lg text-[#F6F5F1]/70">{text}</p>
                <ul className="mt-10 flex max-w-md flex-wrap gap-2" aria-label="What you can create">
                    {CONTENT_TYPES.map((type) => <li key={type.id} className="rounded-full border border-white/25 px-3.5 py-1.5 text-sm">{type.label}</li>)}
                </ul>
            </div>
            <p className="text-sm text-[#F6F5F1]/50">Powered by Google Gemini</p>
        </aside>
    );
}
