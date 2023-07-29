import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrand,
} from "../controllers/brandController.js";

const router = Router();

router.get("/", getBrand);
router.post("/", createBrand);

router.delete("/:id", deleteBrand);

export default router;
