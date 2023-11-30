"use client";
import "./particulier.scss";

export default function Particulier() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    });
  };

  return (
    <div className="particulier">
      <h1>Page de contact particulier</h1>
      <div className="particulier__container">
        <form onSubmit={handleSubmit} className="particulier__container__form">
          <div className="particulier__container__form__name">
            <div>
              <label htmlFor="firstName">
                Prénom: <span style={{ color: "red" }}>*</span>
              </label>
              <input id="firstName" name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                Nom: <span style={{ color: "red" }}>*</span>
              </label>
              <input id="lastName" name="lastName" type="text" />
            </div>
          </div>
          <div className="particulier__container__form__email">
            <label htmlFor="email">
              Email: <span style={{ color: "red" }}>*</span>
            </label>
            <input id="email" name="email" type="email" />
          </div>
          <div className="particulier__container__form__subject">
            <label htmlFor="subject">
              Objet de contact: <span style={{ color: "red" }}>*</span>
            </label>
            <select id="subject" name="subject">
              <option value={null}>-- Choissiez une objet de contact --</option>
              <option value={1}>Sujet 1</option>
              <option value={2}>Sujet 2</option>
              <option value={3}>Sujet 3</option>
            </select>
          </div>
          <div className="particulier__container__form__message">
            <label htmlFor="message">
              Message: <span style={{ color: "red" }}>*</span>
            </label>
            <textarea id="message" name="message" />
          </div>
          <div className="particulier__container__form__submit">
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
