import mongoose from "mongoose";

export const attachmentSchema = new mongoose.Schema({
  filename: { type: String, required: true, trim: true },

  url: { type: String, required: true },

  fileType: {
    type: String,
    enum: ["image", "video", "document", "other"],
    default: "other"
  },

  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: true
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});