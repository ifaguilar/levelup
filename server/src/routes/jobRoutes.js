import { Router } from "express";
import { createJob, deleteJob, getJobs } from "../controllers/jobController.js";

const router = Router();

router.get("/", getJobs);
router.post("/", createJob);

router.delete("/:id", deleteJob);

export default router;
