import GameService from "../services/game.js";

class GameController {
  async startNewGame(req, res, next) {
    try {
      const game = await GameService.startNewGame(req.body);
      res.status(201).json({
        status: "success",
        data: { game },
      });
    } catch (error) {
      next(error);
    }
  }

  async playerAttack(req, res, next) {
    try {
      const game = await GameService.playerAttack(
        req.params.id,
        req.body.damage
      );
      res.status(200).json({
        status: "success",
        data: { game },
      });
    } catch (error) {
      next(error);
    }
  }

  async monsterAttack(req, res, next) {
    try {
      const game = await GameService.monsterAttack(
        req.params.id,
        req.body.damage
      );
      res.status(200).json({
        status: "success",
        data: { game },
      });
    } catch (error) {
      next(error);
    }
  }

  async getGames(req, res, next) {
    try {
      const games = await GameService.getGames();
      res.status(200).json({
        status: "success",
        data: { games },
      });
    } catch (error) {
      next(error);
    }
  }

  async getPlayerGamesHistory(req, res, next) {
    try {
      const gamesHistory = await GameService.getPlayerGamesHistory(
        req.params.id
      );
      res.status(200).json({
        status: "success",
        data: { gamesHistory },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GameController();
