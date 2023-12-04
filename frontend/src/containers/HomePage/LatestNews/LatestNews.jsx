"use client";
import Link from "next/link";
import "./LatestNews.scss";
import { useSelector } from "react-redux";
import SectionTag from "@/components/SectionTag/SectionTag";
import GreenButton from "@/components/GreenButton/GreenButton";
import Image from "next/image";

function LatestNews() {
  const latestsPosts = useSelector((state) => state?.posts?.latestsPosts);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <section className="latest-news" id="dernieres-nouveautees">
      <div className="latest-news__title">
        <div className="latest-news__title--h2">
          <SectionTag name="Nouveautées" />
          <h3>Découvre les dernières nouveautées</h3>
        </div>
        <p>
          Retrouvez ici mes dernières randonnées et mes derniers treks, chaque
          article est accompagné de photos, de détails et d&rsquo;informations
          sur le parcours, de tracé GPX et aussi d&rsquo;une touche personnelle
          raconté avec passion pour vous faire vivre l&rsquo;expérience comme si
          vous y étiez.
        </p>
      </div>
      <div className="latest-news__card">
        {latestsPosts &&
          latestsPosts.map((post, index) => (
            <div
              key={post._id}
              className={`news-item ${
                index % 2 === 0 ? "text-bottom" : "text-top"
              }`}
            >
              {post.homeImageUrl && (
                <Image
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
                  src={post.homeImageUrl}
                  alt={post.title}
                  width={1080}
                  height={1920}
                  quality={90}
                />
              )}
              <div className="news-item__content">
                <h4>{post.title}</h4>
                <p>
                  {truncateText(post.introduction.content, 220)}
                  <Link href={`/randonnee-trekking/${post._id}`}>
                    Lire l&rsquo;article
                  </Link>
                </p>
                <p className="date">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="latest-news--button">
        <GreenButton name="Voir tous les articles" url="/randonnee-trekking" />
      </div>
    </section>
  );
}

export default LatestNews;
