import "./Reasoning.css";

export function Reasoning({ text }) {
  return (
    <div className="reasoning-section">
      <h3>Reasoning</h3>
      <p className="reasoning-text">{text}</p>
    </div>
  );
}
