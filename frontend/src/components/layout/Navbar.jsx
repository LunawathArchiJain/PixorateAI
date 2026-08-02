import { FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    return (
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-semibold">
                    Dashboard
                </h2>
            </div>
            <div className="flex items-center gap-5">
                <button
                    onClick={toggleTheme}
                    className="p-3 rounded-full hover:bg-gray-100"
                >
                    {theme === "light"
                        ? <FiMoon/>
                        : <FiSun/>
                    }
                </button>
                <FiBell size={22}/>
                <div className="flex items-center gap-3">
                    <img
                        src={user?.avatar || "https://i.pravatar.cc/150"}
                        alt="Profile"
                        className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                        <h4 className="font-semibold">
                            {user?.name || "Guest"}
                        </h4>
                        <p className="text-sm text-gray-500">
                            {user?.email || ""}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}