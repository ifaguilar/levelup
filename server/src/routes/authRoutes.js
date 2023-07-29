import { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import {
  loginSchema,
  signupSchema,
  validate,
} from "../middleware/validation.js";

const router = Router();

router.post("/login", loginSchema, validate, login);

router.post("/signup", signupSchema, validate, signup);

export default router;
