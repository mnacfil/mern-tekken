import Player from "../models/player.js";

class PlayerService {
  async createPlayer(payload) {
    const { fullName, email, password, avatar } = payload;
    try {
      const player = await Player.create({
        fullName,
        email,
        password,
        avatar,
      });
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPlayers() {
    try {
      return await Player.find({});
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new PlayerService();
