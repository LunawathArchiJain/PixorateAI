import "dotenv/config";

const REQUIRED = ["MONGO_URI", "JWT_SECRET", "GEMINI_API_KEY"];

/** Throws a readable error when the server is misconfigured. Called once at startup. */
export function assertEnv() {
    const missing = REQUIRED.filter((key) => !process.env[key]);
    if (missing.length) {
        throw new Error(
            `Missing required environment variables: ${missing.join(", ")}. Copy backend/.env.example to backend/.env and fill them in.`
        );
    }
    if (process.env.JWT_SECRET.length < 16) {
        const message = "JWT_SECRET is too short. Use at least 32 random characters.";
        if (process.env.NODE_ENV === "production") throw new Error(message);
        console.warn(`Warning: ${message}`);
    }
}
