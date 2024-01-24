import "./ReviewPersonnalXp.scss";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ImageFullscreen from "@/components/ImageFullscreen/ImageFullscreen";

export default function ReviewPersonnalXp({ review }) {
  return (
    <div className="personalExperience">
      <div className="personalExperience--text">
        <h3>Expérience personnelle</h3>
        <ReactMarkdown components={{ p: "p" }}>
          {review.personalExperience?.content}
        </ReactMarkdown>
      </div>
      <div className="personalExperience--image">
        {review.personalExperience?.imageUrl && (
          <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            className="personalExperience--image--img"
            src={review.personalExperience?.imageUrl}
            alt={review.personalExperience?.altImage}
            width={1920}
            height={1080}
            quality={90}
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        )}
        {review.personalExperience?.imageUrl && (
          <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            className="backgroundImage"
            src={review.personalExperience?.imageUrl}
            alt={review.personalExperience?.altImage}
            width={1920}
            height={1080}
            quality={1}
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        )}
        {review.personalExperience?.imageUrl && (
          <ImageFullscreen
            src={review.personalExperience?.imageUrl}
            alt={review.personalExperience?.altImage}
          />
        )}
      </div>
    </div>
  );
}
