import { Router } from "express";
import {
  getJobs,
  getJobById,
  createJob,
  editJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = Router();

router.get("/", getJobs);
router.post("/", createJob);

router.get("/:id", getJobById);
router.patch("/:id", editJob);
router.delete("/:id", deleteJob);

export default router;
