import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ImageFullscreen.scss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { faExpand, faX } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function ImageFullscreen({ src, alt }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    if (isFullScreen) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  }, [isFullScreen]);

  return (
    <>
      <div>
        <FontAwesomeIcon
          icon={faExpand}
          className="full-screen-ico"
          onClick={toggleFullScreen}
        />
      </div>
      <div className={`full-screen-bg ${isFullScreen ? "active" : ""}`}>
        <div className="close-screen">
          <FontAwesomeIcon
            icon={faX}
            className="close-screen-ico"
            onClick={toggleFullScreen}
          />
        </div>
        <div className="full-screen">
          <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            quality={100}
          />
        </div>
      </div>
    </>
  );
}

export default ImageFullscreen;
