const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const postsRoute = require("./routes/posts.router");
const productsReviewsRoute = require("./routes/productsReviews.router");
const sendmail = require("./routes/sendmail.router");
const newsLetterRoute = require("./routes/newsLetter.router");
const authRoute = require("./routes/auth.router");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/posts", postsRoute);
app.use("/productsReviews", productsReviewsRoute);
app.use("/sendmail", sendmail);
app.use("/newsLetter", newsLetterRoute);
app.use("/auth", authRoute);

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
