import express from "express";
import cors from "cors";

import { DEFAULT_PORT } from "./util/config.js";
import {
  authRoutes,
  gamesRoutes,
  monstersRoutes,
  playersRoutes,
} from "./routes/index.js";
import { connectAndStartServer } from "./db/connection.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("test endpoint!!!");
  res.json({ message: "Welcome to Gevme Tekken Game!" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/games", gamesRoutes);
app.use("/api/v1/monsters", monstersRoutes);
app.use("/api/v1/players", playersRoutes);

app.use((req, res) => {
  console.log("404 - Route not found:", req.originalUrl);
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || DEFAULT_PORT;

connectAndStartServer(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
