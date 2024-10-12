import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import pollRouter from "./routes/poll.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import helmet from "helmet"; // Security middleware
import morgan from "morgan"; // Logging middleware
import rateLimit from "express-rate-limit"; // Rate limiting middleware

dotenv.config();

const URL = process.env.REACT_APP_MONGO_CONNECT_URL;

// Connect to MongoDB
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const __dirname = path.resolve();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(helmet()); // Set security headers
app.use(morgan("dev")); // Log HTTP requests

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/poll", pollRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "/client/dist")));

// Fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(err); // Log the error for debugging
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
