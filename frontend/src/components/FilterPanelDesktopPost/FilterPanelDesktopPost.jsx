import { useDispatch, useSelector } from "react-redux";
import "./FilterPanelDesktopPost.scss";
import { useState, useEffect } from "react";
import { getFilteredPosts, getPosts } from "@/app/redux/actions/posts.action";
import { setRandonneeTrekkingFilterName } from "@/app/redux/actions/filter.actions";
import { setCurrentRandonneeTrekkingPage } from "@/app/redux/actions/posts.action";
import { setReviewsProductCategory } from "@/app/redux/actions/filter.actions";
import { setReviewsProductSubCategory } from "@/app/redux/actions/filter.actions";
import { getReviews } from "@/app/redux/actions/reviews.action";

export default function FilterPanelDesktopPost({ filterButtons }) {
  const dispatch = useDispatch();
  const [selectedButtons, setSelectedButtons] = useState([]);

  const currentFilter = useSelector(
    (state) => state?.filter?.randonneeTrekking
  );

  useEffect(() => {
    dispatch(setReviewsProductCategory(""));
    dispatch(setReviewsProductSubCategory(""));
    dispatch(setRandonneeTrekkingFilterName(""));
    dispatch(getPosts());
  }, [dispatch]);

  const onClickFilterChange = (e) => {
    const filterName = e.target.textContent;
    const filterNameLowerCase = filterName.toLowerCase();
    if (currentFilter === "tous") {
      dispatch(setReviewsProductCategory(""));
      dispatch(setReviewsProductSubCategory(""));
      dispatch(setRandonneeTrekkingFilterName(""));
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
    <div className="desktop">
      <h3>Filtrer par catégorie</h3>
      <ul className="desktop__ul" onClick={onClickFilterChange}>
        {filterButtons.map((button, index) => (
          <li key={button.name}>
            <button
              onClick={() => handleButtonClick(button.name)}
              className={selectedButtons[button.name] ? "selected" : ""}>
              {button.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
