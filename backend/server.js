const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const productsReviewsRoute = require("./routes/productsReviews");
const newsLetterRoute = require("./routes/newsLetter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/newsLetter", newsLetterRoute);
app.use("/posts", postsRoute);
app.use("/auth", authRoute);
app.use("/productsReviews", productsReviewsRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.log(err));
