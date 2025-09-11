import express from "express";
import { ObjectId } from "mongodb";

import db from "../db/connection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ hello: "World" });
});

export default router;
