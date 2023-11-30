const mongoose = require("mongoose");

const techSpecSchema = new mongoose.Schema({
  spec: { type: String, required: true },
  tech: { type: String, required: true },
});

const advantagesDisadvantagesSchema = new mongoose.Schema({
  advantage: { type: String },
  disadvantage: { type: String },
});

const ratingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
});

const carouselImageSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const carouselSchema = new mongoose.Schema({
  slides: [carouselImageSchema],
});

const linkShopsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const ProductReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  metaDescription: { type: String, required: true },
  coverImageUrl: { type: String, required: true },
  altImageCover: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Vêtements", "Equipements", "Accessoires"],
  },
  subCategory: {
    type: String,
    required: true,
    enum: [
      "Chaussure",
      "Sac à dos",
      "Tente",
      "Duvet",
      "Réchaud",
      "Kit Popote",
      "Matelas",
      "Frontale",
      "Filtre à eau",
      "Polaire",
      "Veste imperméable",
      "Doudoune",
      "Pantalon",
    ],
  },
  introduction: {
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    altImage: { type: String, required: true },
  },
  techSpecs: [techSpecSchema],
  techSpecsExplanation: { type: String },
  personalExperience: {
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    altImage: { type: String, required: true },
  },
  advantagesDisadvantages: [advantagesDisadvantagesSchema],
  advantagesDisadvantagesExplanation: { type: String, required: true },
  conclusion: { type: String, required: true },
  ratings: [ratingSchema],
  carouselsTitle: { type: String, required: true },
  carousels: [carouselSchema],
  linkShops: [linkShopsSchema],
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);

module.exports = ProductReview;
