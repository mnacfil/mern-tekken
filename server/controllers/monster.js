import Monster from "../services/monster.js";

const getRandomNum = (range) => {
  return Math.floor(Math.random() * range);
};

class MonsterController {
  async createMonster(req, res, next) {
    try {
      const monster = await Monster.createMonster(req.body);
      res.status(201).json({
        status: "success",
        data: { monster },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMonsters(req, res, next) {
    try {
      const monsters = await Monster.getMonsters();
      res.status(200).json({
        status: "success",
        data: { monsters },
      });
    } catch (error) {
      next(error);
    }
  }

  async getRandomMonster(req, res, next) {
    try {
      const monsters = await Monster.getMonsters();
      if (monsters.length === 0) {
        res.status(200).json({
          status: "success",
          data: { monster: null },
        });
      } else {
        const randomNum = getRandomNum(monsters.length);
        res.status(200).json({
          status: "success",
          data: { monster: monsters[randomNum] },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new MonsterController();
