import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./FilterPanelMobile.scss";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFilteredPosts, getPosts } from "@/app/redux/actions/posts.action";
import {
  setRandonneeTrekkingFilterName,
  setReviewsProductCategory,
  setReviewsProductSubCategory,
} from "@/app/redux/actions/filter.actions";
import {
  getFilteredReviews,
  getReviews,
} from "@/app/redux/actions/reviews.action";

export default function FilterPanelMobile({ filterButtons, pageName }) {
  const dispatch = useDispatch();

  const customSelect = useRef(null);

  const handleShowMenu = () => {
    customSelect.current.classList.toggle("active");
  };

  const currentFilter = useSelector((state) =>
    pageName === "randonneeTrekking"
      ? state?.filter?.randonneeTrekking
      : state?.filter?.reviewsProductSubCategory
  );

  const handleClickFilter = (filter) => {
    if (pageName === "randonneeTrekking") {
      if (filter === "tous") {
        dispatch(getPosts());
      } else {
        dispatch(setRandonneeTrekkingFilterName(filter));
        dispatch(getFilteredPosts(filter));
      }
    } else if (pageName === "reviewsProductSubCategory") {
      if (filter === "Tous") {
        dispatch(setReviewsProductCategory(""));
        dispatch(setReviewsProductSubCategory(""));
        dispatch(getReviews());
      } else {
        dispatch(getFilteredReviews("", filter));
      }
    }
    handleShowMenu();
  };

  return (
    <div className="filterPanel">
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
  );
}
