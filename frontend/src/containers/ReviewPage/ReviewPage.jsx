"use client";

import { useSelector } from "react-redux";
import "./ReviewPage.scss";
import { useEffect } from "react";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import SuggestReviewPanel from "@/components/SuggestReviewPanel/SuggestReviewPanel";
import Carousel from "@/components/Carousel/Carousel";
import Link from "next/link";
import Image from "next/image";
import RatingArticle from "@/components/RatingArticle/RatingArticle";
import CommentsSection from "../CommentsSection/CommentsSection";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import PostSectionIntro from "@/components/PostSectionIntro/PostSectionIntro";
import ReviewSpecTech from "@/components/ReviewSpecTech/ReviewSpecTech";
import ReviewPersonnalXp from "@/components/ReviewPersonnalXp/ReviewPersonnalXp";
import ReviewAdvantageDisadvantage from "@/components/ReviewAdvantageDisadvantage/ReviewAdvantageDisadvantage";
import ReviewRatingSection from "@/components/ReviewRatingSection/ReviewRatingSection";
import ReviewShopLink from "@/components/ReviewShopLink/ReviewShopLink";
import PostConclusion from "@/components/PostConclusion/PostConclusion";

export default function ReviewPage({ review, id }) {
  const { push } = useRouter();
  const error = useSelector((state) => state.reviews.error);

  useEffect(() => {
    if (error) {
      push("/404");
    }
  }, [error, push]);

  const loading = useSelector((state) => state.reviews.loading);

  if (loading) {
    return <Loader />;
  }

  const allImages =
    review.carousels?.flatMap((carousel) => carousel.slides) || [];

  return (
    <>
      <div className="review">
        <div className="review__container">
          <div className="review__container--img">
            <span className=""></span>
            {review?.coverImageUrl && (
              <Image
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
                src={review.coverImageUrl}
                alt={review.altImageCover}
                width={1920}
                height={1080}
                quality={90}
                sizes="100vw"
              />
            )}
            <h2>{review.title}</h2>
          </div>
          <div className="review__container__content">
            <div className="review__container__content__leftContent">
              <PostSectionIntro post={review} />
              <ReviewSpecTech review={review} />
              <ReviewPersonnalXp review={review} />
              <ReviewAdvantageDisadvantage review={review} />
              <PostConclusion post={review} />
              <ReviewRatingSection review={review} />
              <ReviewShopLink review={review} />
            </div>
            <div className="review__container__content__rightContent">
              <SuggestReviewPanel reviewId={id} />
              <Newsletter />
              <SocialMediaPanel />
            </div>
          </div>
        </div>
        <div className="review__carousel">
          <h3>{review.carouselsTitle}</h3>
          <Carousel images={allImages} />
        </div>
        <div className="review--author">
          <p>Posté par {review.author}</p>
          <p>Le {review.createdAt}</p>
          <Link href="/randonnee-trekking">Retour</Link>
        </div>
        <div className="review--rating">
          <RatingArticle contentType="productReview" articleId={id} />
        </div>
        <div className="review__container__commentsSection">
          <CommentsSection contentType="productReview" articleId={id} />
        </div>
      </div>
    </>
  );
}
