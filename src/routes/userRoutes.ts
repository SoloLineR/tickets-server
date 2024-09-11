import { Router } from "express";
import userController from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = Router();

router.get("/user/me", checkAuth, userController.getUser);
router.get("/user/tickets", checkAuth, userController.getUserBoughtTickets);

export default router;
