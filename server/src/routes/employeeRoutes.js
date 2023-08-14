import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  editEmployee,
  deleteEmployee,
  countEmployees,
  upgradeToPro,
  cancelSubscription,
} from "../controllers/employeeController.js";

const router = Router();

router.get("/", getEmployees);
router.post("/", createEmployee);

router.get("/count", countEmployees);

router.get("/:id", getEmployeeById);
router.patch("/:id", editEmployee);
router.delete("/:id", deleteEmployee);

router.patch("/basic/:id", cancelSubscription);
router.patch("/pro/:id", upgradeToPro);

export default router;
