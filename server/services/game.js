import Game from "../models/game.js";
import Player from "../models/player.js";
import Monster from "../models/monster.js";
import { APIError } from "../middleware/errorHandler.js";

class GameService {
  async startNewGame(payload) {
    const { playerId, monsterId, duration = 60 } = payload ?? {};
    if (!playerId || !monsterId) {
      throw new APIError("Bad Request, Player or Monster is missing.", 400);
    }

    try {
      const [player, monster] = await Promise.all([
        Player.findById(playerId),
        Monster.findById(monsterId),
      ]);

      if (!player) {
        throw new APIError("Player not found", 404);
      }

      if (!monster) {
        throw new APIError("Monster not found", 404);
      }

      console.log("Starting the game...");

      const game = await Game.create({
        player: playerId,
        monster: monsterId,
        duration,
      });

      await game.startGame();

      console.log("Game Started!");

      console.log(`${player.fullName} VS ${monster.name}`);

      const populatedGame = await Game.findById(game._id)
        .populate("player", "fullName email avatar")
        .populate("monster", "name avatar");

      return populatedGame;
    } catch (error) {
      console.log("Error starting the game", error);
      throw new Error(error);
    }
  }

  async playerAttack(gameId, damage = 0) {
    if (!gameId) {
      throw new APIError("Bad Request, Please provide game id.", 400);
    }

    try {
      const game = await Game.findById(gameId)
        .populate("player", "fullName")
        .populate("monster", "name");
      if (!game) {
        throw new APIError("Game not found!", 404);
      }

      if (game.status === "completed") {
        throw new APIError("Game is already ended!", 404);
      }

      const playerName = game.player.name;
      const monsterName = game.monster.name;

      await game.addMove("player", "attack", damage);

      console.log(
        `${playerName} attacked! ${monsterName} monster health:`,
        game.gameData.monsterHealth
      );

      if (game.gameData.monsterHealth <= 0) {
        await game.endGame("player");
        console.log("Player win");
      }

      return game;
    } catch (error) {
      throw new Error(error);
    }
  }

  async monsterAttack(gameId, damage = 0) {
    if (!gameId) {
      throw new APIError("Bad Request, Please provide game id.", 400);
    }

    try {
      const game = await Game.findById(gameId)
        .populate("player", "fullName")
        .populate("monster", "name");
      if (!game) {
        throw new APIError("Game not found!", 404);
      }

      if (game.status === "completed") {
        throw new APIError("Game is already ended!", 404);
      }

      const playerName = game.player.fullName;
      const monsterName = game.monster.name;

      await game.addMove("monster", "attack", damage);

      console.log(
        `${monsterName} attacked! ${playerName} player health:`,
        game.gameData.playerHealth
      );
      if (game.gameData.playerHealth <= 0) {
        await game.endGame("monster");
        console.log("Monster win");
      }

      return game;
    } catch (error) {
      throw new Error(error);
    }
  }

  async healEntity(gameId, payload) {
    if (!gameId) {
      throw new APIError("Bad Request, Please provide game id.", 400);
    }

    try {
      const game = await Game.findById(gameId)
        .populate("player", "fullName")
        .populate("monster", "name");
      if (!game) {
        throw new APIError("Game not found!", 404);
      }

      await game.heal(payload?.entity ?? "player", payload?.heal ?? 1);

      return game;
    } catch (error) {
      throw new Error(error);
    }
  }

  async abandonedGame(gameId) {
    if (!gameId) {
      throw new APIError("Bad Request, Please provide game id.", 400);
    }

    try {
      const game = await Game.findById(gameId)
        .populate("player", "fullName")
        .populate("monster", "name");
      if (!game) {
        throw new APIError("Game not found!", 404);
      }
      await game.abandonedGame();

      return game;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGames() {
    try {
      return await Game.find({}).populate("player").populate("monster");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPlayerGamesHistory(playerId) {
    if (!playerId) {
      throw new APIError("Bad Request, Please provide player id.", 400);
    }
    try {
      const gamesHistory = await Game.find({ player: playerId })
        .populate("player")
        .populate("monster");

      return gamesHistory;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new GameService();
