import "./reviews-materiel.scss";
import PostsReviewsMateriel from "@/containers/ReviewsPages/ReviewsPages";

export const metadata = {
  title: "Tests & Avis Matériel - BJ-Treklife",
  description:
    "Découvrez des critiques détaillées et des avis authentiques sur le matériel de randonnée et de trekking, pour vous aider à choisir l'équipement parfait pour votre prochaine aventure.",
};

export default function RandonneeTrekking() {
  return (
    <>
      <main className="articles-bg">
        <PostsReviewsMateriel />
      </main>
    </>
  );
}
