import { formatValue } from "../utils/format";
import MotionSection from "./MotionSection";

export default function KPICards({ cards = [] }) {
  if (!cards.length) return null;

  return (
    <section className="kpi-grid section-space">
      {cards.map((card, index) => (
        <MotionSection
          key={card.label}
          delay={index * 0.06}
        >
          <article className="kpi-card panel premium-kpi-card">
            <div className="eyebrow">
              {card.label}
            </div>

            <div className="kpi-value premium-kpi-value">
              {formatValue(card.value, card.type)}
            </div>

            <div className="kpi-note premium-kpi-note">
              {card.note}
            </div>
          </article>
        </MotionSection>
      ))}
    </section>
  );
}
