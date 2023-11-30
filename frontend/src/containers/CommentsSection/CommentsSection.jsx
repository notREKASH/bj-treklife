"use client;";

import CommentForm from "@/components/CommentForm/CommentForm";
import "./CommentsSection.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CommentList from "@/components/CommentList/CommentList";
import { getRandonneeComments } from "@/app/redux/actions/randonneeComments.action";
import { getProductsRComments } from "@/app/redux/actions/productsRComments.actions";

export default function CommentsSection({ contentType, articleId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (contentType === "randonneeTrekking") {
      console.log("randonneeTrekking");
      dispatch(getRandonneeComments(articleId));
    } else if (contentType === "productReview") {
      console.log("productReview");
      dispatch(getProductsRComments(articleId));
    }
  }, [dispatch, articleId, contentType]);

  return (
    <section>
      <CommentList contentType={contentType} articleId={articleId} />
    </section>
  );
}
