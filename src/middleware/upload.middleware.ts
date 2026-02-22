import multer from "multer";

// Configure multer to hold the physical file in RAM (memory)
// This is critical because Render servers have ephemeral filesystems
// and we want to pass the raw buffer locally into Sharp -> Cloudinary.
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max limit per internal API constraint
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"));
        }
    },
});
