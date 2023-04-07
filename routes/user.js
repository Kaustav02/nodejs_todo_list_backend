import express from "express";

import {
 
  login,
  register,

} from "../controllers/userall.js";
import { isauthenticated, logout } from "../middlewares/authentication.js";

const router = express.Router();


router.post("/register", register);

router.post("/login", login);



router.get("/logout",logout);

export default router;
