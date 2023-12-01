"use client";

import Link from "next/link";
import "./dashboard.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

function NewPost() {
  const { push } = useRouter();
  const inputIdP = useRef(null);
  const inputIdR = useRef(null);
  const [dataForPost, setDataForPost] = useState(false);
  const [dataForReview, setDataForReview] = useState(false);

  const handleIdPSubmit = async (e) => {
    e.preventDefault();

    const id = inputIdP.current.value;

    try {
      const res = await axios.get(
        `https://bj-treklife.vercel.app/api/posts/${id}`
      );
      const data = res.data;

      if (data && data.message && typeof data.message === "object") {
        const message = data.message;
        if (
          message.kind === "ObjectId" &&
          message.path === "_id" &&
          message.valueType === "string"
        ) {
          alert("Id invalide");
          inputIdP.current.value = "";
        }
      } else {
        setDataForPost(true);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      alert("Une erreur est survenue lors de la récupération du post.");
    }
  };

  useEffect(() => {
    if (dataForPost) {
      const id = inputIdP.current.value;
      push(`/dashboard/randonnee-trekking/${id}`);
    }
  }, [dataForPost, push]);

  const handleIdRSubmit = async (e) => {
    e.preventDefault();

    const id = inputIdR.current.value;

    try {
      const res = await axios.get(
        `https://bj-treklife.vercel.app/api/productsReviews/${id}`
      );

      const data = res.data;

      if (data === null) {
        alert("Id invalide");
        inputIdR.current.value = "";
      } else {
        setDataForReview(true);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      alert("Une erreur est survenue lors de la récupération du post.");
    }
  };

  useEffect(() => {
    if (dataForReview) {
      const id = inputIdR.current.value;
      push(`/dashboard/review-materiel/${id}`);
    }
  }, [dataForReview, push]);

  return (
    <div className="dashboard">
      <h2>Quel type d&rsquo;article écrire ?</h2>
      <div className="dashboard__container">
        <div className="dashboard__container__card">
          <div>
            <h3>Upload des images</h3>
            <Link href="/dashboard/file-upload">
              <button>Upload des images</button>
            </Link>
          </div>
          <div>
            <h3>Voir toutes les images</h3>
            <Link href="/dashboard/file-upload/table">
              <button>Toutes les images</button>
            </Link>
          </div>
        </div>
        <div className="dashboard__container__card">
          <h3>Article de randonnée</h3>
          <Link href="/dashboard/randonnee-trekking">
            <button>Créer un article de randonnée</button>
          </Link>
        </div>
        <div className="dashboard__container__card">
          <h3>Article de matériel</h3>
          <Link href="/dashboard/review-materiel">
            <button>Créer un article de matériel</button>
          </Link>
        </div>
        <div className="dashboard__container__card">
          <h3>Modifier article de randonnée</h3>
          <form onSubmit={handleIdPSubmit}>
            <label>Id du post à modifier</label>
            <input type="text" name="id" ref={inputIdP} />
            <button type="submit">OK</button>
          </form>
        </div>
        <div className="dashboard__container__card">
          <h3>Modifier article de matériel</h3>
          <form onSubmit={handleIdRSubmit}>
            <label>Id de la review à modifier</label>
            <input type="text" name="id" ref={inputIdR} />
            <button type="submit">OK</button>
          </form>
        </div>
        <div className="dashboard__container__card">
          <h3>Liste de la newsletter</h3>
          <Link href="/dashboard/newsletter">
            <button>Consulter la liste</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
