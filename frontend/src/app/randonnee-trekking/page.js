import "./randonnee-trekking.scss";
import ArticlesRandonneeTrek from "@/containers/ArticlesPages/ArticlesPages";

export const metadata = {
  title: "Randonnée & Trekking - BJ-Treklife",
  description:
    "Explorez une sélection d'articles passionnants sur la randonnée et le trekking, partageant des expériences et des conseils pour des sorties mémorables en pleine nature.",
};

export default function RandonneeTrekking() {
  return (
    <>
      <main className="articles-bg">
        <ArticlesRandonneeTrek />
      </main>
    </>
  );
}
