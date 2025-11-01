import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    password: { type: String, required: true },
    email: { type: String, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
