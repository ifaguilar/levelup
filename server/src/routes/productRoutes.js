import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
  countProducts,
  countProductsByCategory,
  countProductsByBrand,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

router.get("/count", countProducts);
router.get("/count/category", countProductsByCategory);
router.get("/count/brand", countProductsByBrand);

router.get("/:id", getProductById);
router.patch("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;
