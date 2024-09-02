import { Router } from "express";
import pdfExtract from "../controllers/pdfExtract";
import upload from "../middleware/fileUpload";
import decodeToken from "../middleware/decodeToken";
import pdfFinder from "../controllers/pdfFinder";

const pdfRouter = Router();

pdfRouter.post('/new', decodeToken, upload.single("file"), pdfExtract)
pdfRouter.get('/pdfname/:pdfname', decodeToken, pdfFinder)
pdfRouter.get('/pdfname/:pdfname', decodeToken, pdfFinder)

export default pdfRouter;
