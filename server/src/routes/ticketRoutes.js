import { Router } from "express";
import {
  getTickets,
  getTicketById,
  createTicket,
  editTicket,
  deleteTicket,
  countTickets,
} from "../controllers/ticketController.js";

const router = Router();

router.get("/", getTickets);
router.post("/", createTicket);

router.get("/:id", getTicketById);
router.patch("/:id", editTicket);
router.delete("/:id", deleteTicket);

router.get("/count", countTickets);

export default router;
