import ReviewPage from "@/containers/ReviewPage/ReviewPage";
import axios from "axios";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const response = await axios.get(
    `https://bj-treklife.vercel.app/api/productsReviews/${id}`
  );
  const post = response.data;

  return {
    title: `${post.title} - BJ-Treklife`,
    description: post.metaDescription,

    openGraph: {
      title: `${post.title} - BJ-Treklife`,
      description: post.metaDescription,
      type: "website",
      locale: "fr_FR",
      url: `https://bj-treklife.fr/reviews-materiel/${post.id}`,
      site_name: "BJ-Treklife",
      images: [
        {
          url: `https://bj-treklife.fr/${post.coverImageUrl}`,
          width: 1200,
          height: 630,
          alt: `${post.altImageCover}`,
        },
      ],
    },
  };
}

export default function Page({ params, searchParams }) {
  return (
    <div style={{ backgroundColor: "white" }}>
      <ReviewPage id={params.id} />
    </div>
  );
}
