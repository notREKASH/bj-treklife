import "./Paginate.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredPosts,
  getPosts,
  setCurrentRandonneeTrekkingPage,
} from "@/app/redux/actions/posts.action";
import {
  getFilteredReviews,
  getReviews,
  setCurrentReviewsPage,
} from "@/app/redux/actions/reviews.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationComponent = ({ contentType }) => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) =>
    contentType === "randonneeTrekking"
      ? state.posts.currentPage
      : state.reviews.currentPage
  );

  const totalPages = useSelector((state) =>
    contentType === "randonneeTrekking"
      ? state.posts.totalPages
      : state.reviews.totalPages
  );

  const category = useSelector((state) =>
    contentType === "randonneeTrekking"
      ? state.filter.randonneeTrekking
      : state.filter.reviewsProductCategory
  );

  const subCategory = useSelector((state) =>
    // randonneeTrekkingSubCategory non concerné par la subCategory
    contentType === "reviewsProduct"
      ? ""
      : state.filter.reviewsProductSubCategory
  );

  const setPage = (newPage) => {
    if (contentType === "randonneeTrekking") {
      dispatch(setCurrentRandonneeTrekkingPage(newPage));
    } else {
      dispatch(setCurrentReviewsPage(newPage));
    }
    window.scrollTo(0, 0);
  };

  const fetchContent = (newPage) => {
    if (contentType === "randonneeTrekking") {
      dispatch(
        category ? getFilteredPosts(category, newPage) : getPosts(newPage)
      );
    } else {
      dispatch(
        category
          ? getFilteredReviews(category, subCategory, newPage)
          : getReviews(newPage)
      );
    }
    window.scrollTo(0, 0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchContent(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const renderPaginationItems = () => {
    let items = [];
    let leftSide = currentPage - 1;
    let rightSide = currentPage + 1;

    if (currentPage > 1) {
      items.push(
        <span
          key="prev"
          className="pagination__pages--page"
          onClick={handlePreviousPage}
          role="button"
          aria-label="page précédente"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
      );
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= leftSide && i <= rightSide)) {
        items.push(
          <span
            key={i}
            className={`pagination__pages--page ${
              currentPage === i ? "current-page" : ""
            }`}
            role="button"
            aria-label={`page ${i}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      } else if (i === leftSide - 1 || i === rightSide + 1) {
        items.push(
          <span key={i} className="pagination__pages--ellipsis">
            ...
          </span>
        );
      }
    }

    if (currentPage < totalPages) {
      items.push(
        <span
          key="next"
          className="pagination__pages--page"
          onClick={handleNextPage}
          role="button"
          aria-label="page suivante"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      );
    }

    return items;
  };

  if (totalPages <= 1) return null;

  return <div className="pagination">{renderPaginationItems()}</div>;
};

export default PaginationComponent;
