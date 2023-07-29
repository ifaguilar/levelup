import { Router } from "express";
import { countSalesOrders } from "../controllers/salesOrderController.js";

const router = Router();

router.get("/count", countSalesOrders);

export default router;
