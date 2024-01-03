"use client";

import PostCard from "@/components/PostCard/PostCard";
import "./ArticlesPages.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredPosts,
  getPosts,
  setCurrentRandonneeTrekkingPage,
} from "@/app/redux/actions/posts.action";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import PaginationComponent from "@/components/Paginate/Paginate";
import { useEffect, useRef, useState } from "react";
import {
  setRandonneeTrekkingFilterName,
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
    name: "Randonnée",
    filter: "randonnée",
  },
  {
    name: "Trekking",
    filter: "trekking",
  },
];

export default function ArticlesRandonneeTrek() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts());
    }
  }, [dispatch, posts]);

  const [selectedButtons, setSelectedButtons] = useState([]);

  const currentFilter = useSelector(
    (state) => state?.filter?.randonneeTrekking
  );

  const customSelect = useRef(null);

  const handleShowMenu = () => {
    customSelect.current.classList.toggle("active");
  };

  // Reset filter when changing page

  useEffect(() => {
    if (currentFilter === "tous" || currentFilter === "") {
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
      dispatch(setRandonneeTrekkingFilterName(""));
      dispatch(setCurrentRandonneeTrekkingPage(1));
      dispatch(getPosts());
    }
  }, [currentFilter, dispatch]);

  // Filter by category for desktop

  const handleClickFilter = (filter) => {
    const filterNameLowerCase = filter.toLowerCase();

    if (filterNameLowerCase === "tous" || filterNameLowerCase === "") {
      dispatch(getPosts());
      dispatch(setRandonneeTrekkingFilterName(""));
    } else {
      dispatch(setRandonneeTrekkingFilterName(filterNameLowerCase));
      dispatch(getFilteredPosts(filterNameLowerCase));
    }
    handleShowMenu();
  };

  // Filter by category for mobile

  const onClickFilterChange = (e) => {
    const filterName = e.target.textContent;
    const filterNameLowerCase = filterName.toLowerCase();
    if (currentFilter === "tous") {
      dispatch(getPosts());
    } else {
      dispatch(setRandonneeTrekkingFilterName(filterNameLowerCase));
      dispatch(getFilteredPosts(filterNameLowerCase));
    }
  };

  // Change button color when selected

  const handleButtonClick = (buttonName) => {
    setSelectedButtons({
      [buttonName]: !selectedButtons[buttonName],
    });
  };

  return (
    <>
      <div className="articles-layout">
        <div className="articles-layout__background">
          <h2>Retrouvez toutes mes sorties</h2>
        </div>
        <div className="articles">
          <div className="articles--container">
            {posts &&
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  postTitle={post.title}
                  postContent={post.introduction?.content}
                  postImage={post.coverImageUrl}
                  postCategory={post.details?.activityType}
                  postUrl="randonnee-trekking"
                  postId={post._id}
                  contentType="randonneeTrekking"
                />
              ))}
          </div>
          <div className="articles__filterPanel">
            <div className="articles__filterPanel--desktop">
              <h3>Filtrer par catégorie</h3>
              <ul
                className="articles__filterPanel--desktop__ul"
                onClick={onClickFilterChange}>
                {filterButtons.map((button, index) => (
                  <li key={button.name}>
                    <button
                      onClick={() => handleButtonClick(button.name)}
                      className={
                        selectedButtons[button.name] ? "selected" : ""
                      }>
                      {button.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="newsletterPanel">
              <Newsletter />
            </div>
            <div className="socialMediaRando">
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
                  <span>{currentFilter ? `${currentFilter}` : "tous"}</span>
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
          <PaginationComponent contentType="randonneeTrekking" />
        </div>
      </div>
    </>
  );
}
