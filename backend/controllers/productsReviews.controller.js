const productsReviewsService = require("../services/productsReviews.service");

// GET ALL PRODUCTS REVIEWS WITH PAGINATION AND FILTER

exports.getAllProductsReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, subCategory } = req.query;
    const response = await productsReviewsService.findAllProductsReviews(
      parseInt(page),
      parseInt(limit),
      category || undefined,
      subCategory || undefined
    );
    res.json(response);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des avis produits. Veuillez réessayer plus tard.",
    });
  }
};

// GET 1 LATEST PRODUCT REVIEW

exports.getLatestProductReview = async (req, res) => {
  try {
    const productReview =
      await productsReviewsService.findLatestProductReview();

    res.json(productReview);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération du dernier avis produit. Veuillez réessayer plus tard.",
    });
  }
};

// GET PRODUCT REVIEW BY ID

exports.getProductReviewById = async (req, res) => {
  try {
    const { productReviewId } = req.params;

    const productReview = await productsReviewsService.findProductReviewById(
      productReviewId
    );

    res.json(productReview);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'avis produit. Veuillez réessayer plus tard.",
    });
  }
};

// GET PRODUCT REVIEW WITH COMMENTS AND REPLIES

exports.getProductReviewWithCommentsAndReplies = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const productReviewId = req.params.productReviewId;

    const paginationOptions = { productReviewId, page, limit };

    const result =
      await productsReviewsService.findProductReviewWithCommentsAndReplies(
        paginationOptions
      );

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'avis produit. Veuillez réessayer plus tard.",
    });
  }
};

// GET ALL RATING OF A PRODUCT REVIEW

exports.getAllRatingOfAProductReview = async (req, res) => {
  try {
    const { productReviewId } = req.params;

    const ratings = await productsReviewsService.findAllRatingOfAProductReview(
      productReviewId
    );

    res.json(ratings);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des notes. Veuillez réessayer plus tard.",
    });
  }
};

// GET AVERAGE RATING OF A PRODUCT REVIEW

exports.getAverageRatingOfAProductReview = async (req, res) => {
  try {
    const { productReviewId } = req.params;

    const averageRating =
      await productsReviewsService.findAverageRatingOfAProductReview(
        productReviewId
      );

    res.json(averageRating);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de la note moyenne. Veuillez réessayer plus tard.",
    });
  }
};

// CREATE PRODUCT REVIEW

exports.createProductReview = async (req, res) => {
  try {
    await productsReviewsService.createProductReview(req.body);

    res.status(200).send({
      message: "L'article " + req.body.title + " a bien été créé.",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de l'avis produit. Veuillez réessayer plus tard.",
    });
  }
};

// CREATE COMMENT

exports.createComment = async (req, res) => {
  try {
    const productReviewId = req.params.productReviewId;

    await productsReviewsService.createComment({
      comment: req.body,
      productReviewId,
    });

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

    await productsReviewsService.createReply({
      reply: req.body,
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
    await productsReviewsService.createRating(req.body);

    res.status(200).json({ message: "Votre note à bien été enregistrée !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de la note. Veuillez réessayer plus tard.",
    });
  }
};

// UPDATE PRODUCT REVIEW

exports.updateProductReview = async (req, res) => {
  try {
    const productReviewId = req.params.productReviewId;

    await productsReviewsService.updateProductReview(productReviewId, req.body);

    res.status(200).send({
      message: "L'article " + req.body.title + " a bien été modifié.",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de l'avis produit. Veuillez réessayer plus tard.",
    });
  }
};

// DELETE PRODUCT REVIEW

exports.deleteProductReview = async (req, res) => {
  try {
    const productReviewId = req.params.productReviewId;

    const deletedProductReview =
      await productsReviewsService.deleteProductReview(productReviewId);

    if (deletedProductReview.deletedCount > 0) {
      res.status(200).json({
        message: "L'article " + req.params.productReviewId + " a été supprimé.",
      });
    } else {
      res.status(404).json({
        message: "L'article " + req.params.productReviewId + " n'existe pas.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de l'avis produit. Veuillez réessayer plus tard.",
    });
  }
};

// DELETE COMMENT

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await productsReviewsService.deleteComment(
      commentId
    );

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
    const replyId = req.params.replyId;

    const deletedReply = await productsReviewsService.deleteReply(replyId);

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
