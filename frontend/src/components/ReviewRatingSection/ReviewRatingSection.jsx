import Rating from "../Rating/Rating";
import "./ReviewRatingSection.scss";

export default function ReviewRatingSection({ review }) {
  return (
    <div className="ratings">
      <div className="ratings--text">
        <h3>Evaluation</h3>
      </div>
      <div className="ratings--rating">
        {review.ratings?.map((rating, ratingIndex) => (
          <div key={`rating${ratingIndex}`} className="singleRating">
            <p>{rating.name}</p>
            <Rating ratingNumber={rating.rating} />
          </div>
        ))}
      </div>
    </div>
  );
}
