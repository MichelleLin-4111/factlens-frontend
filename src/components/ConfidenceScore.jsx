import "./ConfidenceScore.css";

export function ConfidenceScore({ score }) {
  const fillClassName = score > 70 ? "high" : "medium";

  return (
    <div className="confidence-score-section">
      <h3>Confidence Score</h3>
      <div className="progress-bar-container">
        <div
          className={`progress-bar-fill ${fillClassName}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="confidence-text">
        {score}% confidence in the accuracy of this claim.
      </p>
    </div>
  );
}
