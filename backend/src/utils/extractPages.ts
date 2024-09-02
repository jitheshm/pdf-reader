import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

export default async function extractPages(pageNumbers: number[], filePath: string): Promise<string> {
    try {
        const existingPdfBytes = fs.readFileSync(filePath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const newPdfDoc = await PDFDocument.create();

        const pagesToExtract = await newPdfDoc.copyPages(pdfDoc, pageNumbers.map(pageNumber => pageNumber - 1));

        pagesToExtract.forEach(page => newPdfDoc.addPage(page));

        const pdfBytes = await newPdfDoc.save();

        const { dir, name } = path.parse(filePath);
        const outputFileName = path.join(dir, `${name}_extracted.pdf`);

        fs.writeFileSync(outputFileName, pdfBytes);

        console.log(`PDF extraction complete! Output saved to: ${outputFileName}`);
        return outputFileName
    } catch (err) {
        console.error('Error extracting pages:', err);
        throw err
    }
}

