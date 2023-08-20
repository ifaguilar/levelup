import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);

router.get("/:id", getCategoryById);
router.patch("/:id", editCategory);
router.delete("/:id", deleteCategory);

export default router;
