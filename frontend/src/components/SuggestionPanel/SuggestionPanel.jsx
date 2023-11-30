import "./SuggestionPanel.scss";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import Link from "next/link";
import { useEffect } from "react";
import { getPosts } from "@/app/redux/actions/posts.action";
import Image from "next/image";

function SuggestionPanel({ articleCategory, articleId }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPosts());
    } else {
      return;
    }
  }, [dispatch, posts]);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const categoryNames = {
    randonnée: "la randonnée",
    trekking: "le trekking",
    alpinisme: "l'alpinisme",
    voyage: "le voyage",
  };

  return (
    <div className="suggestionPanel">
      <h2>
        Retrouvez les articles similaires sur {categoryNames[articleCategory]}
      </h2>
      <div className="suggestionPanel__container">
        {posts
          .filter(
            (post) =>
              post._id !== articleId &&
              post.details.activityType === articleCategory
          )
          .slice(0, 7)
          .map((post) => (
            <div key={post._id}>
              <Link
                href={`/randonnee-trekking/${post._id}`}
                className="suggestionPanel__container__card"
              >
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  width={200}
                  height={200}
                  quality={100}
                />
                <div className="suggestionPanel__container__card--text">
                  <h3>{post.title}</h3>
                  <p>{truncateText(post.introduction.content, 120)}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

SuggestionPanel.propTypes = {
  articleCategory: PropTypes.string,
};

export default SuggestionPanel;
