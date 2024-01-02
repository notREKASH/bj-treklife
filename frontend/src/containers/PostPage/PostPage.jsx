"use client";

import { useEffect } from "react";
import "./PostPage.scss";
import SubSection from "@/components/SubSection/SubSection";
import SuggestionPanel from "@/components/SuggestionPanel/SuggestionPanel";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificPost } from "@/app/redux/actions/posts.action";
import Loader from "@/components/Loader/Loader";
import {
  setRandonneeTrekkingFilterName,
  setReviewsProductFilterName,
} from "@/app/redux/actions/filter.actions";
import DynamicGPXReader from "@/components/GPXReader/DynamicGPXReader";
import Link from "next/link";
import Carousel from "@/components/Carousel/Carousel";
import ImageFullscreen from "@/components/ImageFullscreen/ImageFullscreen";
import Image from "next/image";
import CommentsSection from "../CommentsSection/CommentsSection";
import RatingArticle from "@/components/RatingArticle/RatingArticle";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function PostPage({ id }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.posts.error);

  const { push } = useRouter();
  useEffect(() => {
    if (error) {
      push("/404");
    }
  }, [error, push]);

  useEffect(() => {
    dispatch(getSpecificPost(id));
    dispatch(setRandonneeTrekkingFilterName(id));
    dispatch(setReviewsProductFilterName(id));
  }, [dispatch, id]);

  const post = useSelector((state) => state?.posts?.post);
  const loading = useSelector((state) => state.posts.loading);

  if (loading) {
    return <Loader />;
  }

  const allImages =
    post.carousels?.flatMap((carousel) => carousel.slides) || [];

  const descriptionUtils = [
    { name: "Localisation", value: post.details?.location },
    { name: "Activité", value: post.details?.activityType },
    { name: "Durée", value: post.details?.duration + " heures" },
    { name: "Distance", value: post.details?.distance + " km" },
    {
      name: "Dénivelé",
      value: `${post.details?.elevationGain} D+ et ${post.details?.elevationLoss} D-`,
    },
    { name: "Difficulté", value: `${post.details?.difficulty}/10` },
  ];

  const categoryNames = {
    randonnée: "la randonnée",
    trekking: "le trekking",
    alpinisme: "l'alpinisme",
    voyage: "le voyage",
  };

  const carouselTitle = (category) => {
    if (category === "randonnée") {
      return "Découvrez l'ensemble des photos de la randonnée";
    } else if (category === "trekking") {
      return "Découvrez l'ensemble des photos du trekking";
    }
  };

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__container--img">
          <span className=""></span>
          {post?.coverImageUrl && (
            <Image
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
              src={post.coverImageUrl}
              alt={post.altImageCover}
              width={1920}
              height={1080}
              quality={90}
              sizes="100vw"
            />
          )}
          <h2>{post.title}</h2>
        </div>
        <div className="post__container__information">
          <div className="post__container__information__gpxCard">
            <DynamicGPXReader gpxUrl={post.gpxFileUrl} />
            <Link
              className="post__container__information__gpxCard--file"
              href={`${post.gpxFileData}`}>
              Télécharger le GPX
            </Link>
          </div>
          <div className="post__container__information__description">
            <div className="post__container__information__description--utils">
              {descriptionUtils.map((descriptionUtil, descriptionIndex) => (
                <div key={`description${descriptionIndex}`}>
                  <p>
                    {descriptionUtil.name}:<span>{descriptionUtil.value}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="post__container__information__description--summary">
              {post.sections?.map((section, summaryIndex) => (
                <div key={`summary${summaryIndex}`}>
                  <h3>{section.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="post__container__content">
          <div className={`post__container__content__leftContent`}>
            <div className="post__container__content__leftContent__introduction">
              <div className="post__container__content__leftContent__introduction--text">
                <h3>Introduction</h3>
                <ReactMarkdown components={{ p: "p" }}>
                  {post.introduction?.content}
                </ReactMarkdown>
              </div>
              <div className="post__container__content__leftContent__introduction--image">
                {post.introduction?.imageUrl && (
                  <Image
                    className="post__container__content__leftContent__introduction--image--img"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
                    src={post.introduction?.imageUrl}
                    alt={post.introduction?.altImage}
                    width={1920}
                    height={1080}
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />
                )}
                {post.introduction?.imageUrl && (
                  <Image
                    className="backgroundImage"
                    src={post.introduction?.imageUrl}
                    alt={post.title}
                    width={1920}
                    height={1080}
                    quality={1}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />
                )}
                {post.introduction?.imageUrl && (
                  <ImageFullscreen
                    src={post.introduction?.imageUrl}
                    alt={post.introduction?.altImage}
                  />
                )}
              </div>
            </div>
            <div className="post__container__content__leftContent__allSections">
              {post.sections?.map((section, sectionIndex) => (
                <div key={`section${sectionIndex}`}>
                  {section.subSections.map((subSection, subSectionIndex) => (
                    <div key={`subSection${subSectionIndex}`}>
                      {subSectionIndex <= 5 && (
                        <SubSection
                          title={
                            subSectionIndex === 0 ? `${section.title}` : ""
                          }
                          content={subSection?.content}
                          imageUrl={subSection?.imageUrl}
                          altImage={subSection?.altImage}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="post__container__content__leftContent__conclusion">
              <div className="post__container__content__leftContent__conclusion--text">
                <h3>Conclusion</h3>
                <ReactMarkdown components={{ p: "p" }}>
                  {post?.conclusion}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          <div className={`post__container__content__rightContent`}>
            <SuggestionPanel
              articleCategory={post.details?.activityType}
              articleId={id}
            />
            <Newsletter />
            <SocialMediaPanel />
          </div>
        </div>
        <div className="post__carousel">
          <h3>{carouselTitle(post.details?.activityType)}</h3>
          <Carousel images={allImages} />
        </div>
        <div className="post--author">
          <p>Posté par {post.author}</p>
          <p>Le {new Date(post.date).toLocaleDateString()}</p>
          <Link href="/randonnee-trekking">Retour</Link>
        </div>
        <div className="post--rating">
          <RatingArticle articleId={id} />
        </div>
        <div className="post__container__commentsSection">
          <CommentsSection contentType="randonneeTrekking" articleId={id} />
        </div>
      </div>
    </div>
  );
}
