import FilterPanelReviewSubCategory from "../FilterPanelReviewSubCategory/FilterPanelReviewSubCategory";
import "./FilterPanelReviewCategory.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredReviews,
  getReviews,
} from "@/app/redux/actions/reviews.action";
import { useEffect, useState } from "react";
import {
  setRandonneeTrekkingFilterName,
  setReviewsProductCategory,
  setReviewsProductSubCategory,
} from "@/app/redux/actions/filter.actions";

export default function FilterPanelReviewCategory({
  categoryName,
  subCategoryFilter,
}) {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(false);
  const reviews = useSelector((state) => state.reviews.reviews);
  const currentFilter = useSelector(
    (state) => state.filter.reviewsProductCategory
  );

  useEffect(() => {
    if (!reviews.length) {
      dispatch(getReviews());
    } else if (currentFilter !== categoryName) {
      setSelectedCategory(false);
    }
  }, [dispatch, reviews, categoryName, currentFilter]);

  const onClickFilterChange = (e) => {
    const filterName = e.target.textContent;

    if (filterName === "Tous" || selectedCategory) {
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
      dispatch(setRandonneeTrekkingFilterName(""));
      dispatch(getReviews());
      setSelectedCategory(false);
    } else if (filterName !== "Tous") {
      dispatch(setReviewsProductCategory(filterName));
      dispatch(getFilteredReviews(filterName));
      dispatch(setReviewsProductSubCategory(""));
      setSelectedCategory(true);
    }
  };

  return (
    <div className="articles__filterPanel__desktop__container--categoryBtn">
      <button
        className="articles__filterPanel__desktop__container--categoryBtn--btn"
        onClick={(e) => {
          onClickFilterChange(e);
        }}>
        {categoryName}
      </button>
      {subCategoryFilter && selectedCategory && (
        <FilterPanelReviewSubCategory subCategoryFilter={subCategoryFilter} />
      )}
    </div>
  );
}
