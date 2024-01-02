"use client";

import { useSelector } from "react-redux";
import "./ReviewPage.scss";
import { useEffect } from "react";
import Rating from "@/components/Rating/Rating";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import SuggestReviewPanel from "@/components/SuggestReviewPanel/SuggestReviewPanel";
import Carousel from "@/components/Carousel/Carousel";
import ImageFullscreen from "@/components/ImageFullscreen/ImageFullscreen";
import Link from "next/link";
import Image from "next/image";
import RatingArticle from "@/components/RatingArticle/RatingArticle";
import CommentsSection from "../CommentsSection/CommentsSection";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import ReactMarkdown from "react-markdown";

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
              <div className="review__container__content__leftContent__introduction">
                <div className="review__container__content__leftContent__introduction--text">
                  <h3>Introduction</h3>
                  <ReactMarkdown components={{ p: "p" }}>
                    {review.introduction?.content}
                  </ReactMarkdown>
                </div>
                <div className="review__container__content__leftContent__introduction--image">
                  {review.introduction?.imageUrl && (
                    <Image
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
                      className="review__container__content__leftContent__introduction--image--img"
                      src={review.introduction?.imageUrl}
                      alt={review.introduction?.altImage}
                      width={1920}
                      height={1080}
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  )}
                  {review.introduction?.imageUrl && (
                    <Image
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
                      className="backgroundImage"
                      src={review.introduction?.imageUrl}
                      alt={review.introduction?.altImage}
                      width={1920}
                      height={1080}
                      quality={1}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  )}
                  {review.introduction?.imageUrl && (
                    <ImageFullscreen
                      src={review.introduction?.imageUrl}
                      alt={review.introduction?.altImage}
                    />
                  )}
                </div>
              </div>
              <div className="review__container__content__leftContent__specTech">
                <div className="review__container__content__leftContent__specTech--text">
                  <h3>Caractéristique techniques</h3>
                  <p>{review.techSpecsExplanation}</p>
                </div>
                <table className="review__container__content__leftContent__specTech--table">
                  <thead>
                    <tr>
                      <th>Désignation</th>
                      <th>Valeur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {review.techSpecs?.map((spec, specIndex) => (
                      <tr key={`spec${specIndex}`}>
                        <td>{spec.spec}</td>
                        <td>{spec.tech}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="review__container__content__leftContent__personalExperience">
                <div className="review__container__content__leftContent__personalExperience--text">
                  <h3>Expérience personnelle</h3>
                  <ReactMarkdown components={{ p: "p" }}>
                    {review.personalExperience?.content}
                  </ReactMarkdown>
                </div>
                <div className="review__container__content__leftContent__personalExperience--image">
                  {review.personalExperience?.imageUrl && (
                    <Image
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
                      className="review__container__content__leftContent__personalExperience--image--img"
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
              <div className="review__container__content__leftContent__advantagesDisadvantages">
                <div className="review__container__content__leftContent__advantagesDisadvantages--text">
                  <h3>Avantages et inconvénients</h3>
                </div>
                <div className="review__container__content__leftContent__advantagesDisadvantages--table">
                  {review.advantagesDisadvantages?.map(
                    (advantagesDisadvantages, advantagesDisadvantagesIndex) => (
                      <div key={`advantage${advantagesDisadvantagesIndex}`}>
                        <p>
                          {advantagesDisadvantages.advantage && (
                            <span className="advantage">+</span>
                          )}
                          {advantagesDisadvantages.advantage}
                        </p>
                        <p>
                          {advantagesDisadvantages.disadvantage && (
                            <span className="disadvantage">-</span>
                          )}
                          {advantagesDisadvantages.disadvantage}
                        </p>
                      </div>
                    )
                  )}
                </div>
                <p className="review__container__content__leftContent__advantagesDisadvantages--explanation">
                  {review.advantagesDisadvantagesExplanation}
                </p>
              </div>
              <div className="review__container__content__leftContent__conclusion">
                <div className="review__container__content__leftContent__conclusion--text">
                  <h3>Conclusion</h3>
                  <ReactMarkdown components={{ p: "p" }}>
                    {review?.conclusion}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="review__container__content__leftContent__ratings">
                <div className="review__container__content__leftContent__ratings--text">
                  <h3>Evaluation</h3>
                </div>
                <div className="review__container__content__leftContent__ratings--rating">
                  {review.ratings?.map((rating, ratingIndex) => (
                    <div key={`rating${ratingIndex}`} className="singleRating">
                      <p>{rating.name}</p>
                      <Rating ratingNumber={rating.rating} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="review__container__content__leftContent__linkShop">
                <div className="review__container__content__leftContent__linkShop--text">
                  <h3>Liens d&rsquo;achat</h3>
                </div>
                <div className="review__container__content__leftContent__linkShop--links">
                  {review.linkShops?.map((link, linkIndex) => (
                    <a
                      key={`link${linkIndex}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
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
