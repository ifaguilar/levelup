import { Router } from "express";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  editSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js";

const router = Router();

router.get("/", getSuppliers);
router.post("/", createSupplier);

router.get("/:id", getSupplierById);
router.patch("/:id", editSupplier);
router.delete("/:id", deleteSupplier);

export default router;
