import { Router } from "express";
import {
  getTeams,
  getTeamById,
  createTeam,
  editTeam,
  deleteTeam,
} from "../controllers/teamController.js";

const router = Router();

router.get("/", getTeams);
router.post("/", createTeam);

router.get("/:id", getTeamById);
router.patch("/:id", editTeam);
router.delete("/:id", deleteTeam);

export default router;
