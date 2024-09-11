import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import pdfController from "../controllers/pdfController.js";
const router = Router();

router.get("/pdf/:id", checkAuth, pdfController.getTicketPdf);

export default router;
