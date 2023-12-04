import "./a-propos.scss";
import Image from "next/image";

export const metadata = {
  title: "A Propos - BJ-Treklife",
  description:
    "Rencontrez Joris Benmehal, un développeur web passionné de montagne, de trekking et de photographie, partageant son amour pour l'aventure et la nature.",
};

export default function Page() {
  return (
    <div className="a-propos">
      <h1>À propos</h1>
      <div className="a-propos__container">
        <div className="a-propos__container__mobile">
          <p>
            Bienvenue ! Je suis Joris Benmehal, 23 ans, un développeur
            full-stack avec une passion pour la montagne et la photographie. Mon
            parcours unique, marqué par un accident de la route, m&rsquo;a
            rapproché de la nature et a aiguisé mon œil pour capturer sa beauté.
            Ici, je partage mon amour pour les sentiers montagneux et la
            création numérique.
          </p>
          <Image
            src="https://live.staticflickr.com/65535/53320518690_b50061d641_b.jpg"
            alt="Benmehal Joris avec une capuche sur la tête"
            width={1000}
            height={1000}
            quality={100}
          />
          <p>
            Les pistes de ski alpin de mon enfance, et un accident en mars 2018,
            ont profondément marqué mon lien avec la montagne. Ces épreuves de 3
            années ont transformé les périodes de convalescence en une quête de
            liberté, me poussant vers les treks et les expéditions qui
            définissent aujourd&rsquo;hui mon existence. Ce blog est le reflet
            de cette métamorphose, une vitrine de mon aventure personnelle et
            des connaissances acquises au fil des sentiers parcourus et des
            vallées traversées.
          </p>
          <p>
            Ici, vous ne trouverez pas seulement des itinéraires ou des revues
            d&rsquo;équipement, mais des récits authentiques
            d&rsquo;explorations et des partages d&rsquo;expériences. Mon
            objectif est de vous offrir une perspective sincère et
            bienveillante, un accompagnement pour ceux qui, comme moi, ont
            trouvé dans la randonnée une source d&rsquo;inspiration et de
            résilience.
          </p>
          <Image
            src="https://live.staticflickr.com/65535/53334058083_5dd884f035_b.jpg"
            alt="Benmehal Joris dans les airs en ski avec une trainée de poudreuse derrière lui avec les skis en parallèle"
            width={1000}
            height={1000}
            quality={100}
          />
          <p>
            Ce blog est une invitation à vous joindre à mon voyage, à découvrir
            comment les défis personnels se transforment en leçons universelles.
            C&rsquo;est un appel à la communauté des esprits aventureux, à ceux
            qui souhaitent repousser les frontières de leur monde connu.
            Bienvenue dans un espace où chaque récit est une trace laissée pour
            guider, inspirer et rassembler.
          </p>
        </div>
        <div className="a-propos__container__desktop">
          <div className="a-propos__container__desktop__content1">
            <Image
              src="https://live.staticflickr.com/65535/53320518690_b50061d641_b.jpg"
              alt="Benmehal Joris avec une capuche sur la tête"
              width={1000}
              height={1000}
              quality={100}
            />
            <div className="a-propos__container__desktop__content1--text">
              <p>
                Bienvenue ! Je suis Joris Benmehal, 23 ans, un développeur
                full-stack avec une passion pour la montagne et la photographie.
                Mon parcours unique, marqué par un accident de la route,
                m&rsquo;a rapproché de la nature et a aiguisé mon œil pour
                capturer sa beauté. Ici, je partage mon amour pour les sentiers
                montagneux et la création numérique.
              </p>
              <p>
                Les pistes de ski alpin de mon enfance, et un accident en mars
                2018, ont profondément marqué mon lien avec la montagne. Ces
                épreuves de 3 années ont transformé les périodes de
                convalescence en une quête de liberté, me poussant vers les
                treks et les expéditions qui définissent aujourd&rsquo;hui mon
                existence. Ce blog est le reflet de cette métamorphose, une
                vitrine de mon aventure personnelle et des connaissances
                acquises au fil des sentiers parcourus et des vallées
                traversées.
              </p>
            </div>
          </div>
          <div className="a-propos__container__desktop__content2">
            <div className="a-propos__container__desktop__content2--text">
              <p>
                Ici, vous ne trouverez pas seulement des itinéraires ou des
                revues d&rsquo;équipement, mais des récits authentiques
                d&rsquo;explorations et des partages d&rsquo;expériences. Mon
                objectif est de vous offrir une perspective sincère et
                bienveillante, un accompagnement pour ceux qui, comme moi, ont
                trouvé dans la randonnée une source d&rsquo;inspiration et de
                résilience.
              </p>
              <p>
                Ce blog est une invitation à vous joindre à mon voyage, à
                découvrir comment les défis personnels se transforment en leçons
                universelles. C&rsquo;est un appel à la communauté des esprits
                aventureux, à ceux qui souhaitent repousser les frontières de
                leur monde connu. Bienvenue dans un espace où chaque récit est
                une trace laissée pour guider, inspirer et rassembler.
              </p>
            </div>
            <Image
              src="https://live.staticflickr.com/65535/53334058083_5dd884f035_b.jpg"
              alt="Benmehal Joris dans les airs en ski avec une trainée de poudreuse derrière lui avec les skis en parallèle"
              width={1000}
              height={1000}
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
