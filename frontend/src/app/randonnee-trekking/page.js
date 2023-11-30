import "./randonnee-trekking.scss";
import ArticlesRandonneeTrek from "@/containers/ArticlesPages/ArticlesPages";

export const metadata = {
  title: "Randonnée & Trekking - BJ-Treklife",
  description: "...",
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
