const mongoose = require("mongoose");

const ProductReviewComentSchema = new mongoose.Schema({
  productReviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductReview",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  privacyPolicy: { type: Boolean, required: true },
  cgu: { type: Boolean, required: true },
  mentionsLegales: { type: Boolean, required: true },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReplyComment",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "ProductReviewComment",
  ProductReviewComentSchema
);
