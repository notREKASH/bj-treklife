"use client";
import Link from "next/link";
import "./PostCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  deletePost,
  getFilteredPosts,
  getPosts,
  setCurrentRandonneeTrekkingPage,
} from "@/app/redux/actions/posts.action";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReview,
  getFilteredReviews,
  getReviews,
  setCurrentReviewsPage,
} from "@/app/redux/actions/reviews.action";
import {
  setRandonneeTrekkingFilterName,
  setReviewsProductSubCategory,
} from "@/app/redux/actions/filter.actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostCard({
  postTitle,
  postContent,
  postImage,
  postCategory,
  postSubCategory,
  postUrl,
  postId,
  contentType,
}) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const id = postId;

  const token = sessionStorage.getItem("token");

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const handleClick = (e) => {
    const target = e.target;

    if (target.tagName === "BUTTON") {
      return;
    } else {
      e.preventDefault();
      e.stopPropagation();

      if (e.button === 1) {
        window.open(`/${postUrl}/${id}`, "_blank").focus();
      } else {
        push(`/${postUrl}/${id}`);
      }
    }
  };

  const handleChangeFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const filterName = e.target.textContent;

    if (contentType === "randonneeTrekking") {
      dispatch(setRandonneeTrekkingFilterName(filterName));
      dispatch(getFilteredPosts(postCategory));
    } else if (contentType === "productReviews") {
      dispatch(setReviewsProductSubCategory(filterName));
      dispatch(getFilteredReviews("", postSubCategory));
    }
  };

  const handleTryToDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = confirm("Voulez-vous vraiment supprimer cet article ?");
    if (result === true) {
      handleDeletePost();
    } else {
      handleCancelDelete();
    }
  };

  const handleDeletePost = () => {
    if (contentType === "randonneeTrekking") {
      dispatch(deletePost(id, token));
      dispatch(setCurrentRandonneeTrekkingPage(1));
      dispatch(getPosts());
    } else if (contentType === "productReviews") {
      dispatch(deleteReview(id, token));
      dispatch(setCurrentReviewsPage(1));
      dispatch(getReviews());
    }
  };

  const handleCancelDelete = () => {
    return null;
  };

  const reviewProductSubCategory = () => {
    if (postCategory && postSubCategory) {
      return postSubCategory;
    } else {
      return postCategory;
    }
  };

  return (
    <div className="post-card" onMouseDown={handleClick}>
      <div className="post-card__img">
        {postImage && (
          <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            src={postImage}
            alt={postTitle}
            width={500}
            height={500}
            quality={90}
          />
        )}
      </div>
      <div className="post-card__content">
        <h3>{postTitle}</h3>
        <p>
          {truncateText(postContent, 380)}
          <Link
            href={`/${postUrl}/${id}`}
            className="post-card__content--readMore"
          >
            Lire l&rsquo;article
          </Link>
        </p>
        <div className="post-card__content--tag">
          <button onClick={handleChangeFilter}>
            {reviewProductSubCategory()}
          </button>
        </div>
        {token ? (
          <div className="post-card__content--delete">
            <button onClick={handleTryToDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
