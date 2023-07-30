import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  editCustomer,
  deleteCustomer,
  countCustomers,
} from "../controllers/customerController.js";

const router = Router();

router.get("/", getCustomers);
router.post("/", createCustomer);

router.get("/count", countCustomers);

router.get("/:id", getCustomerById);
router.patch("/:id", editCustomer);
router.delete("/:id", deleteCustomer);

export default router;
