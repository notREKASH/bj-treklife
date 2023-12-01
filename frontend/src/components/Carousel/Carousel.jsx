import PropTypes from "prop-types";
import "./Carousel.scss";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CarouselLib } from "react-responsive-carousel";

function Carousel({ images }) {
  return (
    <CarouselLib
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      useKeyboardArrows={true}
      dynamicHeight={true}
      autoPlay={true}
      interval={3000}
      className="carousel"
      swipeable={false}
    >
      {images.map((image) => (
        <div key={image._id} className="carousel__container">
          <Image
            className="carousel__container--image"
            style={{ objectFit: "contain" }}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            src={image.imageUrl}
            alt={image.caption}
            width={1920}
            height={1080}
            quality={100}
          />
          <Image
            className="carousel__container--backgroundImage"
            src={image.imageUrl}
            alt={image.caption}
            width={1920}
            height={10}
            quality={10}
          />
          <p className="legend">{image.caption}</p>
        </div>
      ))}
    </CarouselLib>
  );
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Carousel;
