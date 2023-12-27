"use client";

import axios from "axios";
import "./RatingArticle.scss";
import { useEffect, useState } from "react";

export default function RatingArticle({ contentType, articleId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const ratingValue = localStorage.getItem(`rating-${articleId}`);
    if (ratingValue) {
      setRating(parseInt(ratingValue, 10));
    }
  }, [articleId]);

  const handleRating = (index) => {
    setRating(index);

    try {
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${articleId}/ratings`,
        {
          rating: index,
        }
      );
      localStorage.setItem(`rating-${articleId}`, index);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => handleRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}>
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}
