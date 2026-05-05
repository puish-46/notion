import { Schema, model } from "mongoose";
 export const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },

  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: {
      type: String,
      enum: ["OWNER", "ADMIN", "MEMBER", "VIEWER"],
      default: "MEMBER"
    }
  }],

  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board"
  }],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now }
}, { 
    versionKey: false, 
    strict: "throw" 
});

