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

import teamRoutes from "./src/routes/teamRoutes.js";
import brandRoutes from "./src/routes/brandRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import addressRoutes from "./src/routes/addressRoutes.js";
import stockRouter from "./src/routes/stockRoutes.js";
import supplierRoute from "./src/routes/supplierRoutes.js";

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

app.use("/api/team",teamRoutes);
app.use("/api/brand",brandRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/address",addressRoutes);
app.use("/api/stock",stockRouter);
app.use("/api/supplier",supplierRoute);

// Initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
