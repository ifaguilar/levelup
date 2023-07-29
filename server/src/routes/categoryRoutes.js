import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", getCategory);
router.post("/", createCategory);

router.delete("/:id", deleteCategory);

export default router;
