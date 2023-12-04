import "./SocialMediaPanel.scss";
import FacebookLogo from "../../images/logo-facebook-panel.png";
import InstagramLogo from "../../images/logo-instagram-panel.png";
import YoutubeLogo from "../../images/logo-youtube-panel.png";

function SocialMediaPanel() {
  const socialMedias = [
    {
      name: "facebook",
      url: "https://www.facebook.com/",
      logo: FacebookLogo.src,
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/",
      logo: InstagramLogo.src,
    },
    {
      name: "youtube",
      url: "https://www.youtube.com/",
      logo: YoutubeLogo.src,
    },
  ];

  return (
    <div className="socialMediaPanel">
      <h3>Suivez-moi sur les réseaux sociaux</h3>
      <div className="socialMediaPanel__container">
        {socialMedias.map((socialMedia) => (
          <div
            className="socialMediaPanel__container--card"
            key={socialMedia.name}
          >
            <a href={socialMedia.url} target="_blank" rel="noopener noreferrer">
              <img src={socialMedia.logo} alt={socialMedia.name} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialMediaPanel;
