import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import httpError from "./utils/httpError.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((value) => value.trim());

app.use(helmet());
app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
            return callback(httpError(403, "Origin not allowed by CORS"));
        },
    })
);
if (process.env.NODE_ENV !== "test") app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" })); // avatars (small data URLs) are the largest JSON bodies

app.get("/", (_req, res) => res.json({ success: true, name: "PIXORATE AI API", message: "Backend is running." }));
app.get("/api/health", (_req, res) => res.json({ success: true, status: "ok" }));
app.use("/api", routes);

app.use((req, res) => res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` }));
app.use(errorHandler);

export default app;
