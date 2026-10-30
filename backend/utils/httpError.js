/** Creates an Error carrying an HTTP status so the error middleware can answer with it. */
export default function httpError(status, message) {
    const error = new Error(message);
    error.status = status;
    error.expose = true; // safe to show to the user
    return error;
}
