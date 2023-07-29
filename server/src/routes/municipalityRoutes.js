import { Router } from "express";
import {
  getMunicipalities,
  getMunicipalitiesByDepartmentId,
} from "../controllers/municipalityController.js";

const router = Router();

router.get("/", getMunicipalities);

router.get("/department/:id", getMunicipalitiesByDepartmentId);

export default router;
