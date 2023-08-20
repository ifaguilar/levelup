import { Router } from "express";
import {
  getStocks,
  getStockById,
  createStock,
  editStock,
  deleteStock,
} from "../controllers/stockController.js";

const router = Router();

router.get("/", getStocks);
router.post("/", createStock);

router.get("/:id", getStockById);
router.patch("/:id", editStock);
router.delete("/:id", deleteStock);

export default router;
