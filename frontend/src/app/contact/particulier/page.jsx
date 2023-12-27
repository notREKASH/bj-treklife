"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./particulier.scss";
import { faHiking } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Particulier() {
  const [selectValue, setSelectValue] = useState("");
  const form = useRef(null);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sendmail/contact`,
        {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          privacyPolicy:
            data.get("privacyPolicy") === "accepted" ? true : false,
          cgu: data.get("cgu") === "accepted" ? true : false,
          mentionsLegales:
            data.get("mentionsLegales") === "accepted" ? true : false,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    form.current.reset();
  };

  return (
    <div className="particulier">
      <div className="particulier__backgroundImage"></div>
      <div className="particulier__container">
        <div className="particulier__container--ico">
          <FontAwesomeIcon icon={faHiking} />
        </div>
        <h1>Contact</h1>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="particulier__container__form">
          <div className="particulier__container__form__name">
            <div>
              <label htmlFor="lastName">
                Nom: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="on"
              />
            </div>
            <div>
              <label htmlFor="firstName">
                Prénom: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="on"
              />
            </div>
          </div>
          <div className="particulier__container__form__email">
            <label htmlFor="email">
              Email: <span style={{ color: "red" }}>*</span>
            </label>
            <input id="email" name="email" type="email" autoComplete="off" />
          </div>
          <div className="particulier__container__form__subject">
            <label htmlFor="subject">
              Objet de contact: <span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={selectValue}
              onChange={handleChange}>
              <option value="" disabled>
                -- Choissiez une objet de contact --
              </option>
              <option value="Conseil de Trekking">Conseils de trekking</option>
              <option value="Equipement et materiel">
                Équipement et matériel
              </option>
              <option value="Traces GPX">Tracés GPX</option>
              <option value="RGPD et newsletter">RGPD et newsletter</option>
              <option value="Autres questions">Autres questions</option>
            </select>
          </div>
          <div className="particulier__container__form__message">
            <label htmlFor="message">
              Message: <span style={{ color: "red" }}>*</span>
            </label>
            <textarea id="message" name="message" />
          </div>
          <div className="particulier__container__form__rgpd">
            <div>
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                value="accepted"
              />
              <label htmlFor="privacyPolicy">
                J&rsquo;accepte la{" "}
                <Link href="/politique-de-confidentialite" target="_blank">
                  politique de confidentialité
                </Link>
              </label>
            </div>
            <div>
              <input type="checkbox" id="cgu" name="cgu" value="accepted" />
              <label htmlFor="cgu">
                J&rsquo;accepte les{" "}
                <Link href="/conditions-generales-utilisation" target="_blank">
                  conditions générales d&rsquo;utilisation
                </Link>
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="mentionsLegales"
                name="mentionsLegales"
                value="accepted"
              />
              <label htmlFor="mentionsLegales">
                J&rsquo;accepte les{" "}
                <Link href="/mentions-legales" target="_blank">
                  mentions légales
                </Link>
              </label>
            </div>
          </div>
          <div className="particulier__container__form__submit">
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
