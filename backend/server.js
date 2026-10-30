import mongoose from "mongoose";
import { assertEnv } from "./config/env.js";

try {
    assertEnv();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

// Imported after the environment is validated (these modules read process.env on load).
const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/db.js");

try {
    await connectDB();
} catch (error) {
    console.error(`Could not connect to MongoDB: ${error.message}`);
    process.exit(1);
}

const PORT = Number(process.env.PORT) || 5000;
const server = app.listen(PORT, () => console.log(`PIXORATE AI API listening on http://localhost:${PORT}`));

for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => server.close(async () => { await mongoose.disconnect(); process.exit(0); }));
}
