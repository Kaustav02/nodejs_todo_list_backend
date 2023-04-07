import { user } from "../models/user.js";
import bcrypt from "bcrypt";

import { setcookie } from "../utils/features.js";
import errorhandler from "../middlewares/error.js";

// API to register a new user..

export const register = async (req, res) => {
try {
  const { name, email, password } = req.body;
  const users = await user.findOne({ email });

  if (users)
  return next(new errorhandler("user already exist",404));
  else {
    const hash = await bcrypt.hash(password, 10);

    const newuser = await user.create({ name, email, password: hash });

    setcookie(newuser, res, "registered successfully");

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: "register successfully",
      });
  }
} catch (error) {
  next(error);
}
};

// API to login a user
export const login = async (req, res, next) => {
try {
  const { email, password } = req.body;

  const login = await user.findOne({ email }).select("+password");

  if (!login)   return next(new errorhandler("invalid email and password",400));;

  const ismatch = await bcrypt.compare(password, login.password);

  if (!ismatch)
    return next(new errorhandler("invalid email and password", 400));
  setcookie(login, res, `welcome back ${login.name}`);
} catch (error) {
  next(error);
}
};

export const getmyprofile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.login_info,
  });
};
