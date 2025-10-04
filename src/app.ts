
// import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./routes";
import { globalErrorHandler } from "./middilWares/globalErrorHandler";

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
// app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!!!");
});

 app.use("/api", router)

  app.use(globalErrorHandler)

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;