const postService = require("../services/posts.service");

// GET ALL POSTS WITH PAGINATION AND FILTER BY ACTIVITY TYPE

exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 20, activityType } = req.query;
    const paginationOptions = { page, limit, activityType };

    const result = await postService.findAllPosts(paginationOptions);

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des articles. Veuillez réessayer plus tard.",
    });
  }
};

// GET 4 LATEST POSTS

exports.getLatestPosts = async (req, res) => {
  try {
    const posts = await postService.findLatestPosts();

    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des articles de l'accueil. Veuillez réessayer plus tard.",
    });
  }
};

// GET POST BY ID

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postService.findPostById(postId);

    res.json(post);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'article. Veuillez réessayer plus tard.",
    });
  }
};

// GET POST WITH COMMENTS AND REPLIES

exports.getPostWithCommentsAndReplies = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const postId = req.params.postId;

    const paginationOptions = { postId, page, limit };

    const post = await postService.findPostWithCommentsAndReplies(
      paginationOptions
    );

    res.json(post);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des commentaires. Veuillez réessayer plus tard.",
    });
  }
};

// GET POST RATINGS

exports.getPostRatings = async (req, res) => {
  try {
    const ratings = await postService.findPostRatings();
    res.json(ratings);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des notes. Veuillez réessayer plus tard.",
    });
  }
};

// GET POST AVERAGE RATING

exports.getPostAverageRating = async (req, res) => {
  try {
    const averageRating = await postService.findPostAverageRating();

    res.json(averageRating);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de la notation de l'article. Veuillez réessayer plus tard.",
    });
  }
};

// CREATE POST

exports.createPost = async (req, res) => {
  try {
    await postService.createPost(req.body);

    res.status(200).send({
      message: "L'article " + req.body.title + " à bien été créé !",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de l'article. Veuillez réessayer plus tard.",
    });
  }
};

// CREATE COMMENT

exports.createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comment = req.body;

    await postService.createComment({ comment, postId });

    res.status(200).json({ message: "Votre commentaire à bien été posté !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création du commentaire. Veuillez réessayer plus tard.",
    });
  }
};

// CREATE REPLY

exports.createReply = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const reply = req.body;

    await postService.createReply({
      reply,
      commentId,
    });

    res.status(200).json({ message: "Votre réponse à bien été posté !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de la réponse. Veuillez réessayer plus tard.",
    });
  }
};

// CREATE RATING

exports.createRating = async (req, res) => {
  try {
    const rating = req.body;

    await postService.createRating(rating);

    res.status(200).json({ message: "Votre note à bien été enregistrée !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de l'enregistrement de votre note. Veuillez réessayer plus tard.",
    });
  }
};

// UPDATE POST

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = req.body;

    await postService.updatePost(postId, post);

    res.status(200).json({
      message: "L'article " + req.body.title + " à bien été modifié !",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de l'article. Veuillez réessayer plus tard.",
    });
  }
};

// DELETE POST

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const deletedPost = await postService.deletePost(postId);

    if (deletedPost.deletedCount > 0) {
      res.status(200).json({
        message: "L'article " + postId + " a été supprimé.",
      });
    } else {
      res.status(404).json({
        message: "L'article " + postId + " n'existe pas.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de l'article. Veuillez réessayer plus tard.",
    });
  }
};

// DELETE COMMENT

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await postService.deleteComment(commentId);

    if (deletedComment.deletedCount > 0) {
      res.status(200).json({ message: "Commentaire supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Commentaire introuvable" });
    }
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression du commentaire. Veuillez réessayer plus tard.",
    });
  }
};

// DELETE REPLY

exports.deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;

    const deletedReply = await postService.deleteReply(replyId);

    if (deletedReply.deletedCount > 0) {
      res.status(200).json({ message: "Réponse supprimée avec succès" });
    } else {
      res.status(404).json({ message: "Réponse introuvable" });
    }
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de la réponse. Veuillez réessayer plus tard.",
    });
  }
};
