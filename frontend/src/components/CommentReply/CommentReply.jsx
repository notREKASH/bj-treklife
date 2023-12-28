"use client";

import "./CommentReply.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import { addRandonneeReply } from "@/app/redux/actions/randonneeComments.action";
import { addProductsRReply } from "@/app/redux/actions/productsRComments.actions";

export default function CommentReply({
  contentType,
  articleId,
  commentId,
  replyToName,
}) {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth?.isAuth);

  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [cgu, setCgu] = useState(false);
  const [mentionsLegales, setMentionsLegales] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const replyData = {
      icon,
      name,
      email,
      message,
      privacyPolicy,
      cgu,
      mentionsLegales,
    };

    console.log(replyData);

    if (contentType === "randonneeTrekking") {
      dispatch(addRandonneeReply(articleId, commentId, replyData, token));
    } else if (contentType === "productReview") {
      dispatch(addProductsRReply(articleId, commentId, replyData, token));
    }

    setName("");
    setEmail("");
    setMessage("");
    setPrivacyPolicy(false);
    setCgu(false);
    setMentionsLegales(false);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h4>Répondre à {replyToName}</h4>
      {isAuth && (
        <div className="comment-form__input-container admin">
          <label htmlFor="icon">Icon BJ-Treklife</label>
          <p>
            https://live.staticflickr.com/65535/53359769088_0712c6109d_b.jpg
          </p>
          <input
            type="text"
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>
      )}
      <div className="comment-form__input-container">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="comment-form__input-container">
        <label htmlFor="email-reply">Email</label>
        <input
          type="email"
          id="email-reply"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="comment-form__input-container">
        <label htmlFor="message">Commentaire</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <div className="comment-form__consent">
          <input
            type="checkbox"
            id="privacyPolicy-reply"
            checked={privacyPolicy}
            required
            onChange={(e) => setPrivacyPolicy(e.target.checked)}
          />
          <label htmlFor="privacyPolicy-reply">
            J&rsquo;accepte la{" "}
            <Link href="/politique-de-confidentialite" target="_blank">
              politique de confidentialité
            </Link>
          </label>
        </div>
        <div className="comment-form__consent">
          <input
            type="checkbox"
            id="cgu-reply"
            checked={cgu}
            required
            onChange={(e) => setCgu(e.target.checked)}
          />
          <label htmlFor="cgu-reply">
            J&rsquo;accepte les{" "}
            <Link href="/conditions-generales-utilisation" target="_blank">
              CGU
            </Link>
          </label>
        </div>
        <div className="comment-form__consent">
          <input
            type="checkbox"
            id="mentionsLegales-reply"
            checked={mentionsLegales}
            required
            onChange={(e) => setMentionsLegales(e.target.checked)}
          />
          <label htmlFor="mentionsLegales-reply">
            J&rsquo;accepte les{" "}
            <Link href="/mentions-legales" target="_blank">
              mentions légales
            </Link>
          </label>
        </div>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}
