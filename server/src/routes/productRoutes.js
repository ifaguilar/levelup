import { Router } from "express";
import {
  countProducts,
  createProduct,
  deleteProduct,
  countProductsByCategory,
} from "../controllers/productController.js";

const router = Router();

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.get("/count", countProducts);
router.get("/count/category", countProductsByCategory);

export default router;
