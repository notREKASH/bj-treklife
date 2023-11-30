"use client";

import "./patch.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getSpecificReview,
  updateReview,
} from "@/app/redux/actions/reviews.action";
import Loader from "@/components/Loader/Loader";

function Page({ params, searchParams }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificReview(params.id));
  }, [dispatch, params]);

  const review = useSelector((state) => state.reviews.review);
  const loading = useSelector((state) => state.reviews.loading);
  const token = useSelector((state) => state.auth.token);

  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [altImageCover, setAltImageCover] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [introduction, setIntroduction] = useState({
    content: "",
    imageUrl: "",
    altImage: "",
  });
  const [techSpecs, setTechSpecs] = useState([
    {
      spec: "",
      tech: "",
    },
  ]);
  const [techSpecsExplanation, setTechSpecsExplanation] = useState("");
  const [personalExperience, setPersonalExperience] = useState({
    content: "",
    imageUrl: "",
    altImage: "",
  });
  const [advantagesDisadvantages, setAdvantagesDisadvantages] = useState([
    {
      advantage: "",
      disadvantage: "",
    },
  ]);
  const [
    advantagesDisadvantagesExplanation,
    setAdvantagesDisadvantagesExplanation,
  ] = useState("");
  const [ratings, setRatings] = useState([
    {
      name: "",
      rating: "",
    },
  ]);
  const [linkShops, setLinkShops] = useState([
    {
      name: "",
      url: "",
    },
  ]);
  const [carousels, setCarousels] = useState([
    {
      slides: [
        {
          caption: "",
          imageUrl: "",
        },
      ],
    },
  ]);
  const [carouselsTitle, setCarouselsTitle] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (review?.title) {
      setTitle(review.title);
    }
    if (review?.metaDescription) {
      setMetaDescription(review.metaDescription);
    }
    if (review?.coverImageUrl) {
      setCoverImageUrl(review.coverImageUrl);
    }
    if (review?.altImageCover) {
      setAltImageCover(review.altImageCover);
    }
    if (review?.category) {
      setCategory(review.category);
    }
    if (review?.subCategory) {
      setSubCategory(review.subCategory);
    }
    if (review?.introduction) {
      setIntroduction({
        content: review.introduction.content,
        imageUrl: review.introduction.imageUrl,
        altImage: review.introduction.altImage,
      });
    }
    if (review?.techSpecs) {
      setTechSpecs(
        review.techSpecs.map((techSpec) => ({
          spec: techSpec.spec,
          tech: techSpec.tech,
        }))
      );
    }
    if (review?.techSpecsExplanation) {
      setTechSpecsExplanation(review.techSpecsExplanation);
    }
    if (review?.personalExperience) {
      setPersonalExperience({
        content: review.personalExperience.content,
        imageUrl: review.personalExperience.imageUrl,
        altImage: review.personalExperience.altImage,
      });
    }
    if (review?.advantagesDisadvantages) {
      setAdvantagesDisadvantages(
        review.advantagesDisadvantages.map((advantagesDisadvantage) => ({
          advantage: advantagesDisadvantage.advantage,
          disadvantage: advantagesDisadvantage.disadvantage,
        }))
      );
    }
    if (review?.advantagesDisadvantagesExplanation) {
      setAdvantagesDisadvantagesExplanation(
        review.advantagesDisadvantagesExplanation
      );
    }
    if (review?.ratings) {
      setRatings(
        review.ratings.map((rating) => ({
          name: rating.name,
          rating: rating.rating,
        }))
      );
    }
    if (review?.linkShops) {
      setLinkShops(
        review.linkShops.map((linkShop) => ({
          name: linkShop.name,
          url: linkShop.url,
        }))
      );
    }
    if (review?.carousels) {
      setCarousels(
        review.carousels.map((carousel) => ({
          slides: carousel.slides.map((slide) => ({
            caption: slide.caption,
            imageUrl: slide.imageUrl,
          })),
        }))
      );
    }
    if (review?.carouselsTitle) {
      setCarouselsTitle(review.carouselsTitle);
    }
    if (review?.conclusion) {
      setConclusion(review.conclusion);
    }
    if (review?.author) {
      setAuthor(review.author);
    }
  }, [review]);

  if (loading) {
    return <Loader />;
  }

  const handleAddSlide = (e) => {
    e.preventDefault();
    setCarousels([
      ...carousels,
      {
        slides: [
          {
            caption: "",
            imageUrl: "",
          },
        ],
      },
    ]);
  };

  const handleAddLinkShop = (e) => {
    e.preventDefault();
    setLinkShops([
      ...linkShops,
      {
        name: "",
        url: "",
      },
    ]);
  };

  const handleAddRating = (e) => {
    e.preventDefault();
    setRatings([
      ...ratings,
      {
        name: "",
        rating: "",
      },
    ]);
  };

  const handleAddAdvDisadv = (e) => {
    e.preventDefault();
    setAdvantagesDisadvantages([
      ...advantagesDisadvantages,
      {
        advantage: "",
        disadvantage: "",
      },
    ]);
  };

  const handleAddSpecsTechs = (e) => {
    e.preventDefault();
    setTechSpecs([
      ...techSpecs,
      {
        spec: "",
        tech: "",
      },
    ]);
  };

  const handleSendModification = (e) => {
    e.preventDefault();
    const review = {
      title,
      metaDescription,
      coverImageUrl,
      altImageCover,
      category,
      subCategory,
      introduction,
      techSpecs,
      techSpecsExplanation,
      personalExperience,
      advantagesDisadvantages,
      advantagesDisadvantagesExplanation,
      ratings,
      linkShops,
      carousels,
      carouselsTitle,
      conclusion,
      author,
    };

    dispatch(updateReview(params.id, review, token));

    setTitle("");
    setMetaDescription("");
    setCoverImageUrl("");
    setAltImageCover("");
    setCategory("");
    setSubCategory("");
    setIntroduction({
      content: "",
      imageUrl: "",
      altImage: "",
    });
    setTechSpecs([
      {
        spec: "",
        tech: "",
      },
    ]);
    setTechSpecsExplanation("");
    setPersonalExperience({
      content: "",
      imageUrl: "",
      altImage: "",
    });
    setAdvantagesDisadvantages([
      {
        advantage: "",
        disadvantage: "",
      },
    ]);
    setAdvantagesDisadvantagesExplanation("");
    setRatings([
      {
        name: "",
        rating: "",
      },
    ]);
    setLinkShops([
      {
        name: "",
        url: "",
      },
    ]);
    setCarousels([
      {
        slides: [
          {
            caption: "",
            imageUrl: "",
          },
        ],
      },
    ]);
    setCarouselsTitle("");
    setConclusion("");
  };

  return (
    <div className="patch-page">
      <form onSubmit={handleSendModification}>
        <div className="patch-page__container">
          <h3>Information Principal</h3>
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label>Meta Description</label>
          <input
            type="text"
            value={metaDescription}
            onChange={(e) => {
              setMetaDescription(e.target.value);
            }}
          />
          <label>Cover Image URL</label>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => {
              setCoverImageUrl(e.target.value);
            }}
          />
          <label>Alt Image Cover</label>
          <input
            type="text"
            value={altImageCover}
            onChange={(e) => {
              setAltImageCover(e.target.value);
            }}
          />
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <label>Sub Category</label>
          <input
            type="text"
            value={subCategory}
            onChange={(e) => {
              setSubCategory(e.target.value);
            }}
          />
        </div>
        <div className="patch-page__container">
          <h3>Introduction</h3>
          <label>Contenu textuel</label>
          <textarea
            name="introduction"
            value={introduction.content}
            onChange={(e) => {
              setIntroduction({
                ...introduction,
                content: e.target.value,
              });
            }}
          />
          <label>Image introduction</label>
          <input
            type="text"
            value={introduction.imageUrl}
            onChange={(e) => {
              setIntroduction({
                ...introduction,
                imageUrl: e.target.value,
              });
            }}
          />
          <label>Alt Image introduction</label>
          <input
            type="text"
            value={introduction.altImage}
            onChange={(e) => {
              setIntroduction({
                ...introduction,
                altImage: e.target.value,
              });
            }}
          />
        </div>
        <div className="patch-page__container">
          <h3>Caractéristique technique</h3>
          <button onClick={handleAddSpecsTechs}>
            Ajouter une caractéristique technique
          </button>
          {techSpecs?.map((techSpec, index) => (
            <div key={index}>
              <label>Spec</label>
              <input
                type="text"
                value={techSpec.spec}
                onChange={(e) => {
                  setTechSpecs(
                    techSpecs.map((techSpec, i) => {
                      if (i === index) {
                        return {
                          ...techSpec,
                          spec: e.target.value,
                        };
                      }
                      return techSpec;
                    })
                  );
                }}
              />
              <label>Tech</label>
              <input
                type="text"
                value={techSpec.tech}
                onChange={(e) => {
                  setTechSpecs(
                    techSpecs.map((techSpec, i) => {
                      if (i === index) {
                        return {
                          ...techSpec,
                          tech: e.target.value,
                        };
                      }
                      return techSpec;
                    })
                  );
                }}
              />
            </div>
          ))}
          <label>Explication</label>
          <textarea
            name="techSpecsExplanation"
            value={techSpecsExplanation}
            onChange={(e) => {
              setTechSpecsExplanation(e.target.value);
            }}
          />
        </div>
        <div className="patch-page__container">
          <h3>Expérience personnel</h3>
          <label>Contenu textuel</label>
          <textarea
            name="personalExperience"
            value={personalExperience.content}
            onChange={(e) => {
              setPersonalExperience({
                ...personalExperience,
                content: e.target.value,
              });
            }}
          />
          <label>Image Personnel</label>
          <input
            type="text"
            value={personalExperience.imageUrl}
            onChange={(e) => {
              setPersonalExperience({
                ...personalExperience,
                imageUrl: e.target.value,
              });
            }}
          />
          <label>Alt Image Personnel</label>
          <input
            type="text"
            value={personalExperience.altImage}
            onChange={(e) => {
              setPersonalExperience({
                ...personalExperience,
                altImage: e.target.value,
              });
            }}
          />
        </div>
        <div className="patch-page__container">
          <h3>Avantages et désavantages</h3>
          <button onClick={handleAddAdvDisadv}>
            Ajouter un avantage et désavantage
          </button>
          {advantagesDisadvantages.map((advantagesDisadvantage, index) => (
            <div key={index}>
              <label>Avantages</label>
              <input
                type="text"
                value={advantagesDisadvantage.advantage}
                onChange={(e) => {
                  setAdvantagesDisadvantages(
                    advantagesDisadvantages.map((advantagesDisadvantage, i) => {
                      if (i === index) {
                        return {
                          ...advantagesDisadvantage,
                          advantage: e.target.value,
                        };
                      }
                      return advantagesDisadvantage;
                    })
                  );
                }}
              />
              <label>Désavantages</label>
              <input
                type="text"
                value={advantagesDisadvantage.disadvantage}
                onChange={(e) => {
                  setAdvantagesDisadvantages(
                    advantagesDisadvantages.map((advantagesDisadvantage, i) => {
                      if (i === index) {
                        return {
                          ...advantagesDisadvantage,
                          disadvantage: e.target.value,
                        };
                      }
                      return advantagesDisadvantage;
                    })
                  );
                }}
              />
            </div>
          ))}
          <label>Explication</label>
          <textarea
            name="advantagesDisadvantagesExplanation"
            value={advantagesDisadvantagesExplanation}
            onChange={(e) => {
              setAdvantagesDisadvantagesExplanation(e.target.value);
            }}
          />
        </div>
        <div className="patch-page__container">
          <h3>Notes</h3>
          <button onClick={handleAddRating}>Ajouter une note</button>
          {ratings.map((rating, index) => (
            <div key={index}>
              <label>Nom</label>
              <input
                type="text"
                value={rating.name}
                onChange={(e) => {
                  setRatings(
                    ratings.map((rating, i) => {
                      if (i === index) {
                        return {
                          ...rating,
                          name: e.target.value,
                        };
                      }
                      return rating;
                    })
                  );
                }}
              />
              <label>Note</label>
              <input
                type="text"
                value={rating.rating}
                onChange={(e) => {
                  setRatings(
                    ratings.map((rating, i) => {
                      if (i === index) {
                        return {
                          ...rating,
                          rating: e.target.value,
                        };
                      }
                      return rating;
                    })
                  );
                }}
              />
            </div>
          ))}
        </div>
        <div className="patch-page__container">
          <h3>Liens d&rsquo;achat</h3>
          <button onClick={handleAddLinkShop}>
            Ajouter un lien d&rsquo;achat
          </button>
          {linkShops.map((linkShop, index) => (
            <div key={index}>
              <label>Nom</label>
              <input
                type="text"
                value={linkShop.name}
                onChange={(e) => {
                  setLinkShops(
                    linkShops.map((linkShop, i) => {
                      if (i === index) {
                        return {
                          ...linkShop,
                          name: e.target.value,
                        };
                      }
                      return linkShop;
                    })
                  );
                }}
              />
              <label>URL</label>
              <input
                type="text"
                value={linkShop.url}
                onChange={(e) => {
                  setLinkShops(
                    linkShops.map((linkShop, i) => {
                      if (i === index) {
                        return {
                          ...linkShop,
                          url: e.target.value,
                        };
                      }
                      return linkShop;
                    })
                  );
                }}
              />
            </div>
          ))}
        </div>
        <div className="patch-page__container">
          <h3>Carousels</h3>
          <label>Titre</label>
          <input
            type="text"
            value={carouselsTitle}
            onChange={(e) => {
              setCarouselsTitle(e.target.value);
            }}
          />
          <button onClick={handleAddSlide}>Ajouter une slide</button>
          {carousels.map((carousel, index) => (
            <div key={index}>
              {carousel.slides.map((slide, index) => (
                <div key={index}>
                  <label>Caption</label>
                  <input
                    type="text"
                    value={slide.caption}
                    onChange={(e) => {
                      setCarousels(
                        carousels.map((carousel, i) => {
                          if (i === index) {
                            return {
                              ...carousel,
                              slides: carousel.slides.map((slide, i) => {
                                if (i === index) {
                                  return {
                                    ...slide,
                                    caption: e.target.value,
                                  };
                                }
                                return slide;
                              }),
                            };
                          }
                          return carousel;
                        })
                      );
                    }}
                  />
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={slide.imageUrl}
                    onChange={(e) => {
                      setCarousels(
                        carousels.map((carousel, i) => {
                          if (i === index) {
                            return {
                              ...carousel,
                              slides: carousel.slides.map((slide, i) => {
                                if (i === index) {
                                  return {
                                    ...slide,
                                    imageUrl: e.target.value,
                                  };
                                }
                                return slide;
                              }),
                            };
                          }
                          return carousel;
                        })
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="patch-page__container">
          <h3>Conclusion</h3>
          <textarea
            name="conclusion"
            value={conclusion}
            onChange={(e) => {
              setConclusion(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="patch-page__buttons">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Page;
