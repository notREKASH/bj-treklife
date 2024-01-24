import "./ReviewSpecTech.scss";

export default function ReviewSpecTech({ review }) {
  return (
    <div className="specTech">
      <div className="specTech--text">
        <h3>Caractéristique techniques</h3>
        <p>{review.techSpecsExplanation}</p>
      </div>
      <table className="specTech--table">
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody>
          {review.techSpecs?.map((spec, specIndex) => (
            <tr key={`spec${specIndex}`}>
              <td>{spec.spec}</td>
              <td>{spec.tech}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
