import { Router } from "express";
import { countProducts, createProduct, deleteProduct } from "../controllers/productController.js";

const router = Router();

router.get("/count", countProducts);
router.post("/",createProduct);
router.delete("/:id",deleteProduct);

export default router;
