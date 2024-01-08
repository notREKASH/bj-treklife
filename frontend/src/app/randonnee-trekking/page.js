import "./randonnee-trekking.scss";
import ArticlesRandonneeTrek from "@/containers/ArticlesPages/ArticlesPages";

export const metadata = {
  title: "Randonnée & Trekking - BJ-Treklife",
  description:
    "Explorez une sélection d'articles passionnants sur la randonnée et le trekking, partageant des expériences et des conseils pour des sorties mémorables en pleine nature.",

  openGraph: {
    title: "Randonnée & Trekking - BJ-Treklife",
    description:
      "Explorez une sélection d'articles passionnants sur la randonnée et le trekking, partageant des expériences et des conseils pour des sorties mémorables en pleine nature.",
    type: "website",
    locale: "fr_FR",
    url: "https://bj-treklife.fr/randonnee-trekking",
    site_name: "BJ-Treklife",
    images: [
      {
        url: "https://bj-treklife.fr/images/opengraph/bj-treklife-randonnee-trekking.png",
        width: 1200,
        height: 630,
        alt: "Paysage de montagne, avec un bivouac, et le logo BJ-Treklife en surimpression accompagné du texte Randonnée & Trekking.",
      },
    ],
  },
};

export default async function RandonneeTrekking() {
  let posts = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      cache: "force-cache",
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(
        "Impossible de charger les articles. Veuillez réessayer plus tard."
      );
    } else {
      const formattedPosts = await res.json();
      posts = formattedPosts.posts;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <main className="articles-bg">
        <ArticlesRandonneeTrek posts={posts} />
      </main>
    </>
  );
}
