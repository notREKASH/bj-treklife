import Link from "next/link";
import "./contact.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faHiking } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <h1>Page de contact</h1>
        <p>
          Vous êtes un particulier ou un professionnel et vous souhaitez nous
          contacter ? Cliquez sur le bouton correspondant à votre profil.
        </p>
        <div className="contact-page__container__buttons">
          <Link href="/contact/particulier">
            <FontAwesomeIcon icon={faHiking} />
          </Link>
          <Link href="/contact/professionnel">
            <FontAwesomeIcon icon={faUserTie} />
          </Link>
        </div>
      </div>
    </div>
  );
}
