export const metadata = {
  title: "BJ-Treklife",
  description:
    "Rejoignez BJ-Treklife pour explorer des récits captivants de randonnées et trekkings, bénéficiez de conseils sur le matériel et découvrez des avis authentiques.",

  openGraph: {
    title: "BJ-Treklife",
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

import { Lato } from "next/font/google";

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

import Header from "@/components/Header/Header";
import "../styles/globals.scss";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "./redux/provider";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body className={lato.className}>
        <ReduxProvider>
          <Header />
          <main>
            {children}
            <CookieBanner />
            <ToastContainer />
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
