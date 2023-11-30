import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import "./Carousel.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function Carousel({ images }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleNextImage = () => {
    const isFirstImage = currentImageIdx === images.length - 1;
    const newIdx = isFirstImage ? 0 : currentImageIdx + 1;
    setCurrentImageIdx(newIdx);

    setTimeout(() => {
      setIsDragging(false);
    }, 500);
  };

  const handlePrevImage = () => {
    const isLastImage = currentImageIdx === 0;
    const newIdx = isLastImage ? images.length - 1 : currentImageIdx - 1;
    setCurrentImageIdx(newIdx);

    setTimeout(() => {
      setIsDragging(false);
    }, 500);
  };

  // Create touch events for slider

  const handleTouchStart = (e) => {
    if (isDragging) return;
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (isDragging) return;
    const touch = e.touches[0];
    const moveX = touch.clientX;
    const moveY = touch.clientY;
    const diffX = startX - moveX;
    const diffY = startY - moveY;
    const threshold = 50;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      setIsDragging(true);
      if (diffX > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  };

  return (
    <div
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="carousel__buttons">
        <button
          className="carousel__buttons--button leftBtn"
          onClick={handlePrevImage}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className="carousel__buttons--button rightBtn"
          onClick={handleNextImage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="carousel__image">
        {images.map((image, idx) => (
          <div
            key={image._id}
            className={`carousel__image--img ${
              idx === currentImageIdx ? "active" : ""
            }`}
          >
            <Image
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
              src={image.imageUrl}
              alt={image.caption}
              width={1920}
              height={1080}
              quality={100}
            />
            <Image
              className="backgroundImage"
              src={image.imageUrl}
              alt={image.caption}
              width={1920}
              height={1080}
              quality={10}
            />
            <p>{image.caption}</p>
          </div>
        ))}
      </div>
      <div className="carousel__dots">
        {images.map((image, idx) => (
          <div
            key={image._id}
            className={`carousel__dots--dot ${
              idx === currentImageIdx ? "active" : ""
            }`}
            onClick={() => setCurrentImageIdx(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Carousel;
