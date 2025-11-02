import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../service/auth.js";

export const userSignUp = async (req, res) => {
  try {
    //not using email for now
    const { userName, password, email } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Missing Fields", success: false });
    }
    //fetching user
    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already Exists", success: false });
    }
    //need to update this later
    const salted = 10;
    const hashedPassword = await bcrypt.hash(password, salted);

    const newUser = new User({
      userName,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    const token = generateToken(newUser);
    return res
      .status(201)
      .json({
        message: "User Created Succesfully",
        success: true,
        userId: newUser._id,
        token
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    //fetching user details
    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not Found", success: false });
    }
    //comparing the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Password is Wrong", success: false });
    }

    const token = generateToken(user);
    
    return res
      .status(200)
      .json({
        message: "Logged in Successfully",
        success: true,
        userId: user._id,
        token
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
