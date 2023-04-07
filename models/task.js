import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  iscompleted: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

export const task = mongoose.model("task", schema);
