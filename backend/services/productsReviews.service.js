const ProductReview = require("../models/ProductReview");
const ProductReviewComment = require("../models/ProductRComment");
const ReplyComment = require("../models/ReplyComment");

// GET ALL PRODUCTS REVIEWS WITH PAGINATION AND FILTER

exports.findAllProductsReviews = async (
  page = 1,
  limit = 20,
  category,
  subCategory
) => {
  const query = {};
  if (category) query.category = category;
  if (subCategory) query.subCategory = subCategory;

  const skip = (page - 1) * limit;
  const reviews = await ProductReview.find(query)
    .skip(skip)
    .limit(limit)
    .select({
      title: 1,
      coverImageUrl: 1,
      altImageCover: 1,
      category: 1,
      subCategory: 1,
      introduction: 1,
    });
  const totalReviews = await ProductReview.countDocuments(query);

  return {
    reviews,
    totalReviews,
    totalPages: Math.ceil(totalReviews / limit),
  };
};

// GET 1 LATEST PRODUCT REVIEW

exports.findLatestProductReview = async () => {
  const productReview = await ProductReview.findOne()
    .sort({ createdAt: -1 })
    .select({
      title: 1,
      coverImageUrl: 1,
      altImageCover: 1,
      introduction: 1,
      createdAt: 1,
    });

  return productReview;
};

// GET PRODUCT REVIEW BY ID

exports.findProductReviewById = async (productReviewId) => {
  const productReview = await ProductReview.findOne({ _id: productReviewId });

  return productReview;
};

// GET PRODUCT REVIEW WITH COMMENTS AND REPLIES

exports.findProductReviewWithCommentsAndReplies = async ({
  productReviewId,
  page,
  limit,
}) => {
  const skip = (page - 1) * limit;

  const comments = await ProductReviewComment.find({ productReviewId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("replies")
    .exec();

  const totalComments = await ProductReviewComment.countDocuments({
    productReviewId,
  });

  return {
    comments,
    totalComments,
    totalPages: Math.ceil(totalComments / limit),
  };
};

// GET ALL RATINGS OF A PRODUCT REVIEW

exports.findAllRatingsOfProductReview = async (productReviewId) => {
  const ratings = await ProductReviewComment.find({
    productReviewId,
  });

  return ratings;
};

// GET AVERAGE RATING OF A PRODUCT REVIEW

exports.findAverageRatingOfProductReview = async (productReviewId) => {
  const ratings = await ProductReviewComment.find({
    productReviewId,
  });

  const averageRating =
    ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length;

  return averageRating;
};

// CREATE PRODUCT REVIEW

exports.createProductReview = async (productReview) => {
  const newProductReview = await ProductReview.create(productReview);

  return newProductReview;
};

// CREATE COMMENT

exports.createComment = async ({ comment, productReviewId }) => {
  const newComment = await ProductReviewComment.create({
    ...comment,
    productReviewId,
  });

  return newComment;
};

// CREATE REPLY

exports.createReply = async ({ reply, commentId }) => {
  const newReply = await ReplyComment.create({ ...reply, commentId });

  await ProductReviewComment.findByIdAndUpdate(
    commentId,
    { $push: { replies: newReply._id } },
    { new: true }
  );

  return newReply;
};

// CREATE RATING

exports.createRating = async (rating) => {
  const newRating = await Rating.create(rating);

  return newRating;
};

// UPDATE PRODUCT REVIEW

exports.updateProductReview = async (productReviewId, productReview) => {
  const updatedProductReview = await ProductReview.updateOne(
    { _id: productReviewId },
    productReview
  );

  return updatedProductReview;
};

// DELETE PRODUCT REVIEW

exports.deleteProductReview = async (productReviewId) => {
  const deletedProductReview = await ProductReview.deleteOne({
    _id: productReviewId,
  });

  return deletedProductReview;
};

// DELETE COMMENT

exports.deleteComment = async (commentId) => {
  const deletedComment = await ProductReviewComment.deleteOne({
    _id: commentId,
  });

  return deletedComment;
};

// DELETE REPLY

exports.deleteReply = async (replyId) => {
  const deletedReply = await ReplyComment.deleteOne({ _id: replyId });

  return deletedReply;
};
