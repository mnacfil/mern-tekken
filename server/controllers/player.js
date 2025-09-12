import PlayerService from "../services/player.js";

class PlayerController {
  async createPlayer(req, res, next) {
    try {
      const player = await PlayerService.createPlayer(req.body);
      res.status(201).json({
        status: "success",
        data: { player },
      });
    } catch (error) {
      next(error);
    }
  }

  async getPlayers(req, res, next) {
    try {
      const players = await PlayerService.getPlayers();
      res.status(200).json({
        status: "success",
        data: { players },
      });
    } catch (error) {
      next(error);
    }
  }

  async getPlayerById(req, res, next) {
    try {
      const player = await PlayerService.getPlayerById(req.params.id);
      res.status(200).json({
        status: "success",
        data: { player },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PlayerController();
