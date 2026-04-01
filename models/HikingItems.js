import mongoose from "mongoose";

const hikingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["gear", "clothing", "food", "safety", "electronics"],
      required: true,
    },
    weight: {
      type: Number, // grams
    },
    price: {
      type: Number,
    },
    isEssential: {
      type: Boolean,
      default: false,
    },
    difficultyLevel: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
  },
  { timestamps: true }
);

const HikingItem = mongoose.model("HikingItem", hikingItemSchema);

export default HikingItem;