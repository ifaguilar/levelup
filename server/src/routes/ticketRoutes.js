import { Router } from "express";
import { countTickets } from "../controllers/ticketController.js";

const router = Router();

router.get("/count", countTickets);

export default router;
