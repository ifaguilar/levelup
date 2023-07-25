import { Router } from "express";
import {
  getEmployees,
  getCustomers,
  countEmployees,
  countCustomers,
  deleteEmployee,
  createEmployee,
  getEmployeeById,
} from "../controllers/personController.js";

const router = Router();

router.get("/employees", getEmployees);
router.post("/employees", createEmployee);
router.get("/employees/:id", getEmployeeById);
router.delete("/employees/:id", deleteEmployee);
router.get("/customers", getCustomers);
router.get("/count/employees", countEmployees);
router.get("/count/customers", countCustomers);

export default router;
