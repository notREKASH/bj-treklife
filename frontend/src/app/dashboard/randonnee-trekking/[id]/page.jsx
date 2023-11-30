"use client";

import { use, useEffect, useState } from "react";
import "./patch.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";
import { getSpecificPost, updatePost } from "@/app/redux/actions/posts.action";

function Page({ params, searchParams }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificPost(params.id));
  }, [dispatch, params]);

  const token = useSelector((state) => state.auth.token);

  const post = useSelector((state) => state.posts.post);
  const loading = useSelector((state) => state.posts.loading);

  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [altImageCover, setAltImageCover] = useState("");
  const [gpxFileUrl, setGpxFileUrl] = useState("");
  const [gpxFileData, setGpxFileData] = useState("");
  const [introduction, setIntroduction] = useState({
    content: "",
    imageUrl: "",
    altImage: "",
  });
  const [details, setDetails] = useState({
    location: "",
    activityType: "",
    duration: "",
    distance: "",
    elevationGain: "",
    elevationLoss: "",
    difficulty: "",
  });
  const [sections, setSections] = useState([
    {
      title: "",
      subSections: [
        {
          content: "",
          imageUrl: "",
          altImage: "",
        },
      ],
    },
  ]);
  const [carousels, setCarousels] = useState([
    {
      title: "",
      slides: [
        {
          caption: "",
          imageUrl: "",
        },
      ],
    },
  ]);
  const [conclusion, setConclusion] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (post?.title) {
      setTitle(post.title);
    }
    if (post?.metaDescription) {
      setMetaDescription(post.metaDescription);
    }
    if (post?.coverImageUrl) {
      setCoverImageUrl(post.coverImageUrl);
    }
    if (post?.altImageCover) {
      setAltImageCover(post.altImageCover);
    }
    if (post?.gpxFileUrl) {
      setGpxFileUrl(post.gpxFileUrl);
    }
    if (post?.gpxFileData) {
      setGpxFileData(post.gpxFileData);
    }
    if (post?.introduction) {
      setIntroduction({
        content: post.introduction.content,
        imageUrl: post.introduction.imageUrl,
        altImage: post.introduction.altImage,
      });
    }
    if (post?.details) {
      setDetails({
        location: post.details.location,
        activityType: post.details.activityType,
        duration: post.details.duration,
        distance: post.details.distance,
        elevationGain: post.details.elevationGain,
        elevationLoss: post.details.elevationLoss,
        difficulty: post.details.difficulty,
      });
    }
    if (post?.sections) {
      setSections(
        post.sections.map((section) => {
          return {
            title: section.title,
            subSections: section.subSections.map((subSection) => {
              return {
                content: subSection.content,
                imageUrl: subSection.imageUrl,
                altImage: subSection.altImage,
              };
            }),
          };
        })
      );
    }
    if (post?.carousels) {
      setCarousels(
        post.carousels.map((carousel) => {
          return {
            title: carousel.title,
            slides: carousel.slides.map((slide) => {
              return {
                caption: slide.caption,
                imageUrl: slide.imageUrl,
              };
            }),
          };
        })
      );
    }
    if (post?.conclusion) {
      setConclusion(post.conclusion);
    }
    if (post?.author) {
      setAuthor(post.author);
    }
  }, [post]);

  if (loading) {
    return <Loader />;
  }

  const handleAddSection = (e) => {
    e.preventDefault();
    setSections([
      ...sections,
      {
        title: "",
        subSections: [
          {
            content: "",
            imageUrl: "",
            altImage: "",
          },
        ],
      },
    ]);
  };

  const handleAddSubSection = (e, sectionIndex) => {
    e.preventDefault();

    setSections(
      sections.map((section, i) => {
        if (i === sectionIndex) {
          return {
            ...section,
            subSections: [
              ...section.subSections,
              {
                content: "",
                imageUrl: "",
                altImage: "",
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const handleAddCarousel = (e) => {
    e.preventDefault();

    setCarousels([
      ...carousels,
      {
        title: "",
        slides: [
          {
            caption: "",
            imageUrl: "",
          },
        ],
      },
    ]);
  };

  const handleAddSlide = (e, carouselIndex) => {
    e.preventDefault();

    setCarousels(
      carousels.map((carousel, i) => {
        if (i === carouselIndex) {
          return {
            ...carousel,
            slides: [
              ...carousel.slides,
              {
                caption: "",
                imageUrl: "",
              },
            ],
          };
        }
        return carousel;
      })
    );
  };

  const handleDeleteSection = (e, sectionIndex) => {
    e.preventDefault();

    setSections(sections.filter((section, i) => i !== sectionIndex));
  };

  const handleDeleteSubSection = (e, sectionIndex, subSectionIndex) => {
    e.preventDefault();

    setSections(
      sections.map((section, i) => {
        if (i === sectionIndex) {
          return {
            ...section,
            subSections: section.subSections.filter(
              (subSection, j) => j !== subSectionIndex
            ),
          };
        }
        return section;
      })
    );
  };

  const handleDeleteCarousel = (e, carouselIndex) => {
    e.preventDefault();

    setCarousels(carousels.filter((carousel, i) => i !== carouselIndex));
  };

  const handleDeleteSlide = (e, carouselIndex, slideIndex) => {
    e.preventDefault();

    setCarousels(
      carousels.map((carousel, i) => {
        if (i === carouselIndex) {
          return {
            ...carousel,
            slides: carousel.slides.filter((slide, j) => j !== slideIndex),
          };
        }
        return carousel;
      })
    );
  };

  const handleSaveModification = (e) => {
    e.preventDefault();

    const post = {
      title,
      metaDescription,
      coverImageUrl,
      altImageCover,
      gpxFileUrl,
      gpxFileData,
      introduction,
      details,
      sections,
      carousels,
      conclusion,
      author,
    };

    dispatch(updatePost(params.id, post, token));

    setTitle("");
    setMetaDescription("");
    setCoverImageUrl("");
    setAltImageCover("");
    setGpxFileUrl("");
    setGpxFileData("");
    setIntroduction({
      content: "",
      imageUrl: "",
      altImage: "",
    });
    setDetails({
      location: "",
      activityType: "",
      duration: "",
      distance: "",
      elevationGain: "",
      elevationLoss: "",
      difficulty: "",
    });
    setSections([
      {
        title: "",
        subSections: [
          {
            content: "",
            imageUrl: "",
            altImage: "",
          },
        ],
      },
    ]);
    setCarousels([
      {
        title: "",
        slides: [
          {
            caption: "",
            imageUrl: "",
          },
        ],
      },
    ]);
    setConclusion("");
  };

  return (
    <div className="patch-page">
      <form onSubmit={handleSaveModification}>
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
            maxLength={160}
          />

          <label>Cover Image URL</label>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => {
              setCoverImageUrl(e.target.value);
            }}
          />
          <label>Cover Image Alt</label>
          <input
            type="text"
            value={altImageCover}
            onChange={(e) => {
              setAltImageCover(e.target.value);
            }}
          />
          <label>Lien du tracé GPX</label>
          <input
            type="text"
            value={gpxFileUrl}
            onChange={(e) => {
              setGpxFileUrl(e.target.value);
            }}
          />
          <label>Lien de téléchargement du tracé GPX</label>
          <input
            type="text"
            value={gpxFileData}
            onChange={(e) => {
              setGpxFileData(e.target.value);
            }}
          />
        </div>
        <div className="patch-page__container">
          <h3>Introduction</h3>
          <label>Contenu textuel</label>
          <textarea
            value={introduction.content}
            onChange={(e) => {
              setIntroduction({ ...introduction, content: e.target.value });
            }}
          />
          <label>Image introduction</label>
          <input
            type="text"
            value={introduction.imageUrl}
            onChange={(e) => {
              setIntroduction({ ...introduction, imageUrl: e.target.value });
            }}
          />
          <label>Alt image introduction</label>
          <input
            type="text"
            value={introduction.altImage}
            onChange={(e) => {
              setIntroduction({ ...introduction, altImage: e.target.value });
            }}
          />
        </div>
        <div className="patch-page__container">
          <h3>Détails</h3>
          <label>Localisation</label>
          <input
            type="text"
            value={details.location}
            onChange={(e) => {
              setDetails({ ...details, location: e.target.value });
            }}
          />
          <label>Type d&rsquo;activité</label>
          <input
            type="text"
            value={details.activityType}
            onChange={(e) => {
              setDetails({ ...details, activityType: e.target.value });
            }}
          />
          <label>Durée</label>
          <input
            type="text"
            value={details.duration}
            onChange={(e) => {
              setDetails({ ...details, duration: e.target.value });
            }}
          />
          <label>Distance</label>
          <input
            type="text"
            value={details.distance}
            onChange={(e) => {
              setDetails({ ...details, distance: e.target.value });
            }}
          />
          <label>Dénivelé Positif</label>
          <input
            type="text"
            value={details.elevationGain}
            onChange={(e) => {
              setDetails({ ...details, elevationGain: e.target.value });
            }}
          />
          <label>Dénivelé Négatif</label>
          <input
            type="text"
            value={details.elevationLoss}
            onChange={(e) => {
              setDetails({ ...details, elevationLoss: e.target.value });
            }}
          />
          <label>Difficulté</label>
          <input
            type="text"
            value={details.difficulty}
            onChange={(e) => {
              setDetails({ ...details, difficulty: e.target.value });
            }}
          />
        </div>
        <div className="patch-page__container">
          <h3>Section</h3>
          <button onClick={handleAddSection}>Ajouter une section</button>
          {sections?.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <button onClick={(e) => handleDeleteSection(e, 0)}>
                Supprimer la section
              </button>
              <label>Titre de la section</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => {
                  setSections(
                    sections.map((s, i) => {
                      if (i === sectionIndex) {
                        return { ...s, title: e.target.value };
                      }
                      return s;
                    })
                  );
                }}
              />
              {section.subSections.map((subSection, subSectionIndex) => (
                <div key={subSectionIndex}>
                  <button onClick={(e) => handleAddSubSection(e, sectionIndex)}>
                    Ajouter une sous-section
                  </button>
                  <button
                    onClick={(e) =>
                      handleDeleteSubSection(e, sectionIndex, subSectionIndex)
                    }
                  >
                    Supprimer la sous-section
                  </button>
                  <label>Contenu textuel</label>
                  <textarea
                    value={subSection.content}
                    onChange={(e) => {
                      setSections(
                        sections.map((s, i) => {
                          if (i === sectionIndex) {
                            return {
                              ...s,
                              subSections: s.subSections.map((ss, j) => {
                                if (j === subSectionIndex) {
                                  return { ...ss, content: e.target.value };
                                }
                                return ss;
                              }),
                            };
                          }
                          return s;
                        })
                      );
                    }}
                  />
                  <label>Image</label>
                  <input
                    type="text"
                    value={subSection.imageUrl}
                    onChange={(e) => {
                      setSections(
                        sections.map((s, i) => {
                          if (i === sectionIndex) {
                            return {
                              ...s,
                              subSections: s.subSections.map((ss, j) => {
                                if (j === subSectionIndex) {
                                  return { ...ss, imageUrl: e.target.value };
                                }
                                return ss;
                              }),
                            };
                          }
                          return s;
                        })
                      );
                    }}
                  />
                  <label>Alt image</label>
                  <input
                    type="text"
                    value={subSection.altImage}
                    onChange={(e) => {
                      setSections(
                        sections.map((s, i) => {
                          if (i === sectionIndex) {
                            return {
                              ...s,
                              subSections: s.subSections.map((ss, j) => {
                                if (j === subSectionIndex) {
                                  return { ...ss, altImage: e.target.value };
                                }
                                return ss;
                              }),
                            };
                          }
                          return s;
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
          <h3>Carousels</h3>
          <button onClick={handleAddCarousel}>Ajouter un carousel</button>
          {carousels?.map((carousel, carouselIndex) => (
            <div key={carouselIndex}>
              <button onClick={(e) => handleDeleteCarousel(e, carouselIndex)}>
                Supprimer le carousel
              </button>
              <label>Titre du carousel</label>
              <input
                type="text"
                value={carousel.title}
                onChange={(e) => {
                  setCarousels(
                    carousels.map((c, i) => {
                      if (i === carouselIndex) {
                        return { ...c, title: e.target.value };
                      }
                      return c;
                    })
                  );
                }}
              />
              {carousel.slides.map((slide, slideIndex) => (
                <div key={slideIndex}>
                  <button onClick={(e) => handleAddSlide(e, carouselIndex)}>
                    Ajouter une slide
                  </button>
                  <button
                    onClick={(e) =>
                      handleDeleteSlide(e, carouselIndex, slideIndex)
                    }
                  >
                    Supprimer la slide
                  </button>
                  <label>Titre de l&rsquo;image</label>
                  <input
                    type="text"
                    value={slide.caption}
                    onChange={(e) => {
                      setCarousels(
                        carousels.map((c, i) => {
                          if (i === carouselIndex) {
                            return {
                              ...c,
                              slides: c.slides.map((s, j) => {
                                if (j === slideIndex) {
                                  return { ...s, caption: e.target.value };
                                }
                                return s;
                              }),
                            };
                          }
                          return c;
                        })
                      );
                    }}
                  />
                  <label>Image</label>
                  <input
                    type="text"
                    value={slide.imageUrl}
                    onChange={(e) => {
                      setCarousels(
                        carousels.map((c, i) => {
                          if (i === carouselIndex) {
                            return {
                              ...c,
                              slides: c.slides.map((s, j) => {
                                if (j === slideIndex) {
                                  return { ...s, imageUrl: e.target.value };
                                }
                                return s;
                              }),
                            };
                          }
                          return c;
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
          <label>Contenu textuel</label>
          <textarea
            value={conclusion}
            onChange={(e) => {
              setConclusion(e.target.value);
            }}
          />
        </div>
        <div className="patch-page__container">
          <button type="submit">Enregistrer les modifications</button>
        </div>
      </form>
    </div>
  );
}

export default Page;
