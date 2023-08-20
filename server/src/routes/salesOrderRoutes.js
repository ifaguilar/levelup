import { Router } from "express";
import {
  countSalesOrders,
  getLatestSalesOrders,
} from "../controllers/salesOrderController.js";

const router = Router();

router.get("/latest", getLatestSalesOrders);
router.get("/count", countSalesOrders);

export default router;
