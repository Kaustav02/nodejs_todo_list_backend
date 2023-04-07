import express from "express";
import {
  deletetask,
  getmytask,
  newtask,
  updatetask,
} from "../controllers/task.js";
import { isauthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/new", isauthenticated, newtask);

router.get("/mytask", isauthenticated, getmytask);
router
  .route("/:id")
  .put(isauthenticated, updatetask)
  .delete(isauthenticated, deletetask);

export default router;
