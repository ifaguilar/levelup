import { Router } from "express";
import {
  createTeam,
  deleteTeam,
  getTeam,
} from "../controllers/teamController.js";

const router = Router();

router.get("/", getTeam);
router.post("/", createTeam);

router.delete("/:id", deleteTeam);

export default router;
