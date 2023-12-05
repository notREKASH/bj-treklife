export const metadata = {
  title: "BJ-Treklife",
  description:
    "Rejoignez BJ-Treklife pour explorer des récits captivants de randonnées et trekkings, bénéficiez de conseils sur le matériel et découvrez des avis authentiques.",
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
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
