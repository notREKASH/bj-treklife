import "./ReviewAdvantageDisadvantage.scss";

export default function ReviewAdvantageDisadvantage({ review }) {
  return (
    <div className="advantagesDisadvantages">
      <div className="advantagesDisadvantages--text">
        <h3>Avantages et inconvénients</h3>
      </div>
      <div className="advantagesDisadvantages--table">
        {review.advantagesDisadvantages?.map(
          (advantagesDisadvantages, advantagesDisadvantagesIndex) => (
            <div key={`advantage${advantagesDisadvantagesIndex}`}>
              <p>
                {advantagesDisadvantages.advantage && (
                  <span className="advantage">+</span>
                )}
                {advantagesDisadvantages.advantage}
              </p>
              <p>
                {advantagesDisadvantages.disadvantage && (
                  <span className="disadvantage">-</span>
                )}
                {advantagesDisadvantages.disadvantage}
              </p>
            </div>
          )
        )}
      </div>
      <p className="advantagesDisadvantages--explanation">
        {review.advantagesDisadvantagesExplanation}
      </p>
    </div>
  );
}
