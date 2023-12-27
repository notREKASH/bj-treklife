"use client";

import "./CommentForm.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { addRandonneeComment } from "@/app/redux/actions/randonneeComments.action";
import { addProductsRComment } from "@/app/redux/actions/productsRComments.actions";

export default function CommentForm({ contentType, articleId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [cgu, setCgu] = useState(false);
  const [mentionsLegales, setMentionsLegales] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      name,
      email,
      message,
      privacyPolicy,
      cgu,
      mentionsLegales,
    };

    if (contentType === "randonneeTrekking") {
      dispatch(addRandonneeComment(articleId, commentData));
    } else if (contentType === "productReview") {
      dispatch(addProductsRComment(articleId, commentData));
    }

    setName("");
    setEmail("");
    setMessage("");
    setPrivacyPolicy(false);
    setCgu(false);
    setMentionsLegales(false);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit} >
      <h4>Laissez un commentaire</h4>
      <div className="comment-form__input-container">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          autoComplete="off"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="comment-form__input-container">
        <label htmlFor="email-form">Email</label>
        <input
          type="email"
          id="email-form"
          value={email}
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="comment-form__input-container">
        <label htmlFor="message">Commentaire</label>
        <textarea
          id="message"
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <div className="comment-form__consent">
          <input
            type="checkbox"
            id="privacyPolicy-form"
            checked={privacyPolicy}
            required
            onChange={(e) => setPrivacyPolicy(e.target.checked)}
          />
          <label htmlFor="privacyPolicy-form">
            J&rsquo;accepte la{" "}
            <Link href="/politique-de-confidentialite" target="_blank">
              politique de confidentialité
            </Link>
          </label>
        </div>
        <div className="comment-form__consent">
          <input
            type="checkbox"
            id="cgu-form"
            checked={cgu}
            required
            onChange={(e) => setCgu(e.target.checked)}
          />
          <label htmlFor="cgu-form">
            J&rsquo;accepte les{" "}
            <Link href="/conditions-generales-utilisation" target="_blank">
              CGU
            </Link>
          </label>
        </div>
        <div className="comment-form__consent">
          <input
            type="checkbox"
            id="mentionsLegales-form"
            checked={mentionsLegales}
            required
            onChange={(e) => setMentionsLegales(e.target.checked)}
          />
          <label htmlFor="mentionsLegales-form">
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
