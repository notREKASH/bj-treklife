"use client";

import "./Footer.scss";
import Logo from "../../images/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Footer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [cgu, setCgu] = useState(false);
  const [mentionsLegales, setMentionsLegales] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newsletterData = {
      firstName,
      lastName,
      email,
      privacyPolicy,
      cgu,
      mentionsLegales,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/newsLetter`, newsletterData)
      .then((res) => {
        toast.success(`${res.data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      })
      .catch((err) =>
        toast.error(`${err.response.data}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        })
      );

    setFirstName("");
    setLastName("");
    setEmail("");
    setPrivacyPolicy(false);
    setCgu(false);
    setMentionsLegales(false);
  };

  return (
    <>
      <div className="footer-bg">
        <footer className="footer">
          <div className="footer__container">
            <div className="footer__container--information">
              <Image
                src={Logo.src}
                alt="Logo BJ-Treklife"
                className="logo"
                width={50}
                height={50}
                quality={100}
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                a enim lacus. Donec ultricies volutpat tellus, sit amet blandit
                nisi. Curabitur volutpat ullamcorper tellus, imperdiet
                scelerisque lorem faucibus lobortis.
              </p>
              <div className="footer__container--information--socialMedia">
                <Link
                  href="https://www.facebook.com/profile.php?id=61553734114609"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/bj.treklife/?fbclid=IwAR0hWnrv96zm9psUnZib3WH0iz36I4RIYOL_Z4e5ezPeN7P5IjfIx1CSSqQ"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/joris-benmehal-6266a427a/"
                  target="_blank"
                  aria-label="Linkedin"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </Link>
                <Link href="" target="_blank" aria-label="Youtube">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                  >
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="footer__container__menu">
              <div className="footer__container__menu--newsletter">
                <h4>Newsletter</h4>
                <form
                  className="footer__container__menu--newsletter__form"
                  onSubmit={handleSubmit}
                >
                  <div className="footer__container__menu--newsletter__form__field">
                    <div className="footer__container__menu--newsletter__form__field__name">
                      <label htmlFor="firstName">Votre Prénom</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Votre prénom"
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <label htmlFor="lastName">Votre Nom</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Votre nom"
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <label htmlFor="email">Votre Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Votre email"
                      autoComplete="email"
                      value={email}
                      required
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="footer__container__menu--newsletter__form__consent">
                    <div>
                      <input
                        type="checkbox"
                        id="privacyPolicy"
                        required
                        value={privacyPolicy}
                        onChange={(e) => setPrivacyPolicy(e.target.checked)}
                      />
                      <label htmlFor="privacyPolicy">
                        J&rsquo;accepte la{" "}
                        <Link
                          href="/politique-de-confidentialite"
                          target="_blank"
                        >
                          politique de confidentialité
                        </Link>
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="cgu"
                        required
                        value={cgu}
                        onChange={(e) => setCgu(e.target.checked)}
                      />
                      <label htmlFor="cgu">
                        J&rsquo;accepte les{" "}
                        <Link
                          href="/conditions-generales-utilisation"
                          target="_blank"
                        >
                          conditions générales d&rsquo;utilisation
                        </Link>
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="mentionsLegales"
                        required
                        value={mentionsLegales}
                        onChange={(e) => setMentionsLegales(e.target.checked)}
                      />
                      <label htmlFor="mentionsLegales">
                        J&rsquo;accepte les{" "}
                        <Link href="/mentions-legales" target="_blank">
                          mentions légales
                        </Link>
                      </label>
                    </div>
                  </div>
                  <button type="submit">S&rsquo;inscrire</button>
                </form>
              </div>
              <div className="footer__container__menu--navigation">
                <h4>Liens utiles</h4>
                <div className="footer__container__menu--navigation--link">
                  <Link href="/">Accueil</Link>
                  <Link href="/#dernieres-nouveautes">
                    Dernières nouveautées
                  </Link>
                  <Link href="/#dernier-test-materiel">
                    Dernier test matériel
                  </Link>
                  <Link href="/#FAQ">FAQ</Link>
                  <Link href="/a-propos">A propos</Link>
                  <Link href="/randonnee-trekking">Randonnée & Trekking</Link>
                  <Link href="/reviews-materiel">Tests & Avis Matériel</Link>
                  <Link href="/contact">Contact</Link>
                </div>
              </div>
              <div className="footer__container__menu--support">
                <h4>Supportez-nous</h4>
                <div className="footer__container__menu--support--link">
                  <Link href="/conditions-generales-utilisation">
                    Conditions Generales Utilisation
                  </Link>
                  <Link href="/politique-de-confidentialite">
                    Politique de confidentialité
                  </Link>
                  <Link href="/mentions-legales">Mentions Légales</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
