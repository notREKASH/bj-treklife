"use client";

import { useEffect } from "react";
import "./PostPage.scss";
import SuggestionPanel from "@/components/SuggestionPanel/SuggestionPanel";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import Loader from "@/components/Loader/Loader";
import DynamicGPXReader from "@/components/GPXReader/DynamicGPXReader";
import Link from "next/link";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";
import CommentsSection from "../CommentsSection/CommentsSection";
import RatingArticle from "@/components/RatingArticle/RatingArticle";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PostSectionIntro from "@/components/PostSectionIntro/PostSectionIntro";
import PostAllSections from "@/components/PostAllSections/PostAllSections";
import PostConclusion from "@/components/PostConclusion/PostConclusion";
import PostUtils from "@/components/PostUtils/PostUtils";
import PostSummary from "@/components/PostSummary/PostSummary";

export default function PostPage({ post, id }) {
  const error = useSelector((state) => state.posts.error);

  const { push } = useRouter();

  useEffect(() => {
    if (error) {
      push("/404");
    }
  }, [error, push]);

  const loading = useSelector((state) => state.posts.loading);

  if (loading) {
    return <Loader />;
  }

  const allImages =
    post.carousels?.flatMap((carousel) => carousel.slides) || [];

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
            <PostUtils post={post} />
            <PostSummary post={post} />
          </div>
        </div>
        <div className="post__container__content">
          <div className={`post__container__content__leftContent`}>
            <PostSectionIntro post={post} />
            <PostAllSections post={post} />
            <PostConclusion post={post} />
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
          <p>Le {post.date}</p>
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
