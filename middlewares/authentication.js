import { user } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isauthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: " login first",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.login_info = await user.findById(decode._id);

  next();
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
    });
};
