import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
  countProducts,
  countProductsByCategory,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

router.get("/:id", getProductById);
router.patch("/:id", editProduct);
router.delete("/:id", deleteProduct);

router.get("/count", countProducts);
router.get("/count/category", countProductsByCategory);

export default router;
