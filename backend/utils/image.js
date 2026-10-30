/** Detects the real image type from the file's first bytes (the client-sent mimetype can be faked). */
export function detectImageType(buffer) {
    if (!buffer || buffer.length < 12) return null;
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
    if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
    if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
    return null;
}

const THUMBNAIL = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;
const AVATAR = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

/** Returns the thumbnail data URL if it is a small JPEG, otherwise undefined. */
export function cleanThumbnail(value) {
    return typeof value === "string" && value.length <= 80_000 && THUMBNAIL.test(value) ? value : undefined;
}

/** Valid avatars: empty string (remove), an http(s) URL, or a small image data URL. */
export function isValidAvatar(value) {
    if (value === "") return true;
    if (typeof value !== "string") return false;
    if (value.startsWith("data:")) return value.length <= 120_000 && AVATAR.test(value);
    if (value.length > 500) return false;
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}
