"use client";

import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./randonnee-trekking.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "@/app/redux/actions/posts.action";

function NewPostRandonneeTrekking() {
  const dispatch = useDispatch();

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const [carousel, setCarousel] = useState([]);
  const [sections, setSections] = useState([]);
  const [conclusion, setConclusion] = useState("");
  const [introduction, setIntroduction] = useState("");

  const titleRef = useRef(null);
  const metaDescriptionRef = useRef(null);
  const coverImageUrlRef = useRef(null);
  const altImageCoverRef = useRef(null);
  const gpxFileUrlRef = useRef(null);
  const gpxFileDownload = useRef(null);
  const locationRef = useRef(null);
  const activityTypeRef = useRef(null);
  const durationRef = useRef(null);
  const distanceRef = useRef(null);
  const elevationGainRef = useRef(null);
  const elevationLossRef = useRef(null);
  const difficultyRef = useRef(null);
  const introductionContentRef = useRef(null);
  const introductionImageUrlRef = useRef(null);
  const introductionAltImageRef = useRef(null);
  const conclusionRef = useRef(null);
  const authorRef = useRef(null);

  function addCarousel() {
    setCarousel([...carousel, { slides: [{ caption: "", imageUrl: "" }] }]);
  }

  function addSlide(carouselIndex) {
    const newCarousel = [...carousel];
    newCarousel[carouselIndex].slides.push({ caption: "", imageUrl: "" });
    setCarousel(newCarousel);
  }

  function addSection() {
    setSections([
      ...sections,
      { title: "", subSections: [{ content: "", imageUrl: "", altImage: "" }] },
    ]);
  }

  const handleChangeConclusion = (e) => {
    setConclusion(e.target.value);
  };

  const handleChangeIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  function addSubSection(sectionIndex) {
    const newSections = [...sections];
    newSections[sectionIndex].subSections.push({
      content: "",
      imageUrl: "",
      altImage: "",
    });
    setSections(newSections);
  }

  function sendPost(e) {
    e.preventDefault();

    const newPost = {
      title: titleRef.current?.value,
      metaDescription: metaDescriptionRef.current?.value,
      coverImageUrl: coverImageUrlRef.current?.value,
      altImageCover: altImageCoverRef.current?.value,
      gpxFileUrl: gpxFileUrlRef.current?.value,
      gpxFileData: gpxFileDownload.current?.value,
      details: {
        location: locationRef.current?.value,
        activityType: activityTypeRef.current?.value,
        duration: durationRef.current?.value,
        distance: distanceRef.current?.value,
        elevationGain: elevationGainRef.current?.value,
        elevationLoss: elevationLossRef.current?.value,
        difficulty: difficultyRef.current?.value,
      },
      introduction: {
        content: introductionContentRef.current?.value,
        imageUrl: introductionImageUrlRef.current?.value,
        altImage: introductionAltImageRef.current?.value,
      },
      sections: sections,
      carousels: carousel,
      conclusion: conclusionRef.current?.value,
      author: authorRef.current?.value,
    };

    dispatch(createPost(newPost, token));
  }

  return (
    <div>
      <div className="modal">
        <Link href="/dashboard"> Retour </Link>
        <form className="modal__form">
          <div className="modal__form__primaryInformation">
            <h2>Information Primaire</h2>
            <div className="modal__form__primaryInformation--field">
              <label>
                Titre:
                <input type="text" name="title" required ref={titleRef} />
              </label>
              <label>
                Meta description:
                <input
                  type="text"
                  name="metaDescription"
                  required
                  ref={metaDescriptionRef}
                  maxLength="160"
                />
              </label>
              <label>
                Image de couverture:
                <input
                  type="text"
                  name="coverImageUrl"
                  required
                  ref={coverImageUrlRef}
                />
              </label>
              <label>
                Légende de l&rsquo;image:
                <input
                  type="text"
                  name="altImageCover"
                  required
                  ref={altImageCoverRef}
                  maxLength={140}
                />
              </label>
              <label>
                Tracé GPX:
                <input type="text" name="gpxFileUrl" ref={gpxFileUrlRef} />
              </label>
              <label>
                Télécharger le GPX:
                <input
                  type="text"
                  name="gpxFileDownload"
                  ref={gpxFileDownload}
                />
              </label>
            </div>
          </div>
          <fieldset className="modal__form__details">
            <legend>Détails</legend>
            <label>
              Localisation:
              <input
                type="text"
                name="details.location"
                ref={locationRef}
                required
              />
            </label>
            <label>
              Activité:
              <select
                name="details.activityType"
                ref={activityTypeRef}
                required
              >
                <option value="">Choisir une activité</option>
                <option value="trekking">Trekking</option>
                <option value="randonnée">Randonnée</option>
              </select>
            </label>
            <label>
              Durée en heures:
              <input
                type="number"
                name="details.duration"
                ref={durationRef}
                required
              />
            </label>
            <label>
              Distance en km:
              <input
                type="number"
                name="details.distance"
                ref={distanceRef}
                required
              />
            </label>
            <label>
              Dénivelé positif en m:
              <input
                type="number"
                name="details.elevationGain"
                ref={elevationGainRef}
                required
              />
            </label>
            <label>
              Dénivelé négatif en m:
              <input
                type="number"
                name="details.elevationLoss"
                ref={elevationLossRef}
                required
              />
            </label>
            <label>
              Difficulté sur 10:
              <input
                type="number"
                name="details.difficulty"
                ref={difficultyRef}
                required
              />
            </label>
          </fieldset>
          <fieldset className="modal__form__introduction">
            <legend>Introduction</legend>
            <label>
              Contenu:
              <textarea
                name="introduction.content"
                ref={introductionContentRef}
                required
                onChange={handleChangeIntroduction}
              ></textarea>
              <div className="markdown">
                <h5>Résultat</h5>
                <ReactMarkdown>{introduction}</ReactMarkdown>
              </div>
            </label>
            <label>
              Image illustrtive:
              <input
                type="text"
                name="introduction.imageUrl"
                ref={introductionImageUrlRef}
                required
              />
            </label>
            <label>
              Légende de l&rsquo;image:
              <input
                type="text"
                name="introduction.altImage"
                ref={introductionAltImageRef}
                required
                maxLength={140}
              />
            </label>
          </fieldset>
          {sections.map((section, sectionIndex) => (
            <fieldset
              key={`sections[${sectionIndex}]`}
              className="modal__form__sections"
            >
              <h3>Section {sectionIndex + 1}</h3>
              <label>
                Titre de la section:
                <input
                  type="text"
                  name={`sections[${sectionIndex}].title`}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[sectionIndex].title = e.target.value;
                    setSections(newSections);
                  }}
                />
              </label>
              {section.subSections.map((subSection, subSectionIndex) => (
                <div
                  key={`subSection-${subSectionIndex}`}
                  className="modal__form__sections--subSection"
                >
                  <h4>Sous-section {subSectionIndex + 1}</h4>
                  <label>
                    Contenu:
                    <textarea
                      name={`sections[${sectionIndex}].subSections[${subSectionIndex}].content`}
                      onChange={(e) => {
                        const newSections = [...sections];
                        newSections[sectionIndex].subSections[
                          subSectionIndex
                        ].content = e.target.value;
                        setSections(newSections);
                      }}
                      required
                    ></textarea>
                    <div className="markdown">
                      <h5>Résultat</h5>
                      <ReactMarkdown>
                        {
                          sections[sectionIndex].subSections[subSectionIndex]
                            .content
                        }
                      </ReactMarkdown>
                    </div>
                  </label>
                  <label>
                    Image:
                    <input
                      type="text"
                      name={`sections[${sectionIndex}].subSections[${subSectionIndex}].imageUrl`}
                      onChange={(e) => {
                        const newSections = [...sections];
                        newSections[sectionIndex].subSections[
                          subSectionIndex
                        ].imageUrl = e.target.value;
                        setSections(newSections);
                      }}
                      required
                    />
                  </label>
                  <label>
                    Légende de l&rsquo;image:
                    <input
                      type="text"
                      name={`sections[${sectionIndex}].subSections[${subSectionIndex}].altImage`}
                      onChange={(e) => {
                        const newSections = [...sections];
                        newSections[sectionIndex].subSections[
                          subSectionIndex
                        ].altImage = e.target.value;
                        setSections(newSections);
                      }}
                      required
                      maxLength={140}
                    />
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addSubSection(sectionIndex)}>
                Ajouter une sous-section
              </button>
            </fieldset>
          ))}
          <button type="button" onClick={addSection} className="modalAddButton">
            Ajouter une section
          </button>
          {carousel.map((singleCarousel, carouselIndex) => (
            <fieldset
              className="modal__form__carousel"
              key={`carousel-${carouselIndex}`}
            >
              <legend>Carousel {carouselIndex + 1}</legend>
              <label>
                Retrouvez les moments fort de/du:
                <input
                  type="text"
                  name={`carousel[${carouselIndex}].title`}
                  required
                />
              </label>
              {singleCarousel.slides.map((slide, slideIndex) => (
                <div
                  key={`slide-${slideIndex}`}
                  className="modal__form__carousel--slide"
                >
                  <h3>Slide {slideIndex + 1}</h3>
                  <label>
                    Légende:
                    <input
                      type="text"
                      name={`carousel-[${carouselIndex}].slides[${slideIndex}].caption`}
                      onChange={(e) => {
                        const newCarousel = [...carousel];
                        newCarousel[carouselIndex].slides[slideIndex].caption =
                          e.target.value;
                        setCarousel(newCarousel);
                      }}
                      required
                    />
                  </label>
                  <label>
                    Image:
                    <input
                      type="text"
                      name={`carousel[${carouselIndex}].slides[${slideIndex}].imageUrl`}
                      onChange={(e) => {
                        const newCarousel = [...carousel];
                        newCarousel[carouselIndex].slides[slideIndex].imageUrl =
                          e.target.value;
                        setCarousel(newCarousel);
                      }}
                      required
                    />
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addSlide(carouselIndex)}>
                Ajouter une slide
              </button>
            </fieldset>
          ))}
          <button
            type="button"
            onClick={addCarousel}
            className="modalAddButton"
          >
            Ajouter un carousel
          </button>
          <div className="modal__form__conclusion">
            <h3>Conclusion:</h3>
            <label>
              <textarea
                name="conclusion"
                ref={conclusionRef}
                required
                onChange={handleChangeConclusion}
              ></textarea>
              <div className="markdown">
                <h5>Résultat</h5>
                <ReactMarkdown>{conclusion}</ReactMarkdown>
              </div>
            </label>
          </div>
          <div className="modal__form__author">
            <h3>Auteur:</h3>
            <label>
              <input type="text" name="author" ref={authorRef} required />
            </label>
          </div>
          <button type="submit" onClick={sendPost} className="submitButton">
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPostRandonneeTrekking;
