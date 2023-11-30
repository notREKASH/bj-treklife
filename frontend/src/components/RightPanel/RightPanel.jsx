import "./RightPanel.scss";
import PropTypes from "prop-types";
import Newsletter from "../Newsletter/Newsletter";
import SocialMediaPanel from "../SocialMediaPanel/SocialMediaPanel";

function RightPanel({ onFilterChange, filterButtons }) {
  return (
    <>
      <div className="filterPanel">
        <h3>Filtrer par catégorie</h3>
        <ul className="filterPanel__ul">
          {filterButtons.map((button) => (
            <li key={button.name}>
              <button onClick={() => onFilterChange(button.filter)}>
                {button.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="newsletterPanel">
        <Newsletter />
      </div>
      <div>
        <SocialMediaPanel />
      </div>
    </>
  );
}

RightPanel.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filterButtons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      filter: PropTypes.string,
    })
  ).isRequired,
};

RightPanel.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filterButtons: PropTypes.array.isRequired,
};

export default RightPanel;
