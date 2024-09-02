import { Request, Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import path from 'path'
import extractPages from "../utils/extractPages";



export default async (req: CustomRequest, res: Response) => {
    try {
        const pageNumbers = req.body.pageNumbers as number[]
        console.log(pageNumbers);
        
        const pdfName = req.body.fileName as string
        const userFolder = req.user?.id

        if (!pdfName || !userFolder || pageNumbers.length < 1) {
            return res.status(400).json({ success: false, message: 'Missing parameters' });
        }

        const filePath = path.join(__dirname, '../uploads', userFolder, pdfName);
        const outputPath = await extractPages(pageNumbers, filePath)
        res.sendFile(outputPath)

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ success: false, message: "internal server error" })
    }


}