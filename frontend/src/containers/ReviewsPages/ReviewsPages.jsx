"use client";

import PostCard from "@/components/PostCard/PostCard";
import "./ReviewsPages.scss";
import { useDispatch, useSelector } from "react-redux";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import {
  getFilteredReviews,
  getReviews,
  setCurrentReviewsPage,
} from "@/app/redux/actions/reviews.action";
import { useEffect, useRef, useState } from "react";
import PaginationComponent from "@/components/Paginate/Paginate";
import {
  setReviewsProductCategory,
  setReviewsProductSubCategory,
} from "@/app/redux/actions/filter.actions";
import FilterPanelMobile from "@/components/FilterPanelMobile/FilterPanelMobile";
import FilterPanelDesktopReview from "../FilterPanelDesktopReview/FilterPanelDesktopReview";

const filterButtons = [
  {
    name: "Tous",
    filter: "Tous",
  },
  {
    name: "Chaussure",
    filter: "Chaussure",
  },
  {
    name: "Sac à dos",
    filter: "Sac à dos",
  },
  {
    name: "Tente",
    filter: "Tente",
  },
  {
    name: "Duvet",
    filter: "Duvet",
  },
  {
    name: "Réchaud",
    filter: "Réchaud",
  },
  {
    name: "Kit Popote",
    filter: "Kit Popote",
  },
  {
    name: "Matelas",
    filter: "Matelas",
  },
  {
    name: "Frontale",
    filter: "Frontale",
  },
  {
    name: "Filtre à eau",
    filter: "Filtre à eau",
  },
  {
    name: "Polaire",
    filter: "Polaire",
  },
  {
    name: "Veste imperméable",
    filter: "Veste imperméable",
  },
  {
    name: "Doudoune",
    filter: "Doudoune",
  },
  {
    name: "Pantalon",
    filter: "Pantalon",
  },
];

export default function PostsReviewsMateriel() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(setReviewsProductCategory(""));
    dispatch(setReviewsProductSubCategory(""));
    dispatch(getReviews());
    dispatch(setCurrentReviewsPage(1));
  }, [dispatch]);

  return (
    <>
      <div className="articles-layout">
        <div className="articles-layout__background">
          <h2>Retrouvez tous mes tests & avis matériel</h2>
        </div>
        <div className="articles">
          <div className="articles--container">
            {reviews &&
              reviews.map((review) => (
                <PostCard
                  key={review._id}
                  postTitle={review.title}
                  postContent={review.introduction?.content}
                  postImage={review.coverImageUrl}
                  postCategory={review.category}
                  postSubCategory={review.subCategory}
                  postUrl="reviews-materiel"
                  postId={review._id}
                  contentType="productReviews"
                />
              ))}
          </div>
          <div className="articles__filterPanel">
            <FilterPanelDesktopReview />
            <div className="newsletterPanel">
              <Newsletter />
            </div>
            <div className="socialMediaReview">
              <SocialMediaPanel />
            </div>
          </div>
        </div>
        <div className="articles-layout--rightPanel">
          <FilterPanelMobile
            filterButtons={filterButtons}
            pageName={"reviewsProductSubCategory"}
          />
        </div>
        <div className="articles-layout--pagination">
          <PaginationComponent contentType="productReviews" />
        </div>
      </div>
    </>
  );
}
