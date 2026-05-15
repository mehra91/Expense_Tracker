import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWTSECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token unauthorized",
    });
  }
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "invalid or expired token",
    });
  }
};


export {authMiddleware};
