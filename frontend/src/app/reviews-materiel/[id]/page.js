import ReviewPage from "@/containers/ReviewPage/ReviewPage";
import axios from "axios";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const response = await axios.get(
    `https://bj-treklife.vercel.app/productsReviews/${id}`
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
          url: `https://bj-treklife.fr${post.coverImageUrl}`,
          width: 1200,
          height: 630,
          alt: `${post.altImageCover}`,
        },
      ],
    },
  };
}

export default async function Page({ params, searchParams }) {
  const id = params.id;
  let review = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/productsReviews/${id}`,
      {
        cache: "force-cache",
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      throw new Error(
        "Impossible de charger l'article. Veuillez réessayer plus tard."
      );
    } else {
      review = await res.json();
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <ReviewPage review={review} id={id} />
    </div>
  );
}
