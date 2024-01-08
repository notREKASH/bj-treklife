import PostsReviewsMateriel from "@/containers/ReviewsPages/ReviewsPages";
import "../../reviews-materiel.scss";

export default async function CategoriePage({ params }) {
  let reviews = null;
  const filter = params.filter;
  // A supprimer après modification de l'API
  const decodeFilter = decodeURIComponent(filter);
  console.log(decodeFilter);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/productsReviews?category=${decodeFilter}`,
      {
        cache: "force-cache",
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      throw new Error(
        "Impossible de charger les articles de randonnées. Veuillez réessayer plus tard."
      );
    } else {
      const formattedreviews = await res.json();
      if (formattedreviews.reviews.length > 0) {
        reviews = formattedreviews.reviews;
      } else {
        reviews = null;
      }
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <main className="articles-bg">
        <PostsReviewsMateriel reviews={reviews} filterName={decodeFilter} />
      </main>
    </>
  );
}
