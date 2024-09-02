import { Router } from "express";
import newPdf from "../controllers/newPdf";
import upload from "../middleware/fileUpload";
import decodeToken from "../middleware/decodeToken";
import pdfFinder from "../controllers/pdfFinder";
import pdfExtract from "../controllers/pdfExtract";

const pdfRouter = Router();

pdfRouter.post('/new', decodeToken, upload.single("file"), newPdf)
pdfRouter.get('/pdfname/:pdfname', decodeToken, pdfFinder)
pdfRouter.post('/extract', decodeToken, pdfExtract)

export default pdfRouter;
