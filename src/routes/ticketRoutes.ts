import { Router } from "express";
const router = Router();
import ticketController from "../controllers/ticketsComtroller.js";
import checkAuth from "../middleware/checkAuth.js";

router.get("/hello", checkAuth, ticketController.getAllTickets);

export default router;
