import GameController from "../controllers/game.js";
import express from "express";

const router = express.Router();

router.get("/", GameController.getGames);
router.get("/:id/battle-history", GameController.getPlayerGamesHistory);
router.post("/start", GameController.startNewGame);
router.post("/:id/monster-attack", GameController.monsterAttack);
router.post("/:id/player-attack", GameController.playerAttack);
router.post("/:id/heal", GameController.healEntity);
router.post("/:id/abandoned", GameController.abandonedGame);

export default router;
