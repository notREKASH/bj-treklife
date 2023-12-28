import Image from "next/image";
import "./SocialMediaPanel.scss";

function SocialMediaPanel() {
  const socialMedias = [
    {
      name: "facebook",
      url: "https://www.facebook.com/profile.php?id=61553734114609",
      logo: "/images/logo-facebook-panel.webp",
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/bj.treklife/?fbclid=IwAR0hWnrv96zm9psUnZib3WH0iz36I4RIYOL_Z4e5ezPeN7P5IjfIx1CSSqQ",
      logo: "/images/logo-instagram-panel.webp",
    },
    {
      name: "youtube",
      url: "#",
      logo: "/images/logo-youtube-panel.webp",
    },
  ];

  return (
    <div className="socialMediaPanel">
      <h3>Suivez-moi sur les réseaux sociaux</h3>
      <div className="socialMediaPanel__container">
        {socialMedias.map((socialMedia) => (
          <div
            className="socialMediaPanel__container--card"
            key={socialMedia.name}>
            <a href={socialMedia.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={socialMedia.logo}
                alt={socialMedia.name}
                width={40}
                height={40}
                quality={100}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialMediaPanel;
