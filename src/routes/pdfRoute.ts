import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import pdfController from "../controllers/pdfController.js";
const router = Router();

router.post("/pdf", checkAuth, pdfController.getTicketPdf);
router.post("/pdf/validate", checkAuth, pdfController.validateQrCodeFromPdf);
export default router;
