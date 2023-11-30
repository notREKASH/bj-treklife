const mongoose = require("mongoose");

const ReplyCommentSchema = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
  icon: { type: String, default: null },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  privacyPolicy: { type: Boolean, required: true },
  cgu: { type: Boolean, required: true },
  mentionsLegales: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ReplyComment", ReplyCommentSchema);
