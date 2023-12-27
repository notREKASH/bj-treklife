const Joi = require("joi");

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

module.exports = PostJoiSchema;
