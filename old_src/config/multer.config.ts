// multer (to record files)
import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

// Set allowed file types
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, path.join(__dirname, '../uploads/avatars')); // Define a specific folder for avatars
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

// File filter to validate file type
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP files are allowed.'));
    }
};

// Max file size: 5 MB
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

console.log('Upload configuration loaded : ', upload);

export default upload;
