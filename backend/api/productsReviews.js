const express = require("express");
const router = express.Router();
const ProductReview = require("../models/ProductReview");
const ProductReviewComent = require("../models/ProductRComment");
const verifyToken = require("../middlewares/verifyToken");
const Joi = require("joi");
const ReplyComment = require("../models/ReplyComment");
const Rating = require("../models/Rating");

// VALIDATION

const ProductReviewJoiSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": `Le champ titre est obligatoire.`,
    "string.min": `Le titre doit contenir au moins 3 caractères.`,
  }),
  homeImageUrl: Joi.string().required().messages({
    "string.empty": `Le champ image d'accueil est obligatoire.`,
  }),
  altImageHome: Joi.string().required().messages({
    "string.empty": `Le champ texte alternatif de l'image d'accueil est obligatoire.`,
  }),
  cardImageUrl: Joi.string().required().messages({
    "string.empty": `Le champ image de carte est obligatoire.`,
  }),
  altImageCard: Joi.string().required().messages({
    "string.empty": `Le champ texte alternatif de l'image de carte est obligatoire.`,
  }),
  metaDescription: Joi.string().required().messages({
    "string.empty": `Le champ meta description est obligatoire.`,
  }),
  coverImageUrl: Joi.string().required().messages({
    "string.empty": `Le champ image de couverture est obligatoire.`,
  }),
  altImageCover: Joi.string().required().messages({
    "string.empty": `Le champ alt image de couverture est obligatoire.`,
  }),
  category: Joi.string()
    .valid("Vêtements", "Equipements", "Accessoires")
    .required()
    .messages({
      "string.empty": `Le champ catégorie est obligatoire.`,
      "any.only": `La catégorie doit être "Vêtements", "Equipements" ou "Accessoires".`,
    }),
  subCategory: Joi.string()
    .valid(
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
      "Pantalon"
    )
    .required()
    .messages({
      "string.empty": `Le champ sous-catégorie est obligatoire.`,
      "any.only": `La sous-catégorie doit être "Chaussure", "Sac à dos", "Tente", "Duvet", "Réchaud", "Kit Popote", "Matelas", "Frontale", "Filtre à eau", "Polaire", "Veste imperméable", "Doudoune" ou "Pantalon".`,
    }),
  introduction: Joi.object({
    content: Joi.string().required().messages({
      "string.empty": `Le champ introduction est obligatoire.`,
    }),
    imageUrl: Joi.string().required().messages({
      "string.empty": `Le champ image d'introduction est obligatoire.`,
    }),
    altImage: Joi.string().required().messages({
      "string.empty": `Le champ alt image d'introduction est obligatoire.`,
    }),
  }),
  techSpecs: Joi.array().items(
    Joi.object({
      spec: Joi.string().required().messages({
        "string.empty": `Le champ spécification est obligatoire.`,
      }),
      tech: Joi.string().required().messages({
        "string.empty": `Le champ technique est obligatoire.`,
      }),
    })
  ),
  techSpecsExplanation: Joi.string().required().messages({
    "string.empty": `Le champ explication des spécifications techniques est obligatoire.`,
  }),
  personalExperience: Joi.object({
    content: Joi.string().required().messages({
      "string.empty": `Le champ expérience personnelle est obligatoire.`,
    }),
    imageUrl: Joi.string().required().messages({
      "string.empty": `Le champ image d'expérience personnelle est obligatoire.`,
    }),
    altImage: Joi.string().required().messages({
      "string.empty": `Le champ alt image d'expérience personnelle est obligatoire.`,
    }),
  }),
  advantagesDisadvantages: Joi.array().items(
    Joi.object({
      advantage: Joi.string().allow(null, ""),
      disadvantage: Joi.string().allow(null, ""),
    })
  ),
  advantagesDisadvantagesExplanation: Joi.string().required().messages({
    "string.empty": `Le champ explication des avantages et inconvénients est obligatoire.`,
  }),
  conclusion: Joi.string().required().messages({
    "string.empty": `Le champ conclusion est obligatoire.`,
  }),
  ratings: Joi.array().items(
    Joi.object({
      name: Joi.string().required().messages({
        "string.empty": `Le champ nom de la notation est obligatoire.`,
      }),
      rating: Joi.number().max(5).required().messages({
        "number.max": `La note doit être inférieure ou égale à 5.`,
      }),
    })
  ),
  carouselsTitle: Joi.string().required().messages({
    "string.empty": `Le champ titre du carrousel est obligatoire.`,
  }),
  carousels: Joi.array().items(
    Joi.object({
      slides: Joi.array().items(
        Joi.object({
          caption: Joi.string().required().messages({
            "string.empty": `Le champ légende du carrousel est obligatoire.`,
          }),
          imageUrl: Joi.string().required().messages({
            "string.empty": `Le champ image du carrousel est obligatoire.`,
          }),
        })
      ),
    })
  ),
  linkShops: Joi.array().items(
    Joi.object({
      name: Joi.string().required().messages({
        "string.empty": `Le champ nom du lien d'achat est obligatoire.`,
      }),
      url: Joi.string().required().messages({
        "string.empty": `Le champ url du lien d'achat est obligatoire.`,
      }),
    })
  ),
  author: Joi.string().required().messages({
    "string.empty": `Le champ auteur est obligatoire.`,
  }),
});

