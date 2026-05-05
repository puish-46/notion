import mongoose from "mongoose";
export const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },

  position: { type: Number, required: true },

  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  labels: [{
    name: String,
    color: String
  }],

  dueDate: Date,

  checklist: [{
    text: String,
    completed: { type: Boolean, default: false }
  }],

  coverImage: String,

  attachments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment"
  }],

  archived: { type: Boolean, default: false },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

cardSchema.index({ list: 1, position: 1 });