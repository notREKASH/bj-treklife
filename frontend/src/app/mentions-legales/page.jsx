import "../../styles/legalPage.scss";
import Link from "next/link";

export default function Page() {
  return (
    <main className="legal-page">
      <section>
        <h1>Mentions légales</h1>
        <p>
          En vigueur depuis le 23/11/23, dernière modification le 23/11/2023
        </p>
        <p>
          Conformément aux dispositions des Articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie
          numérique, dite L.C.E.N., il est porté à la connaissance des
          utilisateurs et visiteurs, ci-après l&rsquo; “Utilisateur”, du site
          BJ-Treklife , ci-après le &rdquo;Site&rdquo;, les présentes mentions
          légales.
        </p>
        <p>
          La connexion et la navigation sur le Site par l’Utilisateur implique
          l&rsquo;acceptation intégrale et sans réserve des présentes mentions
          légales.
          <br />
          <br />
          Ces dernières sont accessibles sur le Site à l&rsquo;adresse suivante
          :{" "}
          <Link href="/mentions-legales">
            https://www.bj-treklife.com/mentions-legales
          </Link>
        </p>
        <article>
          <h2>ARTICLE 1 - L&rsquo;ÉDITEUR</h2>
          <p>
            L&rsquo;édition du site BJ-Treklife est assurée par Joris Benmehal,
            opérant en tant que personne physique.
            <br />
            Contact :{" "}
            <a href="mailto:benmehal.joris@gmail.com">
              benmehal.joris@gmail.com
            </a>
            .
            <br />
            <br />
            ci-après l&rsquo;&rdquo;Éditeur&rdquo;.
          </p>
        </article>
        <article>
          <h2>ARTICLE 2 - L&rsquo;HÉBERGEUR</h2>
          <div>
            <p>
              Le site BJ-Treklife est hébergé par Vercel, Inc. <br />
              Vercel Inc.
            </p>
            <address>
              440 N Barranca Ave #4133
              <br />
              Covina, CA 91723
            </address>
            <a href="mailto:privacy@vercel.com">privacy@vercel.com</a>
          </div>
        </article>
        <article>
          <h2>ARTICLE 3 - ACCÈS AU SITE</h2>
          <p>
            Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de
            force majeure, interruption programmée ou non et pouvant découlant
            d’une nécessité de maintenance.
            <br />
            <br />
            En cas de modification, interruption ou suspension du Site,
            l&rsquo;Éditeur ne saurait être tenu responsable.
          </p>
        </article>
        <article>
          <h2>ARTICLE 4 - COLLECTE DES DONNÉES</h2>
          <p>
            Le Site assure à l&rsquo;Utilisateur une collecte et un traitement
            d&rsquo;informations personnelles dans le respect de la vie privée
            conformément à la loi n°78-17 du 6 janvier 1978 relative à
            l&rsquo;informatique, aux fichiers et aux libertés.
          </p>
          <p>
            En vertu de la loi Informatique et Libertés, en date du 6 janvier
            1978, l&rsquo;Utilisateur dispose d&rsquo;un droit d&rsquo;accès, de
            rectification, de suppression et d&rsquo;opposition de ses données
            personnelles. L&rsquo;Utilisateur exerce ce droit :
          </p>
          <ul>
            <li>via un formulaire de contact</li>
          </ul>
          <p>
            Toute utilisation, reproduction, diffusion, commercialisation,
            modification de toute ou partie du Site, sans autorisation de
            l’Éditeur est prohibée et pourra entraîner des actions et poursuites
            judiciaires telles que notamment prévues par le Code de la propriété
            intellectuelle et le Code civil.
            <br />
            <br />
            Pour plus d’informations, se reporter aux CGU du site BJ-Treklife
            accessible:{" "}
            <Link href="/conditions-generales-utilisation">
              https://www.bj-treklife.com/conditions-generales-utilisation
            </Link>
            <br />
            <br />
            Pour plus d&rsquo;informations en matière de protection des données
            à caractère personnel et de cookies, se reporter à la politique de
            confidentialité du site BJ-Treklife accessible:{" "}
            <Link href="/politique-de-confidentialite">
              https://www.bj-treklife.com/politique-de-confidentialite
            </Link>
          </p>
        </article>
      </section>
    </main>
  );
}
