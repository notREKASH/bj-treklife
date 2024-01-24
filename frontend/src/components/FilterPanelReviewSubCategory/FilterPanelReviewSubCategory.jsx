import { useState } from "react";
import "./FilterPanelReviewSubCategory.scss";
import { useDispatch } from "react-redux";
import { getFilteredReviews } from "@/app/redux/actions/reviews.action";
import {
  setRandonneeTrekkingFilterName,
  setReviewsProductCategory,
  setReviewsProductFilterName,
  setReviewsProductSubCategory,
} from "@/app/redux/actions/filter.actions";

export default function FilterPanelReviewSubCategory({ subCategoryFilter }) {
  const dispatch = useDispatch();
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const onSubCategoryClick = (filter) => {
    dispatch(setReviewsProductFilterName(filter));
    dispatch(setReviewsProductCategory(""));
    dispatch(setReviewsProductSubCategory(filter));
    dispatch(setRandonneeTrekkingFilterName(""));
    setSelectedSubCategory(filter);
    dispatch(getFilteredReviews("", filter));
  };

  return (
    <ul className="subCategory">
      {subCategoryFilter.map((button) => (
        <li
          key={button.name}
          className={`subCategory__item ${
            selectedSubCategory === button.filter ? "selected" : ""
          }`}
          onClick={() => onSubCategoryClick(button.filter)}>
          <button
            className={selectedSubCategory === button.filter ? "selected" : ""}>
            {button.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
