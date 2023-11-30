"use client";

import PostCard from "@/components/PostCard/PostCard";
import "./ReviewsPages.scss";
import { useDispatch, useSelector } from "react-redux";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import {
  getFilteredReviews,
  getReviews,
  setCurrentReviewsPage,
} from "@/app/redux/actions/reviews.action";
import { useEffect, useRef, useState } from "react";
import PaginationComponent from "@/components/Paginate/Paginate";
import {
  setReviewsProductCategory,
  setReviewsProductSubCategory,
} from "@/app/redux/actions/filter.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const filterButtons = [
  {
    name: "Tous",
    filter: "Tous",
  },
  {
    name: "Chaussure",
    filter: "Chaussure",
  },
  {
    name: "Sac à dos",
    filter: "Sac à dos",
  },
  {
    name: "Tente",
    filter: "Tente",
  },
  {
    name: "Duvet",
    filter: "Duvet",
  },
  {
    name: "Réchaud",
    filter: "Réchaud",
  },
  {
    name: "Kit Popote",
    filter: "Kit Popote",
  },
  {
    name: "Matelas",
    filter: "Matelas",
  },
  {
    name: "Frontale",
    filter: "Frontale",
  },
  {
    name: "Filtre à eau",
    filter: "Filtre à eau",
  },
  {
    name: "Polaire",
    filter: "Polaire",
  },
  {
    name: "Veste imperméable",
    filter: "Veste imperméable",
  },
  {
    name: "Doudoune",
    filter: "Doudoune",
  },
  {
    name: "Pantalon",
    filter: "Pantalon",
  },
];

const equipmentFilter = [
  {
    name: "Sac à dos",
    filter: "Sac à dos",
  },
  {
    name: "Tente",
    filter: "Tente",
  },
  {
    name: "Duvet",
    filter: "Duvet",
  },
  {
    name: "Réchaud",
    filter: "Réchaud",
  },
  {
    name: "Kit Popote",
    filter: "Kit Popote",
  },
  {
    name: "Matelas",
    filter: "Matelas",
  },
];

const clothingFilter = [
  {
    name: "Chaussure",
    filter: "Chaussure",
  },
  {
    name: "Polaire",
    filter: "Polaire",
  },
  {
    name: "Veste imperméable",
    filter: "Veste imperméable",
  },
  {
    name: "Doudoune",
    filter: "Doudoune",
  },
  {
    name: "Pantalon",
    filter: "Pantalon",
  },
];

const accessoriesFilter = [
  {
    name: "Frontale",
    filter: "Frontale",
  },
  {
    name: "Filtre à eau",
    filter: "Filtre à eau",
  },
];

