import { Request, Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import path from 'path'
import fs from 'fs/promises'

export default async (req: CustomRequest, res: Response) => {
    try {
        const pdfName = req.params.pdfname
        const userFolder = req.user?.id
        if (!pdfName || !userFolder) {
            return res.status(400).json({ success: false, message: 'Missing parameters' });
        }
        const filePath = path.join(__dirname, '../uploads', userFolder, pdfName);
        await fs.access(filePath);
        res.sendFile(filePath);

    } catch (error: any) {
        if (error.code === 'ENOENT') {

            res.status(404).json({ success: false, message: 'File not found' });
        } else {

            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }


}