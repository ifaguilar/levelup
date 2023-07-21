import { Router } from "express";
import {
  countEmployees,
  countCustomers,
} from "../controllers/personController.js";

const router = Router();

router.get("/count/employees", countEmployees);
router.get("/count/customers", countCustomers);

export default router;
