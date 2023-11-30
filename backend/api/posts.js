const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middlewares/verifyToken");
const Joi = require("joi");
const ReplyComment = require("../models/ReplyComment");
const RandonneeComment = require("../models/RandonneeComment");
const Rating = require("../models/Rating");

// VALIDATION

const PostJoiSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": `Le champ titre est obligatoire.`,
    "string.min": `Le titre doit contenir au moins 3 caractères.`,
  }),
  metaDescription: Joi.string().required().messages({
    "string.empty": `Le champ meta description est obligatoire.`,
  }),
  coverImageUrl: Joi.string().required().messages({
    "string.empty": `Le champ image de couverture est obligatoire.`,
  }),
  altImageCover: Joi.string().required().messages({
    "string.empty": `Le champ texte alternatif de l'image de couverture est obligatoire.`,
  }),
  gpxFileUrl: Joi.string().required().messages({
    "string.empty": `Le champ url du fichier gpx est obligatoire.`,
  }),
  gpxFileData: Joi.string().required().messages({
    "string.empty": `Le champ du fichier de téléchargement gpx est obligatoire.`,
  }),
  details: Joi.object({
    location: Joi.string().required().messages({
      "string.empty": `Le champ localisation est obligatoire.`,
    }),
    activityType: Joi.string()
      .valid("trekking", "randonnée")
      .required()
      .messages({
        "string.empty": `Le champ type d'activité est obligatoire.`,
        "any.only": `Le type d'activité doit être soit "trekking" soit "randonnée".`,
      }),
    duration: Joi.number().required().messages({
      "string.empty": `Le champ durée est obligatoire.`,
    }),
    distance: Joi.number().required().messages({
      "string.empty": `Le champ distance est obligatoire.`,
    }),
    elevationGain: Joi.number().required().messages({
      "string.empty": `Le champ dénivelé positif est obligatoire.`,
    }),
    elevationLoss: Joi.number().required().messages({
      "string.empty": `Le champ dénivelé négatif est obligatoire.`,
    }),
    difficulty: Joi.number().max(10).required().messages({
      "string.empty": `Le champ difficulté est obligatoire.`,
    }),
  }),
  introduction: Joi.object({
    content: Joi.string().required().messages({
      "string.empty": `Le champ introduction est obligatoire.`,
    }),
    imageUrl: Joi.string().required().messages({
      "string.empty": `Le champ image d'introduction est obligatoire.`,
    }),
    altImage: Joi.string().required().messages({
      "string.empty": `Le champ texte alternatif de l'image d'introduction est obligatoire.`,
    }),
  }),
  sections: Joi.array().items(
    Joi.object({
      title: Joi.string().required().messages({
        "string.empty": `Le champ titre de la section est obligatoire.`,
      }),
      subSections: Joi.array().items(
        Joi.object({
          content: Joi.string().required().messages({
            "string.empty": `Le champ contenu de la sous-section est obligatoire.`,
          }),
          imageUrl: Joi.string().required().messages({
            "string.empty": `Le champ image de la sous-section est obligatoire.`,
          }),
          altImage: Joi.string().required().messages({
            "string.empty": `Le champ texte alternatif de l'image de la sous-section est obligatoire.`,
          }),
        })
      ),
    })
  ),
  carousels: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      slides: Joi.array().items(
        Joi.object({
          caption: Joi.string().required().messages({
            "string.empty": `Le champ légende de l'image du carrousel est obligatoire.`,
          }),
          imageUrl: Joi.string().required().messages({
            "string.empty": `Le champ image du carrousel est obligatoire.`,
          }),
        })
      ),
    })
  ),
  conclusion: Joi.string().required().messages({
    "string.empty": `Le champ conclusion est obligatoire.`,
  }),
  author: Joi.string().required().messages({
    "string.empty": `Le champ auteur est obligatoire.`,
  }),
});

const RandonneeCommentJoiSchema = Joi.object({
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
    "string.empty": `Le champ note est obligatoire.`,
    "string.max": `La note ne doit pas dépasser 5 étoiles.`,
  }),
});

// GET ALL POSTS WITH PAGINATION AND FILTER BY ACTIVITY TYPE

router.get("/", async (req, res) => {
  const { page = 1, limit = 20, activityType } = req.query;
  const query = activityType ? { "details.activityType": activityType } : {};
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find(query).skip(skip).limit(limit).select({
      title: 1,
      coverImageUrl: 1,
      altImageCover: 1,
      details: 1,
      introduction: 1,
    });
    const totalPosts = await Post.countDocuments(query);

    res.json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des articles. Veuillez réessayer plus tard.",
    });
  }
});

// GET 4 LATEST POSTS

router.get("/latest-posts", async (req, res) => {
  try {
    const latestPosts = await Post.find().sort({ date: +1 }).limit(4).select({
      title: 1,
      coverImageUrl: 1,
      altImageCover: 1,
      date: 1,
      details: 1,
      introduction: 1,
    });
    res.json(latestPosts);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des articles de l'accueil. Veuillez réessayer plus tard.",
    });
  }
});

// SUBMIT POST

