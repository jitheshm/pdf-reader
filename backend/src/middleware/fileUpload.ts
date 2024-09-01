import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import CustomRequest from "../interfaces/CustomRequest";



const storage = multer.diskStorage({
    destination: (req: CustomRequest, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        if (!req.user || !req.user.id) {
            return cb(new Error("User ID not available"), "");
        }

        const uploadPath = path.join(__dirname, "../uploads", req.user.id);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req: CustomRequest, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const newFilename = `${name}-${timestamp}${ext}`;
        cb(null, newFilename);
    },
});

const fileFilter = (req: CustomRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;
