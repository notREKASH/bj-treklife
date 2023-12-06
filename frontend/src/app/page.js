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

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
