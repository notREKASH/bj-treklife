import "./ReviewShopLink.scss";

export default function ReviewShopLink({ review }) {
  return (
    <div className="linkShop">
      <div className="linkShop--text">
        <h3>Liens d&rsquo;achat</h3>
      </div>
      <div className="linkShop--links">
        {review.linkShops?.map((link, linkIndex) => (
          <a
            key={`link${linkIndex}`}
            href={link.url}
            target="_blank"
            rel="noreferrer">
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
