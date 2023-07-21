import { Router } from "express";
import { countProducts } from "../controllers/productController.js";

const router = Router();

router.get("/count", countProducts);

export default router;
