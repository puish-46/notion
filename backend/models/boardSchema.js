import { Schema } from "mongoose";
export const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },

  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true
  },

  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: {
      type: String,
      enum: ["ADMIN", "MEMBER", "VIEWER"],
      default: "MEMBER"
    }
  }],

  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "List"
  }],

  background: String,

  archived: { type: Boolean, default: false },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now }
});