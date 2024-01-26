"use client";

import { useDispatch, useSelector } from "react-redux";
import "./CommentReplyList.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonHiking, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { deleteRandonneeReply } from "@/app/redux/actions/randonneeComments.action";
import { deleteProductsRReply } from "@/app/redux/actions/productsRComments.actions";
import { updateIsAuth } from "@/app/redux/actions/auth.action";

export default function CommentReplyList({
  contentType,
  articleId,
  commentId,
}) {
  const dispatch = useDispatch();

  const comments = useSelector((state) =>
    contentType === "randonneeTrekking"
      ? state.randonneeComments?.randonneeComments
      : state.productsRComments?.productsRComments
  );

  const comment = comments?.find((comment) => comment?._id === commentId);

  const isAuth = useSelector((state) => state.auth?.isAuth);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!isAuth && token) {
      dispatch(updateIsAuth(token));
    }
  }, [isAuth, dispatch]);

  const [replyIsDefined, setReplyIsDefined] = useState(false);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("fr-FR", options);
  };

  useEffect(() => {
    if (comment?.replies?.length > 0) {
      setReplyIsDefined(true);
    }
  }, [comment]);

  const handleDeleteReply = (replyId) => {
    if (contentType === "randonneeTrekking") {
      dispatch(deleteRandonneeReply(articleId, commentId, replyId, token));
    } else if (contentType === "productReview") {
      dispatch(deleteProductsRReply(articleId, commentId, replyId, token));
    }
  };

  return (
    <div className={`comment-replyList ${replyIsDefined ? "" : "defined"}`}>
      <ul className="comment-replyList__container">
        {comment?.replies?.map((reply) => (
          <li
            key={reply?._id}
            className="comment-replyList__container__replies">
            <div className="comment-replyList__container__replies__information">
              <div className="comment-replyList__container__replies__information__content">
                <div className="comment-replyList__container__replies__information__content--avatar">
                  {reply?.icon ? (
                    <Image
                      src={reply?.icon}
                      alt="avatar"
                      height={50}
                      width={50}
                      quality={100}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faPersonHiking} />
                  )}
                </div>
                <div className="comment-replyList__container__replies__information__content--user">
                  <h3>{reply?.name}</h3>
                  <p>{formatDate(reply?.createdAt)}</p>
                </div>
              </div>
              <div>
                {isAuth && (
                  <button
                    onClick={() => {
                      handleDeleteReply(reply?._id);
                    }}>
                    <FontAwesomeIcon icon={faTrash} />{" "}
                  </button>
                )}
              </div>
            </div>
            <p className="comment-replyList__container__replies--message">
              {reply?.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
