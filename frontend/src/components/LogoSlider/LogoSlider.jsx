import "./LogoSlider.scss";
import Image from "next/image";

const LogoData = [
  {
    id: 1,
    src: "/images/logo-blackdiamond.webp",
    alt: "Logo de la marque Black Diamond",
  },
  {
    id: 2,
    src: "/images/logo-msr.webp",
    alt: "Logo de la marque MSR",
  },
  {
    id: 3,
    src: "/images/logo-nemo.webp",
    alt: "Logo de la marque Nemo",
  },
  {
    id: 4,
    src: "/images/logo-osprey.webp",
    alt: "Logo de la marque Osprey",
  },
  {
    id: 5,
    src: "/images/logo-petzl.webp",
    alt: "Logo de la marque Petzl",
  },
  {
    id: 6,
    src: "/images/logo-salewa.webp",
    alt: "Logo de la marque Salewa",
  },
  {
    id: 7,
    src: "/images/logo-seatosummit.webp",
    alt: "Logo de la marque Sea to Summit",
  },
];

function LogoSlider() {
  return (
    <>
      <div className="logos">
        <div className="logos-slide">
          {LogoData.map((logo) => (
            <Image
              key={logo.id}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={100}
              quality={100}
            />
          ))}
        </div>
        <div className="logos-slide">
          {LogoData.map((logo) => (
            <Image
              key={logo.id}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={100}
              quality={100}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default LogoSlider;
