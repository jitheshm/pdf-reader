import { Router } from "express";
import pdfExtract from "../controllers/pdfExtract";
import upload from "../middleware/fileUpload";
import decodeToken from "../middleware/decodeToken";

const pdfRouter = Router();

pdfRouter.post('/extract',decodeToken,upload.single("file"), pdfExtract)

export default pdfRouter;
