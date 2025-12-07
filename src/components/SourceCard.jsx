import "./SourceCard.css";

export function SourceCard({ source }) {
  const getStanceClassName = (ratingStance) => {
    if (ratingStance === "Mostly Support") return "support";
    if (ratingStance === "Opposite") return "opposite";
    return "partial";
  };

  return (
    <div className="source-card">
      <div className="source-card-header">
        <h4 className="source-card-title">{source.title}</h4>
        <span className={`source-card-stance ${getStanceClassName(source.ratingStance)}`}>
          {source.ratingStance}
        </span>
      </div>
      <p className="source-card-snippet">{source.snippet}</p>
    </div>
  );
}
