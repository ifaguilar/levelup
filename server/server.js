import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Routers
import authRouter from "./src/routes/authRoutes.js";

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

app.use("/api/test", (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "Test",
  });
});

// Initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
