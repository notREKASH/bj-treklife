import "./HeroBanner.scss";
import Image from "next/image";

function HeroBanner() {
  return (
    <>
      <div className="home__background">
        <div className="home__background--title">
          <h2>
            Guidé par le murmure des forêts et l&rsquo;appel des montagnes
          </h2>
          <h3>
            Découvrez au rythme de <br className="lineBreak" /> mes pas, et
            vivez le tous au vôtre. L&rsquo;art de voyager à pieds
          </h3>
        </div>
        <div className="home__background__img">
          <Image
            placeholder="blur"
            blurDataURL="/images/backgroundHome.webp"
            src="/images/backgroundHome.webp"
            width={5464}
            height={3640}
            quality={100}
            alt="Photo d'un couché de soleil sur le point de vue de Mouthier Haut Pierre dans le Doubs 25"
            style={{
              width: "100%",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default HeroBanner;
