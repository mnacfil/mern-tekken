import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Players routes" });
});

export default router;
