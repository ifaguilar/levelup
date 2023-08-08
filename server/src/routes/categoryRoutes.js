import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  editCategory,
  getCategoryById
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", getCategory);
router.post("/", createCategory);

router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategory);
router.patch("/:id", editCategory);

export default router;
