import Timeline from "@/components/Timeline/Timeline";
import "./AboutMe.scss";
import SectionTag from "@/components/SectionTag/SectionTag";
import GreenButton from "@/components/GreenButton/GreenButton";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__title">
        <div className="about-me__title--h2">
          <SectionTag name="A propos" />
          <h3>Benmehal Joris</h3>
        </div>
        <div className="about-me__title--p">
          <p>
            Bienvenue ! Je suis Joris Benmehal, 23 ans, un développeur
            full-stack avec une passion pour la montagne et la photographie. Mon
            parcours unique, marqué par un accident de la route, m&rsquo;a
            rapproché de la nature et a aiguisé mon œil pour capturer sa beauté.
            Ici, je partage mon amour pour les sentiers montagneux et la
            création numérique.
          </p>
          <p className="second-desc">
            Les pistes de ski alpin de mon enfance, et un accident en mars 2018,
            ont profondément marqué mon lien avec la montagne. Ces épreuves de 3
            années ont transformé les périodes de convalescence en une quête de
            liberté, me poussant vers les treks et les expéditions qui
            définissent aujourd&rsquo;hui mon existence. Ce blog est le reflet
            de cette métamorphose, une vitrine de mon aventure personnelle et
            des connaissances acquises au fil des sentiers parcourus et des
            vallées traversées.
          </p>
          <div className="about-me--button desktopBtn">
            <GreenButton name="En savoir plus" url="/a-propos" />
          </div>
        </div>
      </div>
      <div className="about-me__timeline">
        <Timeline />
      </div>
      <div className="about-me--button mobileBtn">
        <GreenButton name="En savoir plus" url="/a-propos" />
      </div>
    </section>
  );
}

export default AboutMe;
