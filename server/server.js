import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { DEFAULT_PORT } from "./util/config.js";
import {
  authRoutes,
  gamesRoutes,
  monstersRoutes,
  playersRoutes,
} from "./routes/index.js";
import { connectAndStartServer } from "./db/connection.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

console.log("Client => ", process.env.CLIENT_URL);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/games", gamesRoutes);
app.use("/api/v1/monsters", monstersRoutes);
app.use("/api/v1/players", playersRoutes);

app.get("/", (req, res) => {
  console.log("test endpoint!!!");
  res.json({ message: "Welcome to Gevme Tekken Game!" });
});

app.use((req, res) => {
  console.log("404 - Route not found:", req.originalUrl);
  res.status(404).json({ error: "Route not found" });
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || DEFAULT_PORT;

connectAndStartServer(app, PORT);
