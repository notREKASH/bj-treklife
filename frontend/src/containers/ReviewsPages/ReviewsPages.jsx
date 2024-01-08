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
import { useRouter } from "next/navigation";

const filterButtons = [
  {
    name: "Tous",
    filter: "Tous",
  },
  {
    name: "Equipements",
    filter: "Equipements",
  },
  {
    name: "Vêtements",
    filter: "Vêtements",
  },
  // {
  //   name: "Accessoires",
  //   filter: "Accessoires",
  // },
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

export default function PostsReviewsMateriel({ reviews, filterName }) {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const [currentFilter, setCurrentFilter] = useState(null);
  const [equipementToggle, setEquipementToggle] = useState(false);
  const [clothingToggle, setClothingToggle] = useState(false);
  const [accessoriesToggle, setAccessoriesToggle] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  console.log(selectedSubCategory);

  const toggleSubCategory = (filter) => {
    if (filter === "Equipements") {
      setSelectedSubCategory(!selectedSubCategory);
    } else if (filter === "Vêtements") {
      setSelectedSubCategory(!selectedSubCategory);
    } else if (filter === "Accessoires") {
      setSelectedSubCategory(!selectedSubCategory);
    } else {
      setSelectedSubCategory(null);
    }
  };

  useEffect(() => {
    if (filterName) {
      if (filterName === "Equipements") {
        setEquipementToggle(true);
      } else if (filterName === "Vêtements") {
        setClothingToggle(true);
      } else if (filterName === "Accessoires") {
        setAccessoriesToggle(true);
      } else if (filterName === "Tous") {
        setEquipementToggle(false);
        setClothingToggle(false);
        setAccessoriesToggle(false);
      }
    }
  }, [filterName]);

  const customSelect = useRef(null);

  const handleShowMenu = () => {
    customSelect.current.classList.toggle("active");
  };

  const handleClickFilter = (filter) => {
    setCurrentFilter(filter);
    handleFilter(filter);
    updateFilter(filter);
  };

  const updateFilter = (filter) => {
    dispatch(setReviewsProductCategory(filter));
  };

  const handleFilter = (category, subCategory) => {
    if (category === "Tous") {
      push("/reviews-materiel");
    } else if (
      (category === "Equipements" && subCategory) ||
      (category === "Vêtements" && subCategory) ||
      (category === "Accessoires" && subCategory)
    ) {
      push(
        `/reviews-materiel/categorie/${category}&subCategory=${subCategory}`
      );
    } else {
      push(`/reviews-materiel/categorie/${category}`);
    }
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
                {filterButtons.map((button, index) => (
                  <div
                    key={button.name}
                    className="articles__filterPanel__desktop__container--categoryBtn">
                    <button
                      className="articles__filterPanel__desktop__container--categoryBtn--btn"
                      onClick={() => {
                        setCurrentFilter(button.filter);
                        handleFilter(button.filter);
                        toggleSubCategory(button.filter);
                      }}>
                      {button.name}
                    </button>
                    <ul className="subCategory">
                      {button.filter === "Equipements" &&
                        equipementToggle &&
                        equipmentFilter.map((equipment) => (
                          <li
                            key={equipment.name}
                            className={`subCategory__item ${
                              selectedSubCategory === equipment.name
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              setCurrentFilter(equipment.filter);
                              handleFilter("Equipements", equipment.filter);
                            }}>
                            <button
                              className={
                                selectedSubCategory === button.filter
                                  ? "selected"
                                  : ""
                              }>
                              {equipment.name}
                            </button>
                          </li>
                        ))}
                      {button.filter === "Vêtements" &&
                        clothingToggle &&
                        clothingFilter.map((clothing) => (
                          <li
                            key={clothing.name}
                            className={`subCategory__item ${
                              selectedSubCategory === button.filter
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              setCurrentFilter(clothing.filter);
                              handleFilter("Vêtements", clothing.filter);
                            }}>
                            <button
                              className={
                                selectedSubCategory === button.filter
                                  ? "selected"
                                  : ""
                              }>
                              {clothing.name}
                            </button>
                          </li>
                        ))}
                      {/* {button.filter === "Accessoires" &&
                        accessoriesFilter.map((accessory) => (
                          <li
                            key={accessory.name}
                            onClick={() => {
                              setCurrentFilter(accessory.filter);
                              handleFilter(accessory.filter);
                            }}>
                            {accessory.name}
                          </li>
                        ))} */}
                    </ul>
                  </div>
                ))}
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
                  onClick={handleShowMenu}>
                  <span>{filterName ? `${filterName}` : "Tous"}</span>
                  <span className="dropdownMenu__custom-select__select-button--arrow"></span>
                </button>
                <ul className="dropdownMenu__custom-select--select-dropdown">
                  {filterButtons.map(({ name, filter }) => (
                    <li
                      key={name}
                      className={filter === currentFilter ? "selected" : ""}
                      onClick={() => handleClickFilter(filter)}>
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
