import Link from "next/link";
import "../styles/not-found.scss";
import Image from "next/image";
import Logo from "../images/logo.png";

export default function NotFound() {
  return (
    <>
      <div className="not-found">
        <div className="not-found__container">
          <Image
            src={Logo.src}
            alt="Logo BJ-Treklife"
            width={500}
            height={500}
          />
          <h1>404 - Page introuvable</h1>
          <p>
            La page que vous recherchez n&rsquo;existe pas ou n&rsquo;est plus
            disponible. Vous pouvez retourner à la page d&rsquo;accueil en
            cliquant sur le bouton ci-dessous.
          </p>
          <Link href="/">Go back home</Link>
        </div>
      </div>
    </>
  );
}
