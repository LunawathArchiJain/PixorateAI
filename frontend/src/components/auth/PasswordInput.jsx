import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({ id, value, onChange, autoComplete, minLength }) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <input id={id} type={visible ? "text" : "password"} className="input pr-11" value={value} onChange={onChange} autoComplete={autoComplete} minLength={minLength} required />
            <button type="button" onClick={() => setVisible((v) => !v)} aria-label={visible ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-muted hover:text-ink">
                {visible ? <FiEyeOff /> : <FiEye />}
            </button>
        </div>
    );
}
