import "./SuggestionPanel.scss";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import Link from "next/link";
import { useEffect } from "react";
import {
  getReviews,
  getSpecificReview,
} from "@/app/redux/actions/reviews.action";
import Image from "next/image";

function SuggestReviewPanel({ reviewId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    if (reviews.length === 0) {
      dispatch(getReviews());
    } else {
      return;
    }
  }, [dispatch, reviews]);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="suggestionPanel">
      <h2>Découvrez les dernières reviews de matériel</h2>
      <div className="suggestionPanel__container">
        {reviews
          .filter((review) => review._id !== reviewId)
          .slice(0, 7)
          .map((review) => (
            <div key={review._id}>
              <Link
                href={`/reviews-materiel/${review._id}`}
                className="suggestionPanel__container__card"
              >
                {review?.coverImageUrl && (
                  <Image
                    src={review.coverImageUrl}
                    alt={review.coverImageAlt}
                    width={200}
                    height={200}
                    quality={100}
                  />
                )}
                <div className="suggestionPanel__container__card--text">
                  <h3>{review.title}</h3>
                  <p>{truncateText(review.introduction.content, 120)}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

SuggestReviewPanel.propTypes = {
  articleCategory: PropTypes.string,
};

export default SuggestReviewPanel;
