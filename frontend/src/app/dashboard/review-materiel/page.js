"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import Link from "next/link";
import "./review-materiel.scss";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "@/app/redux/actions/reviews.action";

function NewPostReviewMateriel() {
  const dispatch = useDispatch();

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const [techspecs, setTechspecs] = useState([]);
  const [advantagesDisadvantages, setAdvantagesDisadvantages] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [linksShops, setLinksShops] = useState([]);
  const [introduction, setIntroduction] = useState("");
  const [conclusion, setConclusion] = useState("");

  const titleRef = useRef(null);
  const metaDescriptionRef = useRef(null);
  const coverImageUrlRef = useRef(null);
  const altImageCoverRef = useRef(null);
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const introductionContentRef = useRef(null);
  const introductionImageUrlRef = useRef(null);
  const introductionAltImageUrlRef = useRef(null);
  const techspecsExplanationRef = useRef(null);
  const personalExperienceRef = useRef(null);
  const personalExperienceImageUrlRef = useRef(null);
  const personalExperienceAltImageUrlRef = useRef(null);
  const advantagesDisadvantagesExplanationRef = useRef(null);
  const carouselsTitle = useRef(null);
  const conclusionRef = useRef(null);
  const authorRef = useRef(null);

  function handleTechspecsAdd() {
    setTechspecs([...techspecs, { spec: "", tech: "" }]);
  }

  function handleAdvantagesDisadvantagesAdd() {
    setAdvantagesDisadvantages([
      ...advantagesDisadvantages,
      { advantage: "", disadvantage: "" },
    ]);
  }

  function handleRatingsAdd() {
    setRatings([...ratings, { name: "", rating: "" }]);
  }

  function handleCarouselsAdd() {
    setCarousels([...carousels, { slides: [{}] }]);
  }

  function handleSlidesAdd(index) {
    const newCarousels = [...carousels];
    newCarousels[index].slides.push({});
    setCarousels(newCarousels);
  }

  function handleLinksShopsAdd() {
    setLinksShops([...linksShops, { name: "", url: "" }]);
  }

  const handleChangeConclusion = (e) => {
    setConclusion(e.target.value);
  };

  const handleChangeIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  function sendPost(e) {
    e.preventDefault();

    const newReview = {
      title: titleRef.current?.value,
      metaDescription: metaDescriptionRef.current?.value,
      coverImageUrl: coverImageUrlRef.current?.value,
      altImageCover: altImageCoverRef.current?.value,
      category: categoryRef.current?.value,
      subCategory: subCategoryRef.current?.value,
      introduction: {
        content: introductionContentRef.current?.value,
        imageUrl: introductionImageUrlRef.current?.value,
        altImage: introductionAltImageUrlRef.current?.value,
      },
      techSpecs: techspecs,
      techSpecsExplanation: techspecsExplanationRef.current?.value,
      personalExperience: {
        content: personalExperienceRef.current?.value,
        imageUrl: personalExperienceImageUrlRef.current?.value,
        altImage: personalExperienceAltImageUrlRef.current?.value,
      },
      advantagesDisadvantages: advantagesDisadvantages,
      advantagesDisadvantagesExplanation:
        advantagesDisadvantagesExplanationRef.current?.value,
      conclusion: conclusionRef.current?.value,
      ratings: ratings,
      carouselsTitle: carouselsTitle.current?.value,
      carousels: carousels,
      linkShops: linksShops,
      author: authorRef.current?.value,
    };

    dispatch(createReview(newReview, token));

    titleRef.current.value = "";
    metaDescriptionRef.current.value = "";
    coverImageUrlRef.current.value = "";
    altImageCoverRef.current.value = "";
    introductionContentRef.current.value = "";
    introductionImageUrlRef.current.value = "";
    introductionAltImageUrlRef.current.value = "";
    techspecsExplanationRef.current.value = "";
    personalExperienceRef.current.value = "";
    personalExperienceImageUrlRef.current.value = "";
    personalExperienceAltImageUrlRef.current.value = "";
    advantagesDisadvantagesExplanationRef.current.value = "";
    carouselsTitle.current.value = "";
    conclusionRef.current.value = "";
    authorRef.current.value = "";
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
                  maxLength={160}
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
                Alt image de couverture:
                <input
                  type="text"
                  name="altImageCover"
                  required
                  ref={altImageCoverRef}
                  maxLength={140}
                />
              </label>
            </div>
          </div>
          <fieldset className="modal__form__details">
            <legend>Détails</legend>
            <label>
              Category:
              <select name="category" ref={categoryRef} required>
                <option value="Equipements">Equipements</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Accessoires">Accessoires</option>
              </select>
            </label>
            <label>
              Sous-category:
              <select name="subCategory" ref={subCategoryRef} required>
                <option value="Chaussure">Chaussure</option>
                <option value="Sac à dos">Sac à dos</option>
                <option value="Tente">Tente</option>
                <option value="Duvet">Duvet</option>
                <option value="Réchaud">Réchaud</option>
                <option value="Kit Popote">Kit Popote</option>
                <option value="Matelas">Matelas</option>
                <option value="Frontale">Frontale</option>
                <option value="Filtre à eau">Filtre à eau</option>
                <option value="Polaire">Polaire</option>
                <option value="Veste imperméable">Veste imperméable</option>
                <option value="Doudoune">Doudoune</option>
                <option value="Pantalon">Pantalon</option>
              </select>
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
              Alt image illustrtive:
              <input
                type="text"
                name="introduction.altImageUrl"
                ref={introductionAltImageUrlRef}
                required
                maxLength={140}
              />
            </label>
          </fieldset>
          <fieldset className="modal__form__techspecs">
            <legend>Fiche technique</legend>
            <label>
              Explication:
              <textarea
                name="techspecsExplanation"
                ref={techspecsExplanationRef}
                required
              ></textarea>
            </label>
            <div className="modal__form__techspecs__add">
              <button
                type="button"
                onClick={handleTechspecsAdd}
                className="modalAddButton"
              >
                Ajouter une ligne
              </button>
            </div>
            {techspecs.map((techspec, index) => (
              <div key={index} className="modal__form__techspecs__line">
                <label>
                  Spécification:
                  <input
                    type="text"
                    name={`techspecs[${index}].spec`}
                    onChange={(e) => {
                      const newTechspecs = [...techspecs];
                      newTechspecs[index].spec = e.target.value;
                      setTechspecs(newTechspecs);
                    }}
                    required
                  />
                </label>
                <label>
                  Valeur:
                  <input
                    type="text"
                    name={`techspecs[${index}].tech`}
                    onChange={(e) => {
                      const newTechspecs = [...techspecs];
                      newTechspecs[index].tech = e.target.value;
                      setTechspecs(newTechspecs);
                    }}
                    required
                  />
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="modal__form__personalExperience">
            <legend>Expérience personnelle</legend>
            <label>
              Contenu:
              <textarea
                name="personalExperience.content"
                ref={personalExperienceRef}
                required
              ></textarea>
            </label>
            <label>
              Image illustrtive:
              <input
                type="text"
                name="personalExperience.imageUrl"
                ref={personalExperienceImageUrlRef}
                required
              />
            </label>
            <label>
              Alt image illustrtive:
              <input
                type="text"
                name="personalExperience.altImageUrl"
                ref={personalExperienceAltImageUrlRef}
                required
                maxLength={140}
              />
            </label>
          </fieldset>
          <fieldset className="modal__form__advantagesDisadvantages">
            <legend>Avantages et inconvénients</legend>
            <label>
              Explication:
              <textarea
                name="advantagesDisadvantagesExplanation"
                ref={advantagesDisadvantagesExplanationRef}
                required
              ></textarea>
            </label>
            <div className="modal__form__advantagesDisadvantages__add">
              <button
                type="button"
                onClick={handleAdvantagesDisadvantagesAdd}
                className="modalAddButton"
              >
                Ajouter une ligne
              </button>
            </div>
            {advantagesDisadvantages.map((advantageDisadvantage, index) => (
              <div
                key={index}
                className="modal__form__advantagesDisadvantages__line"
              >
                <label>
                  Avantage:
                  <input
                    type="text"
                    name={`advantagesDisadvantages[${index}].advantage`}
                    onChange={(e) => {
                      const newAdvantagesDisadvantages = [
                        ...advantagesDisadvantages,
                      ];
                      newAdvantagesDisadvantages[index].advantage =
                        e.target.value;
                      setAdvantagesDisadvantages(newAdvantagesDisadvantages);
                    }}
                    required
                  />
                </label>
                <label>
                  Inconvénient:
                  <input
                    type="text"
                    name={`advantagesDisadvantages[${index}].disadvantage`}
                    onChange={(e) => {
                      const newAdvantagesDisadvantages = [
                        ...advantagesDisadvantages,
                      ];
                      newAdvantagesDisadvantages[index].disadvantage =
                        e.target.value;
                      setAdvantagesDisadvantages(newAdvantagesDisadvantages);
                    }}
                    required
                  />
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="modal__form__ratings">
            <legend>Notes</legend>
            <div className="modal__form__ratings__add">
              <button
                type="button"
                onClick={handleRatingsAdd}
                className="modalAddButton"
              >
                Ajouter une ligne
              </button>
            </div>
            {ratings.map((rating, index) => (
              <div key={index} className="modal__form__ratings__line">
                <label>
                  Nom:
                  <input
                    type="text"
                    name={`ratings[${index}].name`}
                    onChange={(e) => {
                      const newRatings = [...ratings];
                      newRatings[index].name = e.target.value;
                      setRatings(newRatings);
                    }}
                    required
                  />
                </label>
                <label>
                  Note:
                  <input
                    type="text"
                    name={`ratings[${index}].rating`}
                    onChange={(e) => {
                      const newRatings = [...ratings];
                      newRatings[index].rating = e.target.value;
                      setRatings(newRatings);
                    }}
                    required
                  />
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="modal__form__carousels">
            <legend>Carousels</legend>
            <label className="modal__form__carousels__title">
              Titre:
              <input
                type="text"
                name="carousels.title"
                ref={carouselsTitle}
                required
              />
            </label>
            <div className="modal__form__carousels__add">
              <button
                type="button"
                onClick={handleCarouselsAdd}
                className="modalAddButton"
              >
                Ajouter un carousel
              </button>
            </div>
            {carousels.map((carousel, carouselsIndex) => (
              <div
                key={carouselsIndex}
                className="modal__form__carousels__line"
              >
                <div className="modal__form__carousels__line__add">
                  <button
                    type="button"
                    onClick={() => handleSlidesAdd(carouselsIndex)}
                    className="modalAddButton"
                  >
                    Ajouter une slide
                  </button>
                </div>
                {carousel.slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="modal__form__carousels__line__slide"
                  >
                    <label>
                      Image:
                      <input
                        type="text"
                        name={`carousels[${carouselsIndex}].slides[${slideIndex}].imageUrl`}
                        onChange={(e) => {
                          const newCarousels = [...carousels];
                          newCarousels[carouselsIndex].slides[
                            slideIndex
                          ].imageUrl = e.target.value;
                          setCarousels(newCarousels);
                        }}
                        required
                      />
                    </label>
                    <label>
                      Légende:
                      <input
                        type="text"
                        name={`carousels[${carouselsIndex}].slides[${slideIndex}].caption`}
                        onChange={(e) => {
                          const newCarousels = [...carousels];
                          newCarousels[carouselsIndex].slides[
                            slideIndex
                          ].caption = e.target.value;
                          setCarousels(newCarousels);
                        }}
                        required
                      />
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </fieldset>
          <fieldset className="modal__form__linksShops">
            <legend>Liens vers les shops</legend>
            <div className="modal__form__linksShops__add">
              <button
                type="button"
                onClick={handleLinksShopsAdd}
                className="modalAddButton"
              >
                Ajouter une ligne
              </button>
            </div>
            {linksShops.map((linkShop, index) => (
              <div key={index} className="modal__form__linksShops__line">
                <label>
                  Nom:
                  <input
                    type="text"
                    name={`linksShops[${index}].name`}
                    onChange={(e) => {
                      const newLinksShops = [...linksShops];
                      newLinksShops[index].name = e.target.value;
                      setLinksShops(newLinksShops);
                    }}
                    required
                  />
                </label>
                <label>
                  Lien:
                  <input
                    type="text"
                    name={`linksShops[${index}].url`}
                    onChange={(e) => {
                      const newLinksShops = [...linksShops];
                      newLinksShops[index].url = e.target.value;
                      setLinksShops(newLinksShops);
                    }}
                    required
                  />
                </label>
              </div>
            ))}
          </fieldset>

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

export default NewPostReviewMateriel;
