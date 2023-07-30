import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  editEmployee,
  deleteEmployee,
  countEmployees,
} from "../controllers/employeeController.js";

const router = Router();

router.get("/", getEmployees);
router.post("/", createEmployee);

router.get("/count", countEmployees);

router.get("/:id", getEmployeeById);
router.patch("/:id", editEmployee);
router.delete("/:id", deleteEmployee);

export default router;
