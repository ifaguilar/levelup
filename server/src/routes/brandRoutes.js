import { Router } from "express";
import {
  getBrands,
  getBrandById,
  createBrand,
  editBrand,
  deleteBrand,
} from "../controllers/brandController.js";

const router = Router();

router.get("/", getBrands);
router.post("/", createBrand);

router.get("/:id", getBrandById);
router.patch("/:id", editBrand);
router.delete("/:id", deleteBrand);

export default router;
