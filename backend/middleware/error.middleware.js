/** Central JSON error responder. Always the last middleware. */
export default function errorHandler(error, _req, res, _next) {
    let status = error.status || error.statusCode || 500;
    let message = error.message || "An unexpected server error occurred.";

    if (error.name === "MulterError") {
        status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
        message =
            error.code === "LIMIT_FILE_SIZE" ? "Image must be 5 MB or smaller."
            : error.code === "LIMIT_UNEXPECTED_FILE" ? 'Upload the image using the form field named "image".'
            : "The upload could not be processed.";
    } else if (error.code === 11000) {
        status = 409;
        message = "Email already registered";
    } else if (error.name === "ValidationError") {
        status = 400;
        message = Object.values(error.errors || {})[0]?.message || "Invalid data.";
    } else if (error.name === "CastError") {
        status = 400;
        message = "Invalid identifier.";
    }

    if (status >= 500) {
        console.error("API error:", error);
        if (process.env.NODE_ENV === "production") message = "An unexpected server error occurred.";
    }
    res.status(status).json({ success: false, message });
}
