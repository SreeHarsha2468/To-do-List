import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    categoryDesc: {
      type: String,
    },
    color: {
      type: String,
      enum: ["Blue", "Red", "Yellow", "Black", "Green", "Pink"],
      default: "Blue",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
