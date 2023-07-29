import { Router } from "express";
import {
  countProducts,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.get("/count", countProducts);

export default router;
