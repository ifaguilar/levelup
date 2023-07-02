import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Routers
import authRouter from "./src/routes/authRoutes.js";
import jobRouter from "./src/routes/jobRoutes.js";
import genderRouter from "./src/routes/genderRoutes.js";
import departmentRouter from "./src/routes/departmentRoutes.js";
import municipalityRouter from "./src/routes/municipalityRoutes.js";

// Functions
dotenv.config();

// Variables
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.options("*", cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/job", jobRouter);
app.use("/api/gender", genderRouter);
app.use("/api/department", departmentRouter);
app.use("/api/municipality", municipalityRouter);

// Initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
