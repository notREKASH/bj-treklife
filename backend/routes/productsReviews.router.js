const express = require("express");
const router = express.Router();
const productsReviewsController = require("../controllers/productsReviews.controller");
const verifyToken = require("../middlewares/verifyToken");
const validateRequest = require("../middlewares/validateRequest");
const ProductReviewJoiSchema = require("../schemas/ProductReviewJoiSchema");
const RatingJoiSchema = require("../schemas/RatingJoiSchema");
const ProductReviewComentJoiSchema = require("../schemas/ProductReviewCommentJoiSchema");
const ReplyCommentJoiSchema = require("../schemas/ReplyCommentJoiSchema");

// GET /productsReviews

router.get("/", productsReviewsController.getAllProductsReviews);
router.get("/latest-reviews", productsReviewsController.getLatestProductReview);
router.get("/:productReviewId", productsReviewsController.getProductReviewById);
router.get(
  "/:productReviewId/comments-with-replies",
  productsReviewsController.getProductReviewWithCommentsAndReplies
);
router.get(
  "/:productReviewId/ratings",
  productsReviewsController.getAllRatingOfAProductReview
);
router.get(
  "/:productReviewId/ratings/average",
  productsReviewsController.getAverageRatingOfAProductReview
);

// POST /productsReviews

router.post(
  "/",
  verifyToken,
  validateRequest(ProductReviewJoiSchema),
  productsReviewsController.createProductReview
);
router.post(
  "/:productReviewId/comments",
  validateRequest(ProductReviewComentJoiSchema),
  productsReviewsController.createComment
);
router.post(
  "/:productReviewId/comments/:commentId/replies",
  validateRequest(ReplyCommentJoiSchema),
  productsReviewsController.createReply
);
router.post(
  "/:productReviewId/ratings",
  validateRequest(RatingJoiSchema),
  productsReviewsController.createRating
);

// PATCH /productsReviews

router.patch(
  "/:productReviewId",
  verifyToken,
  validateRequest(ProductReviewJoiSchema),
  productsReviewsController.updateProductReview
);

// DELETE /productsReviews

router.delete(
  "/:productReviewId",
  verifyToken,
  productsReviewsController.deleteProductReview
);
router.delete(
  "/:productReviewId/comments/:commentId",
  verifyToken,
  productsReviewsController.deleteComment
);
router.delete(
  "/:productReviewId/comments/:commentId/replies/:replyId",
  verifyToken,
  productsReviewsController.deleteReply
);

module.exports = router;
