import "../../randonnee-trekking.scss";
import ArticlesRandonneeTrek from "@/containers/ArticlesPages/ArticlesPages";

export async function generateMetadata({ params, searchParams }, parent) {
  const filter = params.filter;
  const decodeFilter = decodeURIComponent(filter);

  if (decodeFilter === "randonnée") {
    return {
      title: "Randonnée - BJ-Treklife",
      description:
        "Retrouvez toutes mes randonnées en France et en Europe. Des randonnées à la journée ou sur plusieurs jours.",
      openGraph: {
        title: "Randonnée - BJ-Treklife",
        description:
          "Retrouvez toutes mes randonnées en France et en Europe. Des randonnées à la journée ou sur plusieurs jours.",
        type: "website",
        locale: "fr_FR",
        url: `https://bj-treklife.fr/randonnee-trekking/categorie/${filter}`,
        site_name: "BJ-Treklife",
        images: [
          {
            url: `https://bj-treklife.fr/images/randonnee-trekking/randonnee-trekking.jpg`,
            width: 1200,
            height: 630,
            alt: "Randonnée - BJ-Treklife",
          },
        ],
      },
    };
  } else if (decodeFilter === "trekking") {
    return {
      title: "Trekking - BJ-Treklife",
      description:
        "Retrouvez toutes mes randonnées en France et en Europe. Des randonnées à la journée ou sur plusieurs jours.",
      openGraph: {
        title: "Trekking - BJ-Treklife",
        description:
          "Retrouvez toutes mes randonnées en France et en Europe. Des randonnées à la journée ou sur plusieurs jours.",
        type: "website",
        locale: "fr_FR",
        url: `https://bj-treklife.fr/randonnee-trekking/categorie/${filter}`,
        site_name: "BJ-Treklife",
        images: [
          {
            url: `https://bj-treklife.fr/images/randonnee-trekking/trekking.jpg`,
            width: 1200,
            height: 630,
            alt: "Trekking - BJ-Treklife",
          },
        ],
      },
    };
  } else {
    return {
      title: "Randonnée et Trekking - BJ-Treklife",
      description:
        "Retrouvez toutes mes randonnées en France et en Europe. Des randonnées à la journée ou sur plusieurs jours.",
      openGraph: {
        title: "Randonnée et Trekking - BJ-Treklife",
        description:
          "Retrouvez toutes mes randonnées en France et en Europe. Des randonnées à la journée ou sur plusieurs jours.",
        type: "website",
        locale: "fr_FR",
        url: `https://bj-treklife.fr/randonnee-trekking/categorie/${filter}`,
        site_name: "BJ-Treklife",
        images: [
          {
            url: `https://bj-treklife.fr/images/randonnee-trekking/randonnee-trekking.jpg`,
            width: 1200,
            height: 630,
            alt: "Randonnée et Trekking - BJ-Treklife",
          },
        ],
      },
    };
  }
}

export default async function CategoriePage({ params }) {
  let posts = null;
  const filter = params.filter;
  // A supprimer après modification de l'API
  const decodeFilter = decodeURIComponent(filter);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?activityType=${decodeFilter}`,
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
      const formattedPosts = await res.json();
      posts = formattedPosts.posts;
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <main className="articles-bg">
        <ArticlesRandonneeTrek posts={posts} filterName={decodeFilter} />
      </main>
    </>
  );
}
