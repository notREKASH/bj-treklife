import "./SectionTag.scss";
import PropTypes from "prop-types";

function SectionTag({ name }) {
  return (
    <div className="sectionTag">
      <h2>{name}</h2>
    </div>
  );
}

SectionTag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SectionTag;