const ProductReviewComentJoiSchema = Joi.object({
  name: Joi.string().min(3).max(40).required().messages({
    "string.empty": `Le champ nom est obligatoire.`,
    "string.min": `Le nom doit contenir au moins 3 caractères.`,
    "string.max": `Le nom ne doit pas dépasser 40 caractères.`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `Le champ email est obligatoire.`,
    "string.email": `L'email n'est pas valide.`,
  }),
  message: Joi.string().min(3).max(1000).required().messages({
    "string.empty": `Le champ message est obligatoire.`,
    "string.min": `Le message doit contenir au moins 3 caractères.`,
    "string.max": `Le message ne doit pas dépasser 1000 caractères.`,
  }),
  privacyPolicy: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter la politique de confidentialité.`,
  }),
  cgu: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter les conditions générales d'utilisation.`,
  }),
  mentionsLegales: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter les mentions légales.`,
  }),
});

const ReplyCommentJoiSchema = Joi.object({
  icon: Joi.string().allow(null, ""),
  name: Joi.string().min(3).max(40).required().messages({
    "string.empty": `Le champ nom est obligatoire.`,
    "string.min": `Le nom doit contenir au moins 3 caractères.`,
    "string.max": `Le nom ne doit pas dépasser 40 caractères.`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `Le champ email est obligatoire.`,
    "string.email": `L'email n'est pas valide.`,
  }),
  message: Joi.string().min(3).max(1000).required().messages({
    "string.empty": `Le champ message est obligatoire.`,
    "string.min": `Le message doit contenir au moins 3 caractères.`,
    "string.max": `Le message ne doit pas dépasser 1000 caractères.`,
  }),
  privacyPolicy: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter la politique de confidentialité.`,
  }),
  cgu: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter les conditions générales d'utilisation.`,
  }),
  mentionsLegales: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter les mentions légales.`,
  }),
});

const RatingJoiSchema = Joi.object({
  rating: Joi.number().max(5).required().messages({
    "number.max": `La note doit être inférieure ou égale à 5.`,
  }),
});

// GET ALL PRODUCT REVIEWS WITH PAGINATION AND FILTERS

router.get("/", async (req, res) => {
  const { page = 1, limit = 20, category, subCategory } = req.query;

  const query = {};
  if (category) {
    query.category = category;
  }
  if (subCategory) {
    query.subCategory = subCategory;
  }

  const skip = (page - 1) * limit;

  try {
    const reviews = await ProductReview.find(query)
      .skip(skip)
      .limit(limit)
      .select({
        title: 1,
        cardImageUrl: 1,
        altImageCard: 1,
        category: 1,
        subCategory: 1,
        introduction: 1,
      });
    const totalReviews = await ProductReview.countDocuments(query);

    res.json({
      reviews,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des articles. Veuillez réessayer plus tard.",
    });
  }
});

// GET 1 LATEST PRODUCT REVIEW

router.get("/latest-reviews", async (req, res) => {
  try {
    const latestReview = await ProductReview.findOne()
      .sort({ createdAt: -1 })
      .select({
        title: 1,
        homeImageUrl: 1,
        altImageHome: 1,
        introduction: 1,
        createdAt: 1,
      });
    res.json(latestReview);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'article de l'accueil. Veuillez réessayer plus tard",
    });
  }
});

// SUBMIT PRODUCT REVIEW

router.post("/", verifyToken, async (req, res) => {
  try {
    const { error } = ProductReviewJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = new ProductReview({
      title: req.body.title,
      homeImageUrl: req.body.homeImageUrl,
      altImageHome: req.body.altImageHome,
      cardImageUrl: req.body.cardImageUrl,
      altImageCard: req.body.altImageCard,
      metaDescription: req.body.metaDescription,
      coverImageUrl: req.body.coverImageUrl,
      altImageCover: req.body.altImageCover,
      category: req.body.category,
      subCategory: req.body.subCategory,
      introduction: {
        content: req.body.introduction.content,
        imageUrl: req.body.introduction.imageUrl,
        altImage: req.body.introduction.altImage,
      },
      techSpecs: req.body.techSpecs,
      techSpecsExplanation: req.body.techSpecsExplanation,
      personalExperience: {
        content: req.body.personalExperience.content,
        imageUrl: req.body.personalExperience.imageUrl,
        altImage: req.body.personalExperience.altImage,
      },
      advantagesDisadvantages: req.body.advantagesDisadvantages,
      advantagesDisadvantagesExplanation:
        req.body.advantagesDisadvantagesExplanation,
      conclusion: req.body.conclusion,
      ratings: req.body.ratings,
      linkShops: req.body.linkShops,
      carouselsTitle: req.body.carouselsTitle,
      carousels: req.body.carousels,
      author: req.body.author,
      createdAt: req.body.createdAt,
    });

    await post.save();
    res.status(200).send({
      message: "L'article " + req.body.title + " a bien été créé.",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de l'article. Veuillez réessayer plus tard.",
    });
  }
});

// GET SPECIFIC PRODUCT REVIEW

router.get("/:productReviewId", async (req, res) => {
  try {
    const productReview = await ProductReview.findById(
      req.params.productReviewId
    );
    res.json(productReview);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'article. Veuillez réessayer plus tard.",
    });
  }
});

// DELETE PRODUCT REVIEW

router.delete("/:productReviewId", verifyToken, async (req, res) => {
  try {
    const removedProductReview = await ProductReview.deleteOne({
      _id: req.params.productReviewId,
    });

    if (removedProductReview.deletedCount > 0) {
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
        "Une erreur est survenue lors de la suppression de l'article. Veuillez réessayer plus tard.",
    });
  }
});

// UPDATE PRODUCT REVIEW

router.patch("/:productReviewId", verifyToken, async (req, res) => {
  try {
    const { error } = ProductReviewJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedProductReview = await ProductReview.updateOne(
      { _id: req.params.productReviewId },
      {
        $set: {
          title: req.body.title,
          homeImageUrl: req.body.homeImageUrl,
          altImageHome: req.body.altImageHome,
          cardImageUrl: req.body.cardImageUrl,
          altImageCard: req.body.altImageCard,
          metaDescription: req.body.metaDescription,
          coverImageUrl: req.body.coverImageUrl,
          altImageCover: req.body.altImageCover,
          category: req.body.category,
          subCategory: req.body.subCategory,
          introduction: {
            content: req.body.introduction.content,
            imageUrl: req.body.introduction.imageUrl,
            altImage: req.body.introduction.altImage,
          },
          techSpecs: req.body.techSpecs,
          techSpecsExplanation: req.body.techSpecsExplanation,
          personalExperience: {
            content: req.body.personalExperience.content,
            imageUrl: req.body.personalExperience.imageUrl,
            altImage: req.body.personalExperience.altImage,
          },
          advantagesDisadvantages: req.body.advantagesDisadvantages,
          advantagesDisadvantagesExplanation:
            req.body.advantagesDisadvantagesExplanation,
          conclusion: req.body.conclusion,
          ratings: req.body.ratings,
          carouselsTitle: req.body.carouselsTitle,
          carousels: req.body.carousels,
          linkShops: req.body.linkShops,
          author: req.body.author,
        },
      }
    );
    res.status(200).send({
      message: "L'article " + req.body.title + " a bien été modifié.",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la modification de l'article. Veuillez réessayer plus tard.",
    });
  }
});

// GET ALL COMMENTS WITH REPLIES AND PAGINATION

router.get("/:productReviewId/comments-with-replies", async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const comments = await ProductReviewComent.find({
      productReviewId: req.params.productReviewId,
    })
      .skip(skip)
      .limit(limit)
      .populate("replies")
      .exec();

    const totalComments = await ProductReviewComent.countDocuments({
      productReviewId: req.params.productReviewId,
    });

    res.json({
      comments,
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des commentaires. Veuillez réessayer plus tard.",
    });
  }
});

// SUBMIT REPLY

router.post(
  "/:productReviewId/comments/:commentId/replies",
  async (req, res) => {
    try {
      const { error } = ReplyCommentJoiSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const reply = new ReplyComment({
        commentId: req.params.commentId,
        icon: req.body.icon,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        privacyPolicy: req.body.privacyPolicy,
        cgu: req.body.cgu,
        mentionsLegales: req.body.mentionsLegales,
      });

      const savedReply = await reply.save();

      await ProductReviewComent.findByIdAndUpdate(
        req.params.commentId,
        { $push: { replies: savedReply._id } },
        { new: true }
      );

      res.status(200).json({ message: "Votre réponse à bien été posté !" });
    } catch (err) {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de l'envoi de la réponse. Veuillez réessayer plus tard.",
      });
    }
  }
);

// SUBMIT COMMENT

router.post("/:productReviewId/comments", async (req, res) => {
  try {
    const { error } = ProductReviewComentJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = new ProductReviewComent({
      productReviewId: req.params.productReviewId,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      privacyPolicy: req.body.privacyPolicy,
      cgu: req.body.cgu,
      mentionsLegales: req.body.mentionsLegales,
    });

    await comment.save();
    res.status(200).json({ message: "Votre commentaire à bien été posté !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de l'envoi du commentaire. Veuillez réessayer plus tard.",
    });
  }
});

// DELETE COMMENT

router.delete(
  "/:productReviewId/comments/:commentId",
  verifyToken,
  async (req, res) => {
    try {
      const removedComment = await ProductReviewComent.deleteOne({
        _id: req.params.commentId,
      });
      if (removedComment.deletedCount > 0) {
        res.status(200).json({ message: "Commentaire supprimé avec succès" });
      } else {
        res.status(404).json({ message: "Commentaire introuvable" });
      }
    } catch (err) {
      res.json({
        message:
          "Une erreur est survenue lors de la suppression du commentaire. Veuillez réessayer plus tard.",
      });
    }
  }
);

// DELTE REPLY

router.delete(
  " /:productReviewId/comments/:commentId/replies/:replyId",
  async (req, res) => {
    try {
      const removedReply = await ReplyComment.deleteOne({
        _id: req.params.replyId,
      });
      if (removedReply.deletedCount > 0) {
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
  }
);

// ADD RATING TO PRODUCT REVIEW

router.post("/:productReviewId/ratings", async (req, res) => {
  try {
    const { error } = RatingJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rating = new Rating({
      rating: req.body.rating,
    });

    await rating.save();
    res.status(200).json({ message: "Votre note à bien été enregistrée !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de l'enregistrement de votre note. Veuillez réessayer plus tard.",
    });
  }
});

// GET ALL RATINGS OF A PRODUCT REVIEW

router.get("/:productReviewId/ratings", async (req, res) => {
  try {
    const ratings = await Rating.find({
      productReviewId: req.params.productReviewId,
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des notes. Veuillez réessayer plus tard.",
    });
  }
});

// GET AVERAGE RATING OF A PRODUCT REVIEW

router.get("/:productReviewId/ratings/average", async (req, res) => {
  try {
    const ratings = await Rating.find({
      productReviewId: req.params.productReviewId,
    });

    const averageRating =
      ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

    res.json(averageRating);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de la notation de l'article. Veuillez réessayer plus tard.",
    });
  }
});

module.exports = router;
