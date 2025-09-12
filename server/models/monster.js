import mongoose from "mongoose";

const monsterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Monster name is required"],
      trim: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    health: {
      type: Number,
      default: 100,
      min: [1, "Monster health must be atleast 1"],
    },
    attack: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

monsterSchema.virtual("games", {
  ref: "Game",
  localField: "_id",
  foreignField: "monster",
});

monsterSchema.statics.getRandomMonster = function () {
  return this.aggregate([{ $sample: { size: 1 } }]);
};

export default mongoose.model("Monster", monsterSchema);
