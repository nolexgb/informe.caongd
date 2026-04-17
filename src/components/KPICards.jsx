import { formatValue } from "../utils/format";

export default function KPICards({ cards = [] }) {
  if (!cards.length) return null;

  return (
    <section className="kpi-grid">
      {cards.map((card) => (
        <article
          key={card.label}
          className="kpi-card panel"
        >
          <div className="eyebrow">
            {card.label}
          </div>

          <div className="kpi-value">
            {formatValue(card.value, card.type)}
          </div>

          <div className="kpi-note">
            {card.note}
          </div>
        </article>
      ))}
    </section>
  );
}
