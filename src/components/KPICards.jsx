// src/components/KPICards.jsx

import { formatValue } from "../utils/format";
import MotionSection from "./MotionSection";

export default function KPICards({ cards = [] }) {
  if (!cards.length) return null;

  return (
    <section className="kpi-grid section-space">
      {cards.map((card, index) => {
        const featured = index === 0;

        return (
          <MotionSection
            key={card.label}
            delay={index * 0.05}
          >
            <article
              className={`kpi-card panel premium-kpi-card ${
                featured ? "is-featured" : ""
              }`}
            >
              <div className="kpi-topline">
                <span className="eyebrow">
                  {card.label}
                </span>
              </div>

              <div className="kpi-value premium-kpi-value">
                {formatValue(card.value, card.type)}
              </div>

              <p className="kpi-note premium-kpi-note">
                {card.note}
              </p>

              <div className="kpi-accent-line" />
            </article>
          </MotionSection>
        );
      })}
    </section>
  );
}
