import { MAX_IMAGE_MB } from "../constants/options";

const TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Returns an error message, or null if the file is acceptable. */
export function validateImageFile(file) {
    if (!file) return "Choose an image first.";
    if (!TYPES.includes(file.type)) return "Use a JPG, PNG, or WEBP image.";
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return `The image must be ${MAX_IMAGE_MB} MB or smaller.`;
    return null;
}

/** Draws the file onto a canvas (cover-cropped to a square) and returns a JPEG data URL. */
export async function squareJpeg(file, size, quality) {
    const bitmap = await createImageBitmap(file);
    const side = Math.min(bitmap.width, bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, size, size);
    context.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size);
    bitmap.close?.();
    return canvas.toDataURL("image/jpeg", quality);
}

/** Small preview saved with each history item (the original image is never stored). */
export const createThumbnail = (file) => squareJpeg(file, 160, 0.7);

/** Profile photo, stored on the user as a small data URL. */
export const createAvatar = (file) => squareJpeg(file, 192, 0.8);
