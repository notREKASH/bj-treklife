const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const postsRoute = require("./api/posts");
const authRoute = require("./api/auth");
const productsReviewsRoute = require("./api/productsReviews");
const newsLetterRoute = require("./api/newsLetter");
// const sendmail = require("./api/sendmail");

const app = express();

app.use(
  cors({
    origin: "https://www.bj-treklife.fr",
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use("/api/newsLetter", newsLetterRoute);
app.use("/api/posts", postsRoute);
app.use("/api/auth", authRoute);
app.use("/api/productsReviews", productsReviewsRoute);
// app.use("/api/sendmail", sendmail);

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
