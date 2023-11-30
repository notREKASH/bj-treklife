import "./LogoSlider.scss";
import LogoBlackDiamond from "../../images/logo-blackdiamond.png";
import LogoMsr from "../../images/logo-msr.png";
import LogoPetzl from "../../images/logo-petzl.png";
import LogoOsprey from "../../images/logo-osprey.png";
import LogoNemo from "../../images/logo-nemo.png";
import LogoSalewa from "../../images/logo-salewa.png";
import LogoSeatosummit from "../../images/logo-seatosummit.png";
import Image from "next/image";

function LogoSlider() {
  return (
    <>
      <div className="logos">
        <div className="logos-slide">
          <Image
            src={LogoBlackDiamond.src}
            alt="Logo de la marque Black Diamond"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoMsr.src}
            alt="Logo de la marque MSR"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoNemo.src}
            alt="Logo de la marque Nemo"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoOsprey.src}
            alt="Logo de la marque Osprey"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoPetzl.src}
            alt="Logo de la marque Petzl"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoSalewa.src}
            alt="Logo de la marque Salewa"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoSeatosummit.src}
            alt="Logo de la marque Sea to Summit"
            height={70}
            width={200}
            quality={100}
          />
        </div>
        <div className="logos-slide">
          <Image
            src={LogoBlackDiamond.src}
            alt="Logo de la marque Black Diamond"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoMsr.src}
            alt="Logo de la marque MSR"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoNemo.src}
            alt="Logo de la marque Nemo"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoOsprey.src}
            alt="Logo de la marque Osprey"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoPetzl.src}
            alt="Logo de la marque Petzl"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoSalewa.src}
            alt="Logo de la marque Salewa"
            height={70}
            width={200}
            quality={100}
          />
          <Image
            src={LogoSeatosummit.src}
            alt="Logo de la marque Sea to Summit"
            height={70}
            width={200}
            quality={100}
          />
        </div>
      </div>
    </>
  );
}

export default LogoSlider;
