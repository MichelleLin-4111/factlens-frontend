import { SourceCard } from "./SourceCard";
import "./SourcesList.css";

export function SourcesList({ sources }) {
  return (
    <div className="sources-section">
      <h3>Sources</h3>
      <div className="sources-list">
        {sources.map((source, i) => (
          <SourceCard key={i} source={source} />
        ))}
      </div>
    </div>
  );
}
