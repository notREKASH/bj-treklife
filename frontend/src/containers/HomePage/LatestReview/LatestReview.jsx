"use client";
import Link from "next/link";
import "./LatestReview.scss";
import { useSelector } from "react-redux";
import SectionTag from "@/components/SectionTag/SectionTag";
import Image from "next/image";

function LatestReview() {
  const latestReview = useSelector((state) => state?.reviews?.latestReview);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <section className="latestReview" id="dernier-test-materiel">
      <div className="latestReview__title">
        <div className="latestReview__title--h2">
          <SectionTag name="Matériel" />
          <h3>Retrouvez mon dernier avis & retour d&rsquo;article</h3>
        </div>
        <div className="latestReview__title--p">
          <p>
            {latestReview && latestReview?.introduction
              ? truncateText(latestReview?.introduction.content, 220)
              : ""}
            <Link href={`/reviews-materiel/${latestReview?._id}`}>
              Lire l&rsquo;article
            </Link>
          </p>
        </div>
      </div>
      <div className="latestReview__card">
        <div key={latestReview?._id} className="expedition-item">
          {latestReview?.homeImageUrl && (
            <Image
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
              src={latestReview?.homeImageUrl}
              alt={latestReview?.title}
              width={1920}
              height={1080}
              quality={100}
            />
          )}
          <div className="expedition-item__content">
            <h4>{latestReview?.title}</h4>
            <p className="date">
              {new Date(latestReview?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestReview;
