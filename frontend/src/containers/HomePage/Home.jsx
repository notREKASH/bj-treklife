"use client";

import AboutMe from "@/containers/HomePage/AboutMe/AboutMe";
import FAQ from "@/containers/HomePage/FAQ/FAQ";
import LatestNews from "@/containers/HomePage/LatestNews/LatestNews";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";
import {
  setRandonneeTrekkingFilterName,
  setReviewsProductFilterName,
} from "../../app/redux/actions/filter.actions";
import LatestReview from "@/containers/HomePage/LatestReview/LatestReview";

export default function HomePage({ posts, review }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(setRandonneeTrekkingFilterName(""));
    dispatch(setReviewsProductFilterName(""));
  }, [dispatch, posts, review]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HeroBanner />
      <LogoSlider />
      <LatestNews latestsPosts={posts} />
      <LatestReview latestReview={review} />
      <AboutMe />
      <FAQ />
    </>
  );
}
