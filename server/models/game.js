import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: [true, "Player is required"],
    },
    monster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monster",
      required: [true, "Monster is required"],
    },

    status: {
      type: String,
      enum: ["idle", "in-progress", "completed", "abandoned"],
      default: "idle",
    },

    winner: {
      type: String,
      default: null,
    },

    moves: [
      {
        entity: {
          type: String,
          enum: ["player", "monster"],
          required: true,
        },
        action: {
          type: String,
          required: true,
        },
        damage: {
          type: Number,
          default: 0,
        },
      },
    ],

    gameData: {
      playerHealth: {
        type: Number,
        default: 100,
      },
      monsterHealth: {
        type: Number,
        default: 100,
      },
    },

    duration: {
      type: Number,
      default: 60, // 60 secoonds or 1 minute
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

gameSchema.virtual("durationInMinutes").get(function () {
  return Math.round(this.duration / 60);
});

gameSchema.methods.startGame = async function () {
  this.status = "in-progress";

  const monster = await mongoose.model("Monster").findById(this.monster);
  if (monster) {
    this.gameData.monsterHealth = monster.health;
  }

  return await this.save();
};

gameSchema.methods.endGame = async function (winner) {
  console.log("winner ->", winner);
  this.status = "completed";
  this.winner = winner;

  return await this.save();
};

gameSchema.methods.abandonedGame = async function () {
  this.status = "abandoned";
  this.winner = null;

  return await this.save();
};

gameSchema.methods.addMove = async function (entity, action, damage = 1) {
  const move = {
    entity,
    action,
    damage,
  };

  this.moves.push(move);

  if (entity === "player") {
    this.gameData.monsterHealth = Math.max(
      0,
      this.gameData.monsterHealth - damage
    );
  } else {
    this.gameData.playerHealth = Math.max(
      0,
      this.gameData.playerHealth - damage
    );
  }

  return await this.save();
};

gameSchema.methods.heal = async function (entity, heal = 1) {
  const move = {
    entity,
    damage: heal,
    action: "Heal",
  };

  this.moves.push(move);

  if (entity === "player") {
    this.gameData.playerHealth = this.gameData?.playerHealth + heal;
    if (this.gameData.playerHealth > 100) {
      this.gameData.playerHealth = 100;
    }
  } else {
    this.gameData.monsterHealth = this.gameData?.monsterHealth + heal;
    if (this.gameData.monsterHealth > 100) {
      this.gameData.monsterHealth = 100;
    }
  }

  return await this.save();
};

export default mongoose.model("Game", gameSchema);
