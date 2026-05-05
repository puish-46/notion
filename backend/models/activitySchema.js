import mongoose from "mongoose";

export const activitySchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ["CREATED", "UPDATED", "DELETED", "MOVED", "ASSIGNED", "COMMENTED", "ARCHIVED"],
    required: true
  },

  entityType: {
    type: String,
    enum: ["Card", "Board", "List", "Page", "Workspace"],
    required: true
  },

  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },

  details: { type: String },

  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

activitySchema.index({ workspace: 1, createdAt: -1 });
activitySchema.index({ entityType: 1, entityId: 1 });
