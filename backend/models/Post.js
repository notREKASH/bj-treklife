const mongoose = require("mongoose");

const sectionSubSchema = new mongoose.Schema({
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  altImage: { type: String, required: true },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subSections: [sectionSubSchema],
});

const carouselImageSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const carouselSchema = new mongoose.Schema({
  title: { type: String },
  slides: [carouselImageSchema],
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  metaDescription: { type: String, required: true },
  coverImageUrl: { type: String, required: true },
  altImageCover: { type: String, required: true },
  gpxFileUrl: { type: String, required: true },
  gpxFileData: { type: String, required: true },
  details: {
    location: { type: String, required: true },
    activityType: {
      type: String,
      required: true,
      enum: ["trekking", "randonnée"],
    },
    duration: { type: Number, required: true },
    distance: { type: Number, required: true },
    elevationGain: { type: Number, required: true },
    elevationLoss: { type: Number, required: true },
    difficulty: { type: Number, required: true },
  },
  introduction: {
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    altImage: { type: String, required: true },
  },
  sections: [sectionSchema],
  carousels: [carouselSchema],
  conclusion: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
