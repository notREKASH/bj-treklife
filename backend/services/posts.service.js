const Post = require("../models/Post");
const RandonneeComment = require("../models/RandonneeComment");
const Rating = require("../models/Rating");
const ReplyComment = require("../models/ReplyComment");

// GET ALL POSTS WITH PAGINATION AND FILTER BY ACTIVITY TYPE

exports.findAllPosts = async ({ page, limit, activityType }) => {
  const query = activityType ? { "details.activityType": activityType } : {};
  const skip = (page - 1) * limit;

  const posts = await Post.find(query).skip(skip).limit(limit).select({
    title: 1,
    coverImageUrl: 1,
    altImageCover: 1,
    details: 1,
    introduction: 1,
  });

  const totalPosts = await Post.countDocuments(query);

  return {
    posts,
    totalPosts,
    totalPages: Math.ceil(totalPosts / limit),
  };
};

// GET 4 LATEST POSTS

exports.findLatestPosts = async () => {
  const posts = await Post.find().sort({ createdAt: -1 }).limit(4).select({
    title: 1,
    coverImageUrl: 1,
    altImageCover: 1,
    details: 1,
    introduction: 1,
  });

  return posts;
};

// GET POST BY ID

exports.findPostById = async (postId) => {
  const post = await Post.findById(postId);

  return post;
};

// GET POST WITH COMMENTS AND REPLIES

exports.findPostWithCommentsAndReplies = async ({ postId, page, limit }) => {
  const skip = (page - 1) * limit;

  const comments = await RandonneeComment.find({ postId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("replies")
    .exec();

  const totalComments = await RandonneeComment.countDocuments({ postId });

  return {
    comments,
    totalComments,
    totalPages: Math.ceil(totalComments / limit),
  };
};

// GET POST RATINGS

exports.findPostRatings = async () => {
  const ratings = await Rating.find();

  return ratings;
};

// GET POST AVERAGE RATING

exports.findPostAverageRating = async () => {
  const ratings = await Rating.find();

  const averageRating =
    ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length;

  return averageRating;
};

// CREATE POST

exports.createPost = async (post) => {
  const newPost = await Post.create(post);

  return newPost;
};

// CREATE COMMENT

exports.createComment = async ({ comment, postId }) => {
  const newComment = await RandonneeComment.create({ ...comment, postId });

  return newComment;
};

// CREATE REPLY

exports.createReply = async ({ reply, commentId }) => {
  const newReply = await ReplyComment.create({ ...reply, commentId });

  await RandonneeComment.findByIdAndUpdate(
    commentId,
    { $push: { replies: newReply._id } },
    { new: true }
  );
};

// CREATE RATING

exports.createRating = async (rating) => {
  const newRating = await Rating.create(rating);

  return newRating;
};

// UPDATE POST

exports.updatePost = async (postId, post) => {
  const updatedPost = await Post.updateOne({ _id: postId }, post);

  return updatedPost;
};

// DELETE POST

exports.deletePost = async (postId) => {
  const deletedPost = await Post.deleteOne({ _id: postId });

  return deletedPost;
};

// DELETE COMMENT

exports.deleteComment = async (commentId) => {
  const deletedComment = await RandonneeComment.deleteOne({ _id: commentId });

  return deletedComment;
};

// DELETE REPLY

exports.deleteReply = async (replyId) => {
  const deletedReply = await ReplyComment.deleteOne({ _id: replyId });

  return deletedReply;
};
