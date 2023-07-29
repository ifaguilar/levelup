import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Routers
import authRouter from "./src/routes/authRoutes.js";
import jobRouter from "./src/routes/jobRoutes.js";
import genderRouter from "./src/routes/genderRoutes.js";
import departmentRouter from "./src/routes/departmentRoutes.js";
import municipalityRouter from "./src/routes/municipalityRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import personRouter from "./src/routes/personRoutes.js";
import salesOrderRouter from "./src/routes/salesOrderRoutes.js";
import ticketRouter from "./src/routes/ticketRoutes.js";
import teamRouter from "./src/routes/teamRoutes.js";
import brandRouter from "./src/routes/brandRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import stockRouter from "./src/routes/stockRoutes.js";
import supplierRouter from "./src/routes/supplierRoutes.js";

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
app.use("/api/product", productRouter);
app.use("/api/person", personRouter);
app.use("/api/sales_order", salesOrderRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/team", teamRouter);
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/stock", stockRouter);
app.use("/api/supplier", supplierRouter);

// Initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
