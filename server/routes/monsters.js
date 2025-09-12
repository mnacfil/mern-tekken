import MonsterController from "../controllers/monster.js";
import express from "express";

const router = express.Router();

router.get("/", MonsterController.getMonsters);
router.post("/", MonsterController.createMonster);

export default router;
