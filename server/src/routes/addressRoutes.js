import { Router } from "express";
import { createAddress, deleteAddress, getAddress } from "../controllers/addressController.js";

const router = Router();

router.get("/", getAddress);
router.post("/",createAddress);
router.delete("/:id",deleteAddress);


export default router;
