import { FiClock, FiPlusSquare, FiSettings, FiUser } from "react-icons/fi";

export const NAV_ITEMS = [
    { to: "/dashboard", label: "Create", icon: <FiPlusSquare /> },
    { to: "/history", label: "History", icon: <FiClock /> },
    { to: "/profile", label: "Profile", icon: <FiUser /> },
    { to: "/settings", label: "Settings", icon: <FiSettings /> },
];
