import { useDispatch, useSelector } from "react-redux";
import "./CommentList.scss";
import CommentReply from "../CommentReply/CommentReply";
import CommentForm from "../CommentForm/CommentForm";
import { useEffect, useState } from "react";
import CommentReplyList from "../CommentReplyList/CommentReplyList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonHiking,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { deleteRandonneeComment } from "@/app/redux/actions/randonneeComments.action";
import { deleteProductsRComment } from "@/app/redux/actions/productsRComments.actions";

export default function CommentList({ contentType, articleId }) {
  const dispatch = useDispatch();
  const [reply, setReply] = useState(false);
  const [replyTo, setReplyTo] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const comments = useSelector((state) =>
    contentType === "randonneeTrekking"
      ? state.randonneeComments?.randonneeComments
      : state.productsRComments?.productsRComments
  );

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

  const handleReplies = (id) => {
    setReply(!reply);
    setReplyTo(id);
  };

  const handleDeleteComment = (commentId) => {
    if (contentType === "randonneeTrekking") {
      dispatch(deleteRandonneeComment(articleId, commentId, token));
    } else if (contentType === "productReview") {
      dispatch(deleteProductsRComment(articleId, commentId, token));
    }
  };

  return (
    <div className="comment-list">
      <ul className="comment-list__container">
        {comments?.map((comment) => (
          <li key={comment?._id} className="comment-list__container__comment">
            <div className="comment-list__container__comment__information">
              <div className="comment-list__container__comment__information__content">
                <div className="comment-list__container__comment__information__content--avatar">
                  <FontAwesomeIcon icon={faPersonHiking} />
                </div>
                <div className="comment-list__container__comment__information__content--user">
                  <h3>{comment?.name}</h3>
                  <p>{formatDate(comment?.createdAt)}</p>
                </div>
              </div>
              <div className="comment-list__container__comment__information--replyBtn">
                {!reply && (
                  <button onClick={() => handleReplies(comment?._id)}>
                    Répondre
                  </button>
                )}
                {token && (
                  <button
                    onClick={() => {
                      handleDeleteComment(comment?._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />{" "}
                  </button>
                )}
              </div>
            </div>
            <p className="comment-list__container__comment--message">
              {comment?.message}
            </p>
            <CommentReplyList
              contentType={contentType}
              articleId={articleId}
              commentId={comment?._id}
            />
            {reply && replyTo === comment?._id && (
              <div className="comment-list__container__comment--reply">
                <button
                  className="comment-list__container__comment--reply--btn"
                  onClick={() => handleReplies(comment?._id)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
                <CommentReply
                  contentType={contentType}
                  articleId={articleId}
                  commentId={comment?._id}
                  replyToName={comment?.name}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {!reply && (
        <CommentForm contentType={contentType} articleId={articleId} />
      )}
    </div>
  );
}
