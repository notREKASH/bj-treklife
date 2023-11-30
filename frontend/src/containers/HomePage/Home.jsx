"use client";

import AboutMe from "@/containers/HomePage/AboutMe/AboutMe";
import FAQ from "@/containers/HomePage/FAQ/FAQ";
import LatestNews from "@/containers/HomePage/LatestNews/LatestNews";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestPosts } from "../../app/redux/actions/posts.action";
import Loader from "@/components/Loader/Loader";
import { getLatestReview } from "../../app/redux/actions/reviews.action";
import {
  setRandonneeTrekkingFilterName,
  setReviewsProductFilterName,
} from "../../app/redux/actions/filter.actions";
import LatestReview from "@/containers/HomePage/LatestReview/LatestReview";

export default function HomePage() {
  const dispatch = useDispatch();
  const latestsPostsLoaded = useSelector(
    (state) => state.posts.latestsPostsLoading
  );
  const latestReviewLoaded = useSelector(
    (state) => state.reviews.latestReviewLoaded
  );
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(setRandonneeTrekkingFilterName(""));
    dispatch(setReviewsProductFilterName(""));

    if (!latestsPostsLoaded) {
      dispatch(getLatestPosts());
    }

    if (!latestReviewLoaded) {
      dispatch(getLatestReview());
    }
  }, [dispatch, latestsPostsLoaded, latestReviewLoaded]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HeroBanner />
      <LogoSlider />
      <LatestNews />
      <LatestReview />
      <AboutMe />
      <FAQ />
    </>
  );
}
