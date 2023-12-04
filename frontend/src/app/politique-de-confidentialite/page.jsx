import "../../styles/legalPage.scss";
import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité - BJ-Treklife",
  description:
    "Apprenez comment BJ-Treklife protège vos informations personnelles et respecte votre vie privée sur notre site de trek et randonnée.",
};

export default function Page() {
  const lastUpdate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="legal-page">
      <section>
        <h1>Politique de confidentialité</h1>
        <article>
          <h2>ARTICLE 1 : PRÉAMBULE</h2>
          <p>
            Cette politique de confidentialité informe les utilisateurs de
            BJ-Treklife :
          </p>
          <ul>
            <li>
              Sur la manière dont sont collectées leurs données personnelles.
              Sont considérées comme des données personnelles, toute information
              permettant d’identifier un utilisateur. A ce titre, il peut s’agir
              : de ses noms et prénoms, de son âge, de son adresse postale ou
              email, de sa localisation ou encore de son adresse IP (liste
              non-exhaustive)
            </li>
            <li>Sur les droits dont ils disposent concernant ces données</li>
            <li>
              Sur la personne responsable du traitement des données à caractère
              personnel collectées et traitées
            </li>
            <li>Sur les destinataires de ces données personnelles</li>
            <li>Sur la politique du site en matière de cookies.</li>
          </ul>
          <p>
            Cette politique complète les mentions légales et les Conditions
            Générales d’Utilisation consultables par les utilisateurs à
            l’adresse suivante :{" "}
            <Link href="/mentions-legales">Mentions légales</Link> et{" "}
            <Link href="/conditions-generales-utilisation">
              Conditions Générales d’Utilisation
            </Link>
          </p>
        </article>
        <article>
          <h2>
            ARTICLE 2 : PRINCIPES RELATIFS À LA COLLECTE ET AU TRAITEMENT DES
            DONNÉES PERSONNELLES
          </h2>
          <p>
            Conformément à l’article 5 du Règlement européen 2016/679, les
            données à caractère personnel sont :
          </p>
          <ul>
            <li>
              Traitées de manière licite, loyale et transparente au regard de la
              personne concernée
            </li>
            <li>
              Collectées pour des finalités déterminées (cf. Article 3.1 des
              présentes), explicites et légitimes, et ne pas être traitées
              ultérieurement d&rsquo;une manière incompatible avec ces finalités
            </li>
            <li>
              Adéquates, pertinentes et limitées à ce qui est nécessaire au
              regard des finalités pour lesquelles elles sont traitées
            </li>
            <li>
              Exactes et, si nécessaire, tenues à jour. Toutes les mesures
              raisonnables doivent être prises pour que les données à caractère
              personnel qui sont inexactes, eu égard aux finalités pour
              lesquelles elles sont traitées, soient effacées ou rectifiées sans
              tarder
            </li>
            <li>
              Conservées sous une forme permettant l&rsquo;identification des
              personnes concernées pendant une durée n&rsquo;excédant pas celle
              nécessaire au regard des finalités pour lesquelles elles sont
              traitées
            </li>
            <li>
              Traitées de façon à garantir une sécurité appropriée des données
              collectées, y compris la protection contre le traitement non
              autorisé ou illicite et contre la perte, la destruction ou les
              dégâts d&rsquo;origine accidentelle, à l&rsquo;aide de mesures
              techniques ou organisationnelles appropriées.
            </li>
          </ul>
          <p>
            Le traitement n&rsquo;est licite que si, et dans la mesure où, au
            moins une des conditions suivantes est remplie :
          </p>
          <ul>
            <li>
              La personne concernée a consenti au traitement de ses données à
              caractère personnel pour une ou plusieurs finalités spécifiques
            </li>
            <li>
              Le traitement est nécessaire à l&rsquo;exécution d&rsquo;un
              contrat auquel la personne concernée est partie ou à
              l&rsquo;exécution de mesures précontractuelles prises à la demande
              de celle-ci
            </li>
            <li>
              Le traitement est nécessaire au respect d&rsquo;une obligation
              légale à laquelle le responsable du traitement est soumis
            </li>
            <li>
              Le traitement est nécessaire à la sauvegarde des intérêts vitaux
              de la personne concernée ou d&rsquo;une autre personne physique
            </li>
            <li>
              Le traitement est nécessaire à l&rsquo;exécution d&rsquo;une
              mission d&rsquo;intérêt public ou relevant de l&rsquo;exercice de
              l&rsquo;autorité publique dont est investi le responsable du
              traitement
            </li>
            <li>
              Le traitement est nécessaire aux fins des intérêts légitimes
              poursuivis par le responsable du traitement ou par un tiers, à
              moins que ne prévalent les intérêts ou les libertés et droits
              fondamentaux de la personne concernée qui exigent une protection
              des données à caractère personnel, notamment lorsque la personne
              concernée est un enfant.
            </li>
          </ul>
        </article>
        <article>
          <h2>
            ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES
            DANS LE CADRE DE LA NAVIGATION SUR LE SITE
          </h2>
          <div>
            <h3>Article 3.1 : Données collectées</h3>
            <p>
              Les données personnelles collectées dans le cadre de notre blog
              sont les suivantes :
            </p>
            <ul>
              <li>
                noms et adresses e-mail pour l&rsquo;inscription à la
                newsletter, pseudos pour les commentaires, et éventuellement
                adresses IP via les outils analytiques pour les statistiques de
                visites et le suivi du nombre de lecteurs par page
              </li>
            </ul>
            <p>
              La collecte et le traitement de ces données répond aux finalités
              suivantes :
            </p>
            <ul>
              <li>assurer le suivi des statistiques de visites</li>
              <li>
                analyser le nombre de lecteurs par page pour améliorer le
                contenu proposé
              </li>
              <li>gérer l&rsquo;envoi de newsletters aux abonnés</li>
              <li>
                et modérer les commentaires pour maintenir un espace respectueux
                et constructif.
              </li>
            </ul>
          </div>
          <div>
            <h3>Article 3.2 : Mode de collecte des données</h3>
            <p>
              Lorsque vous utilisez notre site, sont automatiquement collectées
              les données suivantes :
            </p>
            <ul>
              <li>
                Google Analytics : Après acceptation des cookies par
                l&rsquo;utilisateur, nous utilisons Google Analytics pour
                collecter des données sur la manière dont nos visiteurs
                interagissent avec le site, y compris le suivi des statistiques
                de visites et le nombre de lecteurs par page. Cette information
                est utilisée pour améliorer continuellement l&rsquo;expérience
                utilisateur sur BJ-Treklife.
              </li>
            </ul>
            <p>
              Les données personnelles sont collectées uniquement lorsque vous
              effectuez les opérations suivantes sur la plateforme :
            </p>
            <ul>
              <li>
                Inscription à la newsletter : Nous collectons votre nom et
                adresse e-mail lorsque vous vous abonnez à notre newsletter,
                afin de vous envoyer des mises à jour et des informations
                concernant BJ-Treklife.
              </li>
              <li>
                Commentaires : Si vous laissez un commentaire sur le site, nous
                collectons le pseudo que vous utilisez pour identifier votre
                commentaire publiquement, tandis que l&rsquo;adresse e-mail
                associée est conservée confidentiellement pour la gestion des
                commentaires et la modération.
              </li>
            </ul>
            <p>
              Ces données sont collectées avec votre consentement explicite et
              sont utilisées exclusivement pour les finalités mentionnées.
              <br />
              <br />
              Les données collectées via les formulaires de newsletter et de
              commentaires sont conservées indéfiniment ou jusqu&rsquo;à ce
              qu&rsquo;un utilisateur demande explicitement leur suppression, ce
              qui peut être fait à tout moment via notre formulaire de contact.
              <br />
              <br />
              Pour les données collectées par Google Analytics après acceptation
              des cookies, la durée de conservation est définie par les
              politiques de Google. Nous ne contrôlons pas ces durées de
              conservation. Cependant, les utilisateurs ont la possibilité de
              retirer à tout moment leur consentement au suivi de Google
              Analytics en utilisant le bouton situé en bas à droite de
              l&rsquo;écran, qui permet de réinitialiser les cookies et de
              refaire des choix concernant leur consentement.
              <br />
              <br />
              Nous nous engageons à ne pas conserver les données personnelles
              au-delà de la durée nécessaire à la réalisation des finalités pour
              lesquelles elles sont traitées, sauf en cas d&rsquo;exigences
              légales ou réglementaires qui nous obligeraient à conserver
              certaines données pour une période plus longue.
            </p>
          </div>
          <div>
            <h3>Article 3.3 : Hébergement des données</h3>
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
          </div>
          <div>
            <h3>Article 3.4 : Transmission des données à des tiers</h3>
            <p>
              Les données personnelles collectées par BJ-Treklife ne sont pas
              partagées avec des tiers, excepté dans le cadre de services tiers
              nécessaires au fonctionnement du site, tels que Google Analytics
              pour le suivi des statistiques de visites, sous réserve que les
              utilisateurs aient donné leur consentement pour ces cookies et ce
              suivi.
            </p>
          </div>
          <div>
            <h3>Article 3.5 : Politique en matière de “cookies”</h3>
            <p>
              BJ-Treklife utilise des cookies pour améliorer l&rsquo;expérience
              utilisateur et pour collecter des données analytiques via Google
              Analytics seulement après que l&rsquo;utilisateur a donné son
              consentement. Les utilisateurs ont la possibilité de retirer ce
              consentement à tout moment via le bouton de réinitialisation des
              cookies situé en bas à droite de l&rsquo;écran, ce qui permet
              également de refaire des choix concernant leur consentement aux
              cookies.
            </p>
          </div>
        </article>
        <article>
          <h2>
            ARTICLE 4 : RESPONSABLE DU TRAITEMENT DES DONNÉES ET DÉLÉGUÉ À LA
            PROTECTION DES DONNÉES
          </h2>
          <div>
            <h3>Article 4.1 : Le responsable du traitement des données</h3>
            <p>
              Les données à caractère personnel sont collectées par Joris
              Benmehal, en tant qu&rsquo;individu, opérant le site BJ-Treklife à
              but non lucratif. En l&rsquo;absence d&rsquo;une forme juridique
              ou d&rsquo;immatriculation commerciale, il agit en tant que
              responsable unique du traitement des données personnelles
              collectées sur le site.
              <br />
              <br />
              Le responsable du traitement des données à caractère personnel
              peut être contacté de la manière suivante :
              <br />
              <br />
              Par mail:{" "}
              <a href="mailto:benmehal.joris@gmail.com">
                benmehal.joris@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h3>Article 4.2 : Le délégué à la protection des données</h3>
            <p>
              Étant donné que BJ-Treklife est un site géré individuellement par
              Joris Benmehal à but non lucratif et n&rsquo;engage pas une
              quantité de données personnelles qui nécessiterait la nomination
              d&rsquo;un DPO selon les directives du RGPD, toutes les questions,
              demandes ou préoccupations concernant la protection des données
              peuvent être adressées directement au responsable du traitement
              des données :
              <br />
              <br />
              Joris Benmehal <br /> Adresse e-mail :
              <a href="mailto:benmehal.joris@gmail.com">
                benmehal.joris@gmail.com
              </a>
              <br />
              <br />
              Si vous estimez, après nous avoir contactés, que vos droits
              “Informatique et Libertés” ne sont pas respectés, vous avez le
              droit d&rsquo;adresser une réclamation à la CNIL.
            </p>
          </div>
        </article>
        <article>
          <h2>
            ARTICLE 5 : LES DROITS DE L’UTILISATEUR EN MATIÈRE DE COLLECTE ET DE
            TRAITEMENT DES DONNÉES
          </h2>
          <p>
            Tout utilisateur concerné par le traitement de ses données
            personnelles peut se prévaloir des droits suivants, en application
            du règlement européen 2016/679 et de la Loi Informatique et Liberté
            (Loi 78-17 du 6 janvier 1978) :
          </p>
          <ul>
            <li>
              Droit d’accès, de rectification et droit à l’effacement des
              données (posés respectivement aux articles 15, 16 et 17 du RGPD)
            </li>
            <li>Droit à la portabilité des données (article 20 du RGPD)</li>
            <li>
              Droit à la limitation (article 18 du RGPD) et à l’opposition du
              traitement des données (article 21 du RGPD)
            </li>
            <li>
              Droit de ne pas faire l’objet d’une décision fondée exclusivement
              sur un procédé automatisé
            </li>
            <li>Droit de déterminer le sort des données après la mort</li>
            <li>
              Droit de saisir l’autorité de contrôle compétente (article 77 du
              RGPD).
            </li>
          </ul>
          <p>
            Pour exercer vos droits relatifs à vos données personnelles (accès,
            rectification, suppression, etc.), vous pouvez adresser votre
            demande exclusivement par mail à Joris Benmehal, responsable du
            traitement des données de BJ-Treklife, à l&rsquo;adresse suivante :
            <a href="mailto:benmehal.joris@gmail.com">
              benmehal.joris@gmail.com
            </a>
            .
          </p>
          <p>
            Afin de traiter votre demande, il peut vous être demandé de fournir
            des informations complémentaires telles que votre nom complet et
            votre adresse e-mail associée à notre site. Ces informations sont
            nécessaires pour authentifier votre demande et répondre efficacement
            à vos préoccupations.
          </p>
          <p>
            Pour plus d&rsquo;informations sur vos droits, vous pouvez consulter
            le site de la Commission Nationale de l&rsquo;Informatique et des
            Libertés (CNIL) à l&rsquo;adresse <Link href="www.cnil.fr" />.
          </p>
        </article>
        <article>
          <h2>
            ARTICLE 6 : CONDITIONS DE MODIFICATION DE LA POLITIQUE DE
            CONFIDENTIALITÉ
          </h2>
          <p>
            L&rsquo;éditeur du site BJ-Treklife, Joris Benmehal, se réserve le
            droit de modifier la présente Politique de Confidentialité à tout
            moment afin d&rsquo;assurer sa conformité avec le droit en vigueur
            et les meilleures pratiques de protection des données personnelles.
            <br />
            <br />
            Les utilisateurs sont invités à consulter régulièrement cette
            Politique pour se tenir informés des éventuelles mises à jour qui
            pourraient être apportées.
            <br />
            <br />
            La présente politique a été éditée le 24/11/2023 et la dernière mise
            à jour a été effectuée le {lastUpdate}.
          </p>
        </article>
      </section>
    </main>
  );
}
