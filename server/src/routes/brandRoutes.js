import { Router } from "express";
import {
  getBrands,
  createBrand,
  editBrand,
  deleteBrand,
} from "../controllers/brandController.js";

const router = Router();

router.get("/", getBrands);
router.post("/", createBrand);

router.patch("/:id", editBrand);
router.delete("/:id", deleteBrand);

export default router;
