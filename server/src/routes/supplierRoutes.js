import { Router } from "express";
import { createSupplier, deleteSupplier, getSuppliers } from "../controllers/supplierController.js";


const router = Router();

router.get("/", getSuppliers);
router.post("/",createSupplier);
router.delete("/:id",deleteSupplier);


export default router;
