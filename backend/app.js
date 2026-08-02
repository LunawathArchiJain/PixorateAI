import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PIXORATE AI Backend Running 🚀",
    });
});

export default app;