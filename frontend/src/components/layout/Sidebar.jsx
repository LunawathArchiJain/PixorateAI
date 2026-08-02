import { NavLink, useNavigate } from "react-router-dom";
import { FiGrid, FiImage, FiClock, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FiGrid />
    },
    {
        name: "Generate",
        path: "/dashboard",
        icon: <FiImage />
    },
    {
        name: "History",
        path: "/history",
        icon: <FiClock />
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <FiUser />
    },
    {
        name: "Settings",
        path: "/settings",
        icon: <FiSettings />
    }
];

export default function Sidebar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
            <aside
                className="
                    w-64
                    min-h-screen
                    bg-white
                    border-r
                    border-gray-200
                    flex
                    flex-col
                    justify-between
                    sticky
                    top-0
                    self-start
                "
            >            
            <div>
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-violet-600">
                        PIXORATE AI
                    </h1>
                </div>
                <nav className="px-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    isActive ? "bg-violet-100 text-violet-700 font-semibold" : "hover:bg-gray-100 text-gray-700"
                                }`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="p-4">
                <button
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 text-red-500"
                >
                    <FiLogOut />
                    Logout
                </button>
            </div>

        </aside>

    );

}