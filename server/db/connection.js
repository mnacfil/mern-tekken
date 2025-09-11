import mongoose from "mongoose";

const uri = process.env.ATLAS_URI || "";

export const connectAndStartServer = async (onConnect) => {
  console.log("connecting to mongodb...");
  try {
    await mongoose.connect(uri, {});
    console.log("You successfully connected to MongoDB!");
    onConnect();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