router.post("/", verifyToken, async (req, res) => {
  try {
    const { error } = PostJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = new Post({
      title: req.body.title,
      metaDescription: req.body.metaDescription,
      coverImageUrl: req.body.coverImageUrl,
      altImageCover: req.body.altImageCover,
      gpxFileUrl: req.body.gpxFileUrl,
      gpxFileData: req.body.gpxFileData,
      details: {
        location: req.body.details.location,
        activityType: req.body.details.activityType,
        duration: req.body.details.duration,
        distance: req.body.details.distance,
        elevationGain: req.body.details.elevationGain,
        elevationLoss: req.body.details.elevationLoss,
        difficulty: req.body.details.difficulty,
      },
      introduction: {
        content: req.body.introduction.content,
        imageUrl: req.body.introduction.imageUrl,
        altImage: req.body.introduction.altImage,
      },
      sections: req.body.sections,
      carousels: req.body.carousels,
      conclusion: req.body.conclusion,
      author: req.body.author,
      date: req.body.date,
    });

    await post.save();
    res.status(200).send({
      message: "L'article " + req.body.title + " à bien été créé !",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création de l'article. Veuillez réessayer plus tard.",
    });
  }
});

// GET SPECIFIC POST

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'article. Veuillez réessayer plus tard.",
    });
  }
});

// DELETE POST

router.delete("/:postId", verifyToken, async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postId });

    if (removedPost.deletedCount > 0) {
      res.status(200).json({
        message: "L'article " + req.params.postId + " à bien été supprimé.",
      });
    } else {
      res
        .status(404)
        .json({ message: "L'article " + req.params.postId + " n'existe pas." });
    }
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de l'article. Veuillez réessayer plus tard.",
    });
  }
});

// UPDATE POST

router.patch("/:postId", verifyToken, async (req, res) => {
  try {
    const { error } = PostJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
          metaDescription: req.body.metaDescription,
          coverImageUrl: req.body.coverImageUrl,
          altImageCover: req.body.altImageCover,
          gpxFileUrl: req.body.gpxFileUrl,
          gpxFileData: req.body.gpxFileData,
          details: {
            location: req.body.details.location,
            activityType: req.body.details.activityType,
            duration: req.body.details.duration,
            distance: req.body.details.distance,
            elevationGain: req.body.details.elevationGain,
            elevationLoss: req.body.details.elevationLoss,
            difficulty: req.body.details.difficulty,
          },
          introduction: {
            content: req.body.introduction.content,
            imageUrl: req.body.introduction.imageUrl,
            altImage: req.body.introduction.altImage,
          },
          sections: req.body.sections,
          carousels: req.body.carousels,
          conclusion: req.body.conclusion,
        },
      }
    );
    res.status(200).json({
      message: "L'article " + req.body.title + " à bien été modifié !",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la modification de l'article. Veuillez réessayer plus tard.",
    });
  }
});

// GET ALL COMMENTS WITH REPLIES AND PAGINATION

router.get("/:postId/comments-with-replies", async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const comments = await RandonneeComment.find({ postId: req.params.postId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("replies")
      .exec();

    const totalComments = await RandonneeComment.countDocuments({
      postId: req.params.postId,
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

router.post("/:postId/comments/:commentId/replies", async (req, res) => {
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

    await RandonneeComment.findByIdAndUpdate(
      req.params.commentId,
      { $push: { replies: savedReply._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({ message: "Votre réponse à bien été posté !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de l'envoi de la réponse. Veuillez réessayer plus tard.",
    });
  }
});

// SUBMIT COMMENT

router.post("/:postId/comments", async (req, res) => {
  try {
    const { error } = RandonneeCommentJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = new RandonneeComment({
      postId: req.params.postId,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      privacyPolicy: req.body.privacyPolicy,
      cgu: req.body.cgu,
      mentionsLegales: req.body.mentionsLegales,
    });
    const savedComment = await comment.save();
    res.status(200).json({ message: "Votre commentaire à bien été posté !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de l'envoi du commentaire. Veuillez réessayer plus tard.",
    });
  }
});

// DELETE COMMENT

router.delete("/:postId/comments/:commentId", verifyToken, async (req, res) => {
  try {
    const removedComment = await RandonneeComment.deleteOne({
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
});

// DELETE REPLY

router.delete(
  "/:postId/comments/:commentId/replies/:replyId",
  verifyToken,
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

// ADD RATING TO POST

router.post("/:postId/ratings", async (req, res) => {
  try {
    const { error } = RatingJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rating = new Rating({
      rating: req.body.rating,
    });

    const savedRating = await rating.save();
    res.status(200).json({ message: "Votre note à bien été enregistrée !" });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de l'enregistrement de votre note. Veuillez réessayer plus tard.",
    });
  }
});

// GET ALL RATINGS FOR A POST

router.get("/:postId/ratings", async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des notes. Veuillez réessayer plus tard.",
    });
  }
});

// GET AVERAGE RATING FOR A POST

router.get("/:postId/ratings/average", async (req, res) => {
  try {
    const ratings = await Rating.find();
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
