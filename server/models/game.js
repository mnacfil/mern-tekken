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
      enum: ["idle", "in-progress", "completed"],
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

gameSchema.methods.addMove = async function (entity, action, damage = 0) {
  const move = {
    entity,
    action,
    damage,
  };

  this.moves.push(move);

  if (damage > 0) {
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
  }

  return await this.save();
};

export default mongoose.model("Game", gameSchema);

// 68c3b5560d60e0e679df0c18 - m
// 68c36b415baf40396519976c - p
