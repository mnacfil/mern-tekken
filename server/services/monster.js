import { APIError } from "../middleware/errorHandler.js";
import Monster from "../models/monster.js";

class MonsterService {
  async createMonster(payload) {
    const { name, health, attack, avatar = null } = payload;
    if (!name) {
      throw new APIError("Bad Request, Please provide monster name.", 400);
    }

    try {
      return await Monster.create({
        name,
        avatar,
        health,
        attack,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMonsters() {
    try {
      return await Monster.find({});
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new MonsterService();
