import User from "../Models/userModel";
import Validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../Models/userModel";
import jwt from "jsonwebtoken";
import { use } from "react";

const jwtSecret = process.env.JWTSECRET;

//create token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret);
};

//Register a user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(404).json({
      success: false,
      message: "All fields are required",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "password length must be 8 characters",
    });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({
        success: false,
        message: "user Already taken ",
      });
    }

    const hashPassword = async (password) => {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    };

    const user = await User.create({ name, email, password: hashPassword });
    const token = createToken(user._id);
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log("error from userController :", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Both field will be required",
    });
  }
  try {
    const user = await findOne({ email }).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error from userController 1 : ", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//fetch currentUser details

const getCurrentUser = async (req, res) => {
  const user = await user.findById(req.user.id).select("name email").select("-password");
  try {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("error from userController 1 : ", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//updateUser
const updateUser = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "valid name and email are required",
    });
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name } },
      { new: true },
    ).select("-password"); // it means password doesn't send to frontend
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser, getCurrentUser , updateUser };
