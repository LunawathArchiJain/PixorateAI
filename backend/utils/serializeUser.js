/** The only shape in which a user ever leaves the API (never includes the password hash). */
export function serializeUser(user) {
    const preferences = user.preferences?.toObject?.() ?? user.preferences ?? {};
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
        preferences: {
            theme: preferences.theme ?? "light",
            defaultPlatform: preferences.defaultPlatform ?? "instagram",
            defaultTone: preferences.defaultTone ?? "professional",
            defaultLanguage: preferences.defaultLanguage ?? "English",
            defaultContentType: preferences.defaultContentType ?? "caption",
        },
        createdAt: user.createdAt,
    };
}
