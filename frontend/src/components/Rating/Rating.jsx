import Star from "./Star/Star";
import PropTypes from "prop-types";
import "./Rating.scss";

function Rating({ ratingNumber }) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (ratingNumber >= i + 1) {
      stars.push(<Star key={i} filled />);
    } else if (ratingNumber >= i + 0.5) {
      stars.push(<Star key={i} halfFilled />);
    } else {
      stars.push(<Star key={i} />);
    }
  }

  return <div className="rating">{stars}</div>;
}

Rating.propTypes = {
  ratingNumber: PropTypes.number.isRequired,
};

export default Rating;
