import Link from "next/link";
import "./GreenButton.scss";
import PropTypes from "prop-types";

function GreenButton({ name, url }) {
  return (
    <Link href={url} className="green-button third">
      {name}
    </Link>
  );
}

GreenButton.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default GreenButton;
