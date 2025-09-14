import mongoose from "mongoose";
import Monster from "../models/monster.js";

// Monster seed data
const monsterSeedData = [
  {
    name: "Fire Dragon",
    avatar: "🐲",
    health: 100,
    attack: 25,
  },
  {
    name: "Ice Wolf",
    avatar: "🐺",
    health: 120,
    attack: 20,
  },
  {
    name: "Shadow Assassin",
    avatar: "🥷",
    health: 100,
    attack: 30,
  },
  {
    name: "Stone Golem",
    avatar: "🗿",
    health: 100,
    attack: 15,
  },
  {
    name: "Lightning Phoenix",
    avatar: "🔥",
    health: 100,
    attack: 28,
  },
  {
    name: "Poison Spider",
    avatar: "🕷️",
    health: 100,
    attack: 22,
  },
  {
    name: "Wind Eagle",
    avatar: "🦅",
    health: 100,
    attack: 24,
  },
  {
    name: "Earth Bear",
    avatar: "🐻",
    health: 100,
    attack: 18,
  },
  {
    name: "Water Serpent",
    avatar: "🐍",
    health: 100,
    attack: 21,
  },
  {
    name: "Dark Knight",
    avatar: "⚔️",
    health: 100,
    attack: 26,
  },
  {
    name: "Crystal Unicorn",
    avatar: "🦄",
    health: 100,
    attack: 19,
  },
  {
    name: "Flame Demon",
    avatar: "👹",
    health: 100,
    attack: 27,
  },
  {
    name: "Frost Giant",
    avatar: "🧊",
    health: 100,
    attack: 16,
  },
  {
    name: "Storm Elemental",
    avatar: "⚡",
    health: 100,
    attack: 29,
  },
  {
    name: "Void Wraith",
    avatar: "👻",
    health: 100,
    attack: 32,
  },
];

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.ATLAS_URI;
    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Seed monsters function
const seedMonsters = async () => {
  try {
    console.log("🌱 Starting monster seeding process...");

    // Check if monsters already exist
    const existingMonsters = await Monster.countDocuments();

    if (existingMonsters > 0) {
      console.log(`📊 Found ${existingMonsters} existing monsters in database`);
      console.log(
        "❓ Do you want to clear existing data and reseed? (This will delete all monsters)"
      );

      // In production, you might want to add user confirmation here
      // For now, we'll skip seeding if monsters exist
      console.log("⏭️  Skipping seeding - monsters already exist");
      console.log(
        "💡 To force reseed, delete existing monsters first or modify this script"
      );
      return;
    }

    // Create monsters
    console.log(`📦 Creating ${monsterSeedData.length} monsters...`);

    const createdMonsters = await Monster.insertMany(monsterSeedData, {
      ordered: false, // Continue inserting even if some fail
    });

    console.log(`✅ Successfully created ${createdMonsters.length} monsters!`);

    // Display created monsters
    createdMonsters.forEach((monster, index) => {
      console.log(
        `${index + 1}. ${monster.name} ${monster.avatar} - HP: ${
          monster.health
        }, ATK: ${monster.attack}`
      );
    });
  } catch (error) {
    if (error.code === 11000) {
      console.error(
        "❌ Duplicate monster names found. Some monsters may already exist."
      );
    } else {
      console.error("❌ Error seeding monsters:", error.message);
    }
    throw error;
  }
};

// Clear monsters function (optional utility)
const clearMonsters = async () => {
  try {
    const result = await Monster.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} monsters from database`);
  } catch (error) {
    console.error("❌ Error clearing monsters:", error);
    throw error;
  }
};

// Main seed function
const runSeed = async () => {
  try {
    await connectDB();

    // Check command line arguments
    const args = process.argv.slice(2);

    if (args.includes("--clear")) {
      await clearMonsters();
    }

    if (args.includes("--force")) {
      console.log("🔄 Force mode: Clearing existing monsters...");
      await clearMonsters();
    }

    await seedMonsters();

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
};

// Export functions for use in other files
export { seedMonsters, clearMonsters, monsterSeedData };

runSeed();
