const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const verifyToken = require("../middlewares/verifyToken");
const PostJoiSchema = require("../schemas/PostJoiSchema");
const validateRequest = require("../middlewares/validateRequest");
const RandonneeCommentJoiSchema = require("../schemas/RandonneeCommentJoiSchema");
const ReplyCommentJoiSchema = require("../schemas/ReplyCommentJoiSchema");
const RatingJoiSchema = require("../schemas/RatingJoiSchema");

// GET /posts

router.get("/", postsController.getAllPosts);
router.get("/latest-posts", postsController.getLatestPosts);
router.get("/:postId", postsController.getPostById);
router.get(
  "/:postId/comments-with-replies",
  postsController.getPostWithCommentsAndReplies
);
router.get("/:postId/ratings", postsController.getPostRatings);
router.get("/postId/ratings/average", postsController.getPostAverageRating);

// POST /posts

router.post(
  "/",
  verifyToken,
  validateRequest(PostJoiSchema),
  postsController.createPost
);
router.post(
  "/:postId/comments",
  validateRequest(RandonneeCommentJoiSchema),
  postsController.createComment
);
router.post(
  "/:postId/comments/:commentId/replies",
  validateRequest(ReplyCommentJoiSchema),
  postsController.createReply
);
router.post(
  "/:postId/ratings",
  validateRequest(RatingJoiSchema),
  postsController.createRating
);

// // PATCH /posts

router.patch(
  "/:postId",
  verifyToken,
  validateRequest(PostJoiSchema),
  postsController.updatePost
);

// DELETE /posts

router.delete("/:postId", verifyToken, postsController.deletePost);
router.delete(
  "/:postId/comments/:commentId",
  verifyToken,
  postsController.deleteComment
);
router.delete(
  "/:postId/comments/:commentId/replies/:replyId",
  verifyToken,
  postsController.deleteReply
);

module.exports = router;
