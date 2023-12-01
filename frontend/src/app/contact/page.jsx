import Link from "next/link";
import "./contact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faHiking } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-page__backgroundImage"></div>
      <div className="contact-page__container">
        <div>
          <h1>Page de contact</h1>
          <p>
            Vous souhaitez nous contacter ? Cliquez sur le bouton correspondant
            à votre profil.
          </p>
        </div>
        <div className="contact-page__container__buttons">
          <div className="contact-page__container__buttons__particulier">
            <Link href="/contact/particulier">
              <FontAwesomeIcon icon={faHiking} />
            </Link>
            <h2>Particulier</h2>
            <p>
              Curieux à propos de mes randonnées ou vous vous demandez quel
              équipement j&rsquo;utilise ? N&rsquo;hésitez pas à m&rsquo;envoyer
              un message. Je suis toujours ravi de partager mes conseils, mes
              tracés GPX, et mes expériences de trek pour vous aider dans vos
              propres aventures.
            </p>
          </div>
          <div className="contact-page__container__buttons__professionnel">
            <Link href="/contact/professionnel">
              <FontAwesomeIcon icon={faUserTie} />
            </Link>
            <h2>Professionnel</h2>
            <p>
              Vous cherchez à collaborer avec BJ-Treklife ? Super !
              Contactez-moi pour discuter de vos produits, de possibles
              partenariats et de la manière dont nous pouvons nous entraider
              dans le monde passionnant du trekking et de la randonnée.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
