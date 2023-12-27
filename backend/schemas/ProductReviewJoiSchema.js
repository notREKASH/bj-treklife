const Joi = require("joi");

const ProductReviewJoiSchema = Joi.object({
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

module.exports = ProductReviewJoiSchema;
