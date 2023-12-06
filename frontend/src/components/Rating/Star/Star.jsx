import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function Star({ filled, halfFilled }) {
  const starStyle = {
    color: filled ? "gold" : "black",
  };

  const halfStarStyle = {
    position: "relative",
    display: "inline-block",
  };

  const halfStarInnerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    overflow: "hidden",
  };

  const halfStarFillStyle = {
    color: halfFilled ? "gold" : "gray",
  };

  return (
    <div style={halfFilled ? halfStarStyle : starStyle}>
      <FontAwesomeIcon icon={faStar} />
      {halfFilled && (
        <div style={halfStarInnerStyle}>
          <FontAwesomeIcon icon={faStarHalfAlt} style={halfStarFillStyle} />
        </div>
      )}
    </div>
  );
}

Star.propTypes = {
  filled: PropTypes.bool,
  halfFilled: PropTypes.bool,
};

export default Star;
