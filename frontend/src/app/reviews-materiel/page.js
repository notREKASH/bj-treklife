import "./reviews-materiel.scss";
import PostsReviewsMateriel from "@/containers/ReviewsPages/ReviewsPages";

export const metadata = {
  title: "Tests & Avis Matériel - BJ-Treklife",
  description:
    "Découvrez des critiques détaillées et des avis authentiques sur le matériel de randonnée et de trekking, pour vous aider à choisir l'équipement parfait pour votre prochaine aventure.",

  openGraph: {
    title: "Tests & Avis Matériel - BJ-Treklife",
    description:
      "Découvrez des critiques détaillées et des avis authentiques sur le matériel de randonnée et de trekking, pour vous aider à choisir l'équipement parfait pour votre prochaine aventure.",
    type: "website",
    locale: "fr_FR",
    url: "https://bj-treklife.fr/reviews-materiel",
    site_name: "BJ-Treklife",
    images: [
      {
        url: "https://bj-treklife.fr/images/opengraph/bj-treklife-product-reviews.png",
        width: 1200,
        height: 630,
        alt: "Benmehal Joris, fondateur de BJ-Treklife, en train de tester du matériel de randonnée et de trekking, avec le logo BJ-Treklife en surimpression accompagné du texte Tests & Avis Matériel.",
      },
    ],
  },
};

export default async function RandonneeTrekking() {
  let reviews = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/productsReviews`,
      {
        cache: "force-cache",
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      throw new Error(
        "Impossible de charger les articles. Veuillez réessayer plus tard."
      );
    } else {
      const formattedReviews = await res.json();
      reviews = formattedReviews.reviews;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <main className="articles-bg">
        <PostsReviewsMateriel reviews={reviews} />
      </main>
    </>
  );
}