export default function PostsReviewsMateriel() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    if (!reviews.length) {
      dispatch(getReviews());
    }
  }, [dispatch, reviews]);

  const currentFilter = useSelector(
    (state) => state?.filter?.reviewsProductSubCategory
  );
  const customSelect = useRef(null);

  const handleShowMenu = () => {
    customSelect.current.classList.toggle("active");
  };

  const [equipementToggle, setEquipementToggle] = useState(false);
  const [clothingToggle, setClothingToggle] = useState(false);
  const [accessoriesToggle, setAccessoriesToggle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // Reset filter when page is loaded

  useEffect(() => {
    if (currentFilter === "") {
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
      dispatch(setCurrentReviewsPage(1));
      dispatch(getReviews());
    }
  }, [currentFilter, dispatch]);

  // Filter by category and subcategory for mobile

  const handleClickFilter = (filter) => {
    console.log(filter);

    if (filter === "Tous") {
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
      dispatch(getReviews());
    } else {
      dispatch(getFilteredReviews("", filter));
    }
    handleShowMenu();
  };

  // Reset filter when user click on "Tous" button

  const onClickFilterChange = (e) => {
    const filterName = e.target.textContent;

    if (filterName === "Tous") {
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
      dispatch(getReviews());
    }
  };

  // Toggle filter by category and subcategory for desktop

  const toggleEquipment = (e) => {
    setSelectedCategory("Equipements");
    setEquipementToggle((prevState) => !prevState);
    if (equipementToggle) {
      dispatch(getReviews());
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
    } else {
      dispatch(getFilteredReviews("Equipements"));
      setAccessoriesToggle(false);
      setClothingToggle(false);
    }
    setSelectedSubCategory("");
  };

  const toggleClothing = (e) => {
    setSelectedCategory("Vêtements");
    setClothingToggle((prevState) => !prevState);
    if (clothingToggle) {
      dispatch(getReviews());
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
    } else {
      dispatch(getFilteredReviews("Vêtements"));
      setAccessoriesToggle(false);
      setEquipementToggle(false);
    }
    setSelectedSubCategory("");
  };

  const toggleAccessories = () => {
    setSelectedCategory("Accessoires");
    setAccessoriesToggle((prevState) => !prevState);
    if (accessoriesToggle) {
      dispatch(getReviews());
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
    } else {
      dispatch(getFilteredReviews("Accessoires"));
      setClothingToggle(false);
      setEquipementToggle(false);
    }
    setSelectedSubCategory("");
  };

  // Filter by subcategory

  const onSubCategoryClick = (subCategoryName) => {
    setSelectedSubCategory(subCategoryName);
    dispatch(getFilteredReviews(selectedCategory, subCategoryName));
  };

  return (
    <>
      <div className="articles-layout">
        <div className="articles-layout__background">
          <h2>Retrouvez tous mes tests & avis matériel</h2>
        </div>
        <div className="articles">
          <div className="articles--container">
            {reviews &&
              reviews.map((review) => (
                <PostCard
                  key={review._id}
                  postTitle={review.title}
                  postContent={review.introduction?.content}
                  postImage={review.coverImageUrl}
                  postCategory={review.category}
                  postSubCategory={review.subCategory}
                  postUrl="reviews-materiel"
                  postId={review._id}
                  contentType="productReviews"
                />
              ))}
          </div>
          <div className="articles__filterPanel">
            <div className="articles__filterPanel__desktop">
              <h3>Filtrer par catégorie</h3>
              <div className="articles__filterPanel__desktop__container">
                <div className="articles__filterPanel__desktop__container--categoryBtn">
                  <button
                    className="articles__filterPanel__desktop__container--categoryBtn--btn"
                    onClick={onClickFilterChange}
                  >
                    Tous
                  </button>
                </div>
                <div className="articles__filterPanel__desktop__container--categoryBtn">
                  <button
                    className="articles__filterPanel__desktop__container--categoryBtn--btn"
                    onClick={toggleEquipment}
                  >
                    Equipements
                  </button>
                  <ul className="subCategory">
                    {equipementToggle &&
                      equipmentFilter.map((button) => (
                        <li
                          key={button.name}
                          className={`subCategory__item ${
                            selectedSubCategory === button.filter
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => onSubCategoryClick(button.filter)}
                        >
                          <button
                            className={
                              selectedSubCategory === button.filter
                                ? "selected"
                                : ""
                            }
                          >
                            {button.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="articles__filterPanel__desktop__container--categoryBtn">
                  <button
                    className="articles__filterPanel__desktop__container--categoryBtn--btn"
                    onClick={toggleClothing}
                  >
                    Vêtements
                  </button>
                  <ul className="subCategory">
                    {clothingToggle &&
                      clothingFilter.map((button) => (
                        <li
                          key={button.name}
                          className={`subCategory__item ${
                            selectedSubCategory === button.filter
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => onSubCategoryClick(button.filter)}
                        >
                          <button
                            className={
                              selectedSubCategory === button.filter
                                ? "selected"
                                : ""
                            }
                          >
                            {button.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="articles__filterPanel__desktop__container--categoryBtn">
                  <button
                    className="articles__filterPanel__desktop__container--categoryBtn--btn"
                    onClick={toggleAccessories}
                  >
                    Accessoires
                  </button>
                  <ul className="subCategory">
                    {accessoriesToggle &&
                      accessoriesFilter.map((button) => (
                        <li
                          key={button.name}
                          className={`subCategory__item ${
                            selectedSubCategory === button.filter
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => onSubCategoryClick(button.filter)}
                        >
                          <button
                            className={
                              selectedSubCategory === button.filter
                                ? "selected"
                                : ""
                            }
                          >
                            {button.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="newsletterPanel">
              <Newsletter />
            </div>
            <div className="socialMediaReview">
              <SocialMediaPanel />
            </div>
          </div>
        </div>
        <div className="articles-layout--rightPanel">
          <div className="filterPanel--mobile">
            <div className="dropdownMenu">
              <FontAwesomeIcon icon={faFilter} className="filter-ico" />
              <div className="dropdownMenu__custom-select" ref={customSelect}>
                <button
                  className="dropdownMenu__custom-select__select-button"
                  onClick={handleShowMenu}
                >
                  <span>{currentFilter ? `${currentFilter}` : "Tous"}</span>
                  <span className="dropdownMenu__custom-select__select-button--arrow"></span>
                </button>
                <ul className="dropdownMenu__custom-select--select-dropdown">
                  {filterButtons.map(({ name, filter }) => (
                    <li
                      key={name}
                      className={filter === currentFilter ? "selected" : ""}
                      onClick={() => handleClickFilter(filter)}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="articles-layout--pagination">
          <PaginationComponent contentType="productReviews" />
        </div>
      </div>
    </>
  );
}
