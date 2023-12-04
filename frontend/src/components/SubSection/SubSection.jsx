import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import "./SubSection.scss";
import ImageFullscreen from "../ImageFullscreen/ImageFullscreen";
import Image from "next/image";

function SubSection({ title, content, imageUrl, altImage }) {
  return (
    <div className="subSection">
      <div className="subSection__text">
        <h3>{title}</h3>
        <ReactMarkdown components={{ p: "p" }}>{content}</ReactMarkdown>
      </div>
      <div className="subSection__image">
        {imageUrl && (
          <Image
            className="subSection__image--img"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            src={imageUrl}
            alt={altImage}
            width={1920}
            height={1080}
            quality={100}
          />
        )}
        {imageUrl && (
          <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            className="backgroundImage"
            src={imageUrl}
            alt={title}
            width={1920}
            height={1080}
            quality={10}
          />
        )}
        <ImageFullscreen src={imageUrl} alt={altImage} />
      </div>
    </div>
  );
}

SubSection.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  altImage: PropTypes.string,
};

export default SubSection;
