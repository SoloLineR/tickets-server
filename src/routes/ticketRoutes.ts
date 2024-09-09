import { Router } from "express";
const router = Router();
import ticketController from "../controllers/ticketsComtroller.js";
import checkAuth from "../middleware/checkAuth.js";
import checkRole from "../middleware/checkRole.js";

router.get("/tickets", checkAuth, ticketController.getAllTickets);
router.get("/ticket/:id", checkAuth, ticketController.getTicketById);
router.post("/ticket", checkRole, ticketController.createTicket);
router.delete("/ticket/:id", checkRole, ticketController.deleteTicket);
router.patch(
  "/ticket/:id",

  checkRole,
  ticketController.updateTicket
);
router.post("/ticket/:id", checkAuth, ticketController.buyTicket);
export default router;
