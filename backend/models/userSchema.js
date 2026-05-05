import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  avatarUrl: String,

  workspaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace"
  }],

  lastActiveAt: Date,

  createdAt: { type: Date, default: Date.now }
});
