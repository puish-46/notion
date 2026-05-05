import mongoose from "mongoose";
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

  pages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page"
  }],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now }
}, { 
    versionKey: false, 
    strict: "throw" 
});

