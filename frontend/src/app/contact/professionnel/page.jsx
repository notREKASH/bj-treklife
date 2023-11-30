"use client";

export default function Professionnel() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      company: data.get("company"),
      phone: data.get("phone"),
      address: data.get("address"),
      subject: data.get("subject"),
      message: data.get("message"),
    });
  };

  return (
    <>
      <h1>Page de contact professionnel</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="firstName">Prénom</label>
              <input id="firstName" name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">Nom</label>
              <input id="lastName" name="lastName" type="text" />
            </div>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div>
            <label htmlFor="company">Société</label>
            <input id="company" name="company" type="text" />
          </div>
          <div>
            <label htmlFor="phone">Téléphone</label>
            <input id="phone" name="phone" type="text" />
          </div>
          <div>
            <label htmlFor="address">Adresse</label>
            <input id="address" name="address" type="text" />
          </div>
          <div>
            <select id="subject" name="subject">
              <option value={null}>Choisissez un sujet</option>
              <option value={1}>Sujet 1</option>
              <option value={2}>Sujet 2</option>
              <option value={3}>Sujet 3</option>
            </select>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" />
          </div>
          <div>
            <button type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    </>
  );
}
