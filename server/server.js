import express from "express";
import cors from "cors";
import tekkenRouter from "./routes/tekken.js";
import { DEFAULT_PORT } from "./util/config.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("test endpoint!!!");
  res.json({ message: "Welcome to Gevme Tekken Game!" });
});

app.use("/api/v1/tekken", tekkenRouter);

app.use("*", (req, res) => {
  console.log("404 - Route not found:", req.originalUrl);
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
