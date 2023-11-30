"use client";

import { useEffect, useState, useMemo } from "react";
import "./Timeline.scss";
const data = [
  {
    id: 1,
    title: "Un trek Mémorable",
    content:
      "La Belledonne est l'une des chaînes montagneuses que j'ai parcourues, mais son massif se démarque nettement. Le GRP des 7 Laux que j'ai récemment effectué a été une véritable révélation, autant par sa beauté époustouflante que par le défi physique qu'il représentait.",
  },
  {
    id: 2,
    title: "Leçon Apprise sur le Terrain",
    content:
      "La montagne m'a enseigné que nous ne pouvons jamais tout anticiper. Malgré mes tentatives de préparation méticuleuse, j'ai déjà été pris au dépourvu, notamment en matière d'hydratation. J'ai subi une fois un manque d'eau sur 3 km sous un soleil de plomb, une erreur que je ne commettrai plus.",
  },
  {
    id: 3,
    title: "Destination Coup de Cœur",
    content:
      "Deux treks m'attirent particulièrement : le GR738 et le TMB. Ayant grandi entouré de montagnes, ces treks sont sur ma liste pour 2024. Ils symbolisent à la fois le défi personnel et l'appel de paysages majestueux et de l'air pur des sommets.",
  },
  {
    id: 4,
    title: "Collaboration la Plus Enrichissante",
    content:
      "Bien que je finance moi-même tout mon équipement, certaines marques ont gagné mon respect et ma loyauté. Osprey, Salewa et Millet se distinguent par leur avancée technologique. Vous pouvez d'ailleurs retrouver mon avis sur ces équipements dans la section 'Tests & Avis Matériel'.",
  },
  {
    id: 5,
    title: "Prochain Grand Défi",
    content:
      "Si le trekking reste mon activité principale, l'appel de l'alpinisme se fait de plus en plus ressentir. Étant un freerider et freestyler de naissance, ayant grandi sur des skis, des sommets emblématiques comme le Mont-Blanc et le Cervin m'appellent et méritent d'être conquis.",
  },
];

function Timeline() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const zone = useMemo(() => {
    if (windowWidth <= 375) {
      return [
        { start: 0, end: 150 },
        { start: 150, end: 400 },
        { start: 400, end: 600 },
        { start: 600, end: 800 },
        { start: 800, end: 1000 },
      ];
    } else if (windowWidth <= 425) {
      return [
        { start: 0, end: 150 },
        { start: 150, end: 350 },
        { start: 350, end: 600 },
        { start: 600, end: 800 },
        { start: 800, end: 1200 },
      ];
    } else if (windowWidth <= 568) {
      return [
        { start: 0, end: 90 },
        { start: 90, end: 250 },
        { start: 250, end: 350 },
        { start: 350, end: 500 },
        { start: 500, end: 700 },
      ];
    } else if (windowWidth <= 667) {
      return [
        { start: 0, end: 90 },
        { start: 90, end: 250 },
        { start: 250, end: 350 },
        { start: 350, end: 415 },
        { start: 415, end: 700 },
      ];
    } else if (windowWidth <= 768) {
      return [
        { start: 0, end: 90 },
        { start: 90, end: 250 },
        { start: 250, end: 350 },
        { start: 350, end: 420 },
        { start: 420, end: 700 },
      ];
    } else if (windowWidth <= 1023) {
      return [
        { start: 0, end: 90 },
        { start: 90, end: 250 },
        { start: 250, end: 400 },
        { start: 400, end: 500 },
        { start: 500, end: 700 },
      ];
    } else if (windowWidth >= 1024) {
      return [
        { start: 0, end: 90 },
        { start: 90, end: 250 },
        { start: 250, end: 400 },
        { start: 400, end: 500 },
        { start: 500, end: 700 },
      ];
    }
    return [];
  }, [windowWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      const currentScrollTop = event.target.scrollTop;
      let currentZoneIndex;

      for (let i = 0; i < zone?.length; i++) {
        if (
          currentScrollTop >= zone[i].start &&
          currentScrollTop <= zone[i].end
        ) {
          currentZoneIndex = i;
          break;
        }
      }

      const dots = document.querySelectorAll(".dots"); // Supposons que chaque point ait la classe "point"
      dots.forEach((dot, index) => {
        if (index === currentZoneIndex) {
          dot.classList.add("activeDots");
        } else {
          dot.classList.remove("activeDots");
        }
      });

      const cardItem = document.querySelectorAll(".timeline__container__item");
      cardItem.forEach((item, index) => {
        if (index === currentZoneIndex) {
          item.classList.add("activeItem");
        } else {
          item.classList.remove("activeItem");
        }
      });
    };

    const timeline = document.querySelector(".timeline");
    timeline.addEventListener("scroll", handleScroll);

    return () => {
      timeline.removeEventListener("scroll", handleScroll);
    };
  }, [zone]);

  return (
    <>
      <div className="timeline scrollBarAbout">
        <div className="timeline__container">
          {data.map((data) => (
            <div key={data.id} className="timeline__container__item ">
              <p className="dots"></p>
              <div className="timeline__container__item--card">
                <h4>{data.title}</h4>
                <p>{data.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Timeline;
