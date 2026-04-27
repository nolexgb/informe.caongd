// src/components/KPICards.jsx

import { formatValue } from "../utils/format";
import MotionSection from "./MotionSection";

function getKpiTone(index) {
  const tones = ["primary", "green", "blue", "slate"];
  return tones[index % tones.length];
}

function getKpiIcon(label) {
  const map = {
    Proyectos: "📊",
    Inversión: "€",
    Personas: "👥",
    ONGD: "🏢",
    Países: "🌍",
    "Personas socias": "👤",
    Voluntariado: "🤝",
    Personal: "🧑‍💼"
  };

  return map[label] || "•";
}

export default function KPICards({ cards = [] }) {
  if (!cards.length) return null;

  return (
    <section
      className="kpi-grid section-space"
      aria-label="Indicadores principales"
    >
      {cards.map((card, index) => {
        const featured = index === 0;
        const tone = getKpiTone(index);
        const icon = getKpiIcon(card.label);

        return (
          <MotionSection key={card.label} delay={index * 0.05}>
            <article
              className={[
                "kpi-card",
                "panel",
                "premium-kpi-card",
                featured ? "is-featured" : "",
                `kpi-card--${tone}`
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="kpi-topline">
                <span className="eyebrow">
                  <span className="kpi-icon">{icon}</span> {card.label}
                </span>

                {featured && (
                  <span className="kpi-badge">
                    Indicador clave
                  </span>
                )}
              </div>

              <div className="kpi-value premium-kpi-value">
                {formatValue(card.value, card.type)}
              </div>

              {card.note && (
                <p className="kpi-note premium-kpi-note">
                  {card.note}
                </p>
              )}

              <div className="kpi-accent-line" />
            </article>
          </MotionSection>
        );
      })}
    </section>
  );
}
