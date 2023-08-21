import { Router } from "express";
import { getSystemLogs } from "../controllers/systemLogController.js";

const router = Router();

router.get("/", getSystemLogs);

export default router;
