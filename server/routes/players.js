import express from "express";
import PlayerController from "../controllers/player.js";

const router = express.Router();

router.post("/", PlayerController.createPlayer);
router.get("/:id", PlayerController.getPlayerById);
router.get("/", PlayerController.getPlayers);

export default router;
