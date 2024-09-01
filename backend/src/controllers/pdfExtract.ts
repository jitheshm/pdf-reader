import { Request, Response } from "express";


export default async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.status(200).json({
            message: 'File uploaded successfully',
            fileName: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }


}