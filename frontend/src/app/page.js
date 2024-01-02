import HomePage from "@/containers/HomePage/Home";

export const metadata = {
  title: "Accueil - BJ-Treklife",
  description:
    "Rejoignez BJ-Treklife pour explorer des récits captivants de randonnées et trekkings, bénéficiez de conseils sur le matériel et découvrez des avis authentiques.",

  openGraph: {
    title: "Accueil - BJ-Treklife",
    description:
      "Rejoignez BJ-Treklife pour explorer des récits captivants de randonnées et trekkings, bénéficiez de conseils sur le matériel et découvrez des avis authentiques.",
    type: "website",
    locale: "fr_FR",
    url: "https://bj-treklife.fr/",
    site_name: "BJ-Treklife",
    images: [
      {
        url: "https://bj-treklife.fr/images/opengraph/bj-treklife-home.png",
        width: 1200,
        height: 630,
        alt: "Paysage de montagne, avec le logo BJ-Treklife en surimpression.",
      },
    ],
  },
};

export default async function Home() {
  let posts = null;
  let review = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/latest-posts`,
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
      const formattedPosts = await res.json();
      posts = formattedPosts.map((post) => {
        return {
          ...post,
          date: new Date(post.date).toLocaleDateString(),
        };
      });
    }
  } catch (err) {
    console.error(
      "Une erreur s'est produite lors de la récupération des derniers articles de randonnée et trekking"
    );
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/productsReviews/latest-reviews`,
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
      const formattedReview = await res.json();

      const updateDate = {
        ...formattedReview,
        createdAt: new Date(formattedReview.createdAt).toLocaleDateString(),
      };

      review = updateDate;
    }
  } catch (err) {
    console.error(
      "Une erreur s'est produite lors de la récupération du dernier test de matériel"
    );
  }

  return (
    <>
      <HomePage posts={posts} review={review} />
    </>
  );
}
