import Link from "next/link";
import "./Newsletter.scss";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Newsletter() {
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
      .post(`${process.env.NEXT_PUBLIC_API_URL}/newsLetter`, newsletterData)
      .then(() => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/sendmail/newsletter`,
            newsletterData
          )
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
            toast.error(`${err.response.data.message}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            })
          );
      })
      .catch((err) =>
        toast.error(`${err.response.data.message}`, {
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
    setPrivacyPolicy(!privacyPolicy);
    setCgu(!cgu);
    setMentionsLegales(!mentionsLegales);
  };

  return (
    <div className="newsletter">
      <h3>Newsletter</h3>
      <p>
        Abonnez-vous à notre newsletter pour recevoir les dernières actualités
        et les mises à jour directement dans votre boîte de réception.
      </p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <div className="newsletter__form__field">
          <div className="newsletter__form__field__name">
            <label htmlFor="firstName-newsletter">Prénom</label>
            <input
              type="text"
              id="firstName-newsletter"
              name="firstName-newsletter"
              placeholder="Votre prénom"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName-newsletter">Nom</label>
            <input
              type="text"
              id="lastName-newsletter"
              name="lastName-newsletter"
              placeholder="Votre nom"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <label htmlFor="email-newsletter">Email</label>
          <input
            type="email"
            id="email-newsletter"
            name="email-newsletter"
            placeholder="Votre email"
            value={email}
            autoComplete="email"
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className="newsletter__form__consent">
          <div>
            <input
              type="checkbox"
              id="privacyPolicy-newsletter"
              required
              value={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.checked)}
            />
            <label htmlFor="privacyPolicy-newsletter">
              J&rsquo;accepte la{" "}
              <Link href="/politique-de-confidentialite" target="_blank">
                politique de confidentialité
              </Link>
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="cgu-newsletter"
              required
              value={cgu}
              onChange={(e) => setCgu(e.target.checked)}
            />
            <label htmlFor="cgu-newsletter">
              J&rsquo;accepte les{" "}
              <Link href="/conditions-generales-utilisation" target="_blank">
                conditions générales d&rsquo;utilisation
              </Link>
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="mentionsLegales-newsletter"
              required
              value={mentionsLegales}
              onChange={(e) => setMentionsLegales(e.target.checked)}
            />
            <label htmlFor="mentionsLegales-newsletter">
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
  );
}

export default Newsletter;
