import mongoose from "mongoose";

export const connectAndStartServer = async (app, PORT) => {
  try {
    const mongoUri = process.env.ATLAS_URI;
    if (!mongoUri) {
      throw new Error("ATLAS_URI environment variable is not defined");
    }

    if (
      !mongoUri.startsWith("mongodb://") &&
      !mongoUri.startsWith("mongodb+srv://")
    ) {
      throw new Error(
        "Invalid MongoDB URI format. Expected mongodb:// or mongodb+srv://"
      );
    }

    await mongoose.connect(mongoUri, {});

    console.log("✅ Connected to MongoDB Atlas successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Server URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
