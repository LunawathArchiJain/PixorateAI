export const initialsOf = (name = "") =>
    name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "?";

export const formatDate = (value, withTime = false) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString(undefined, withTime
        ? { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }
        : { day: "numeric", month: "short", year: "numeric" });
};

export const errorMessage = (error, fallback) =>
    error?.response?.data?.message || (error?.code === "ERR_NETWORK" ? "Cannot reach the server. Check that the backend is running." : fallback);
