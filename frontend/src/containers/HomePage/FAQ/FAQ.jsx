"use client";
import "./FAQ.scss";
import { useState } from "react";
import Image from "next/image";

const faqQuestion = [
  {
    id: 1,
    question: "Comment choisis-tu tes itinéraires de trek ?",
    answer:
      "Je base mon choix d'itinéraires principalement sur leur proximité par rapport à mon domicile et leur durée. Après cela, j'évalue la difficulté en examinant des tracés pour adapter le matériel nécessaire. Lorsque je me déplace, je favorise des parcours qui me font découvrir la région et, dans certains cas, m'offrent un aperçu du terrain pour des treks plus longs à l'avenir. Pour simplifier, je prends en compte la distance en KM, le dénivelé positif et négatif, l'altitude, les panoramas et les points d'intérêt. Je consulte également internet pour visualiser des images de l'itinéraire, afin de juger de son intérêt.",
  },
  {
    id: 2,
    question: "Quel matériel recommandes-tu pour un débutant en trekking ?",
    answer:
      "Le trekking peut être onéreux, mais il est crucial de choisir du matériel qui vous convient. Ainsi, vous évitez des désagréments comme les irritations ou les équipements fragiles. Pour ma part, j'ai opté pour des chaussures Salewa pour leur système 3F, offrant une meilleure stabilité, et leur laçage inspiré de l'escalade, pour une précision accrue. Quant aux sacs à dos, après avoir commencé avec un modèle basique de chez Decathlon à 45€ de 20L pour 1300g, j'ai rapidement opté pour des marques reconnues comme Osprey et leurs modèles Atmos 65ag avec le système innovant Anti-Gravity, ainsi que l'Exos 48 que j'ai acquis récemment.",
  },
  {
    id: 3,
    question: "Comment envisages-tu les collaborations avec les marques ?",
    answer:
      "Je conçois les collaborations comme une opportunité de partage et d'échange. Je souhaite mettre en avant des produits ou services qui reflètent vraiment ma passion et mon expérience sur le terrain. Pour moi, il est essentiel que toute collaboration soit authentique et bénéfique pour ma communauté.",
  },
  {
    id: 4,
    question:
      "Quels sont tes critères pour tester et donner un avis sur le matériel ?",
    answer:
      "Avant tout achat, je me renseigne en profondeur et compare avec d'autres modèles équivalents. Une fois mon choix arrêté, je suis impatient de le tester en conditions réelles. Par exemple, pour l'Exos 48, je l'ai chargé exactement comme je le ferais pour le GR738, afin d'évaluer ses atouts et ses faiblesses. Même si mon avis est subjectif, je m'efforce de le rendre le plus objectif possible, en tenant compte de la globalité et de la technicité du matériel. Je cherche toujours à donner un feedback honnête et utile, basé sur mon expérience personnelle.",
  },
];

function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleCollapse = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <section className="faq" id="FAQ">
        <div className="faq__leftContent">
          <h3>Foire aux Questions</h3>
          <div className="faq__leftContent__container">
            <div className="faq__leftContent__container__content">
              {faqQuestion.map((question) => (
                <div
                  className="faq__leftContent__container__content--item"
                  key={question.id}
                >
                  <div
                    className="faq__leftContent__container__content--item--question"
                    onClick={() => toggleCollapse(question.id)}
                  >
                    <h4>{question.question}</h4>
                    <div className="faq__leftContent__container__content--item--question--span">
                      {openId === question.id ? <span>-</span> : <span>+</span>}
                    </div>
                  </div>
                  <div
                    className={`faq__leftContent__container__content--item--answer ${
                      openId === question.id ? "open" : ""
                    }`}
                  >
                    <p>{question.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="faq__img">
          <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            src="/images/faq.webp"
            alt="Photo de moi sur un Pic des Aiguilles de Baulmes en suisse, avec vu sur le Lac de Neuchatel"
            quality={90}
            width={6240}
            height={4160}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>
    </>
  );
}

export default FAQ;
