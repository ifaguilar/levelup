import { Router } from "express";
import { createStock, deleteStock, getStock } from "../controllers/stockController.js";

const router = Router();

router.get("/", getStock);
router.post("/",createStock);
router.delete("/:id",deleteStock);



export default router;