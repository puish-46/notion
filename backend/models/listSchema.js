const listSchema = new mongoose.Schema({
  title: { type: String, required: true },

  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true
  },

  position: { type: Number, required: true },

  archived: { type: Boolean, default: false },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now }
});

listSchema.index({ board: 1, position: 1 });