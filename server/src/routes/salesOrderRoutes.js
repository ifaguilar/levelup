import { Router } from "express";
import {
  getSalesOrders,
  getSalesOrderById,
  createSalesOrder,
  editSalesOrder,
  deleteSalesOrder,
  getLatestSalesOrders,
  countSalesOrders,
} from "../controllers/salesOrderController.js";

const router = Router();

router.get("/", getSalesOrders);
router.post("/", createSalesOrder);

router.get("/latest", getLatestSalesOrders);
router.get("/count", countSalesOrders);

router.get("/:id", getSalesOrderById);
router.patch("/:id", editSalesOrder);
router.delete("/:id", deleteSalesOrder);

export default router;
