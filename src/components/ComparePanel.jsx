// src/components/ComparePanel.jsx

import { formatValue, getDelta } from "../utils/format";
import MotionSection from "./MotionSection";

function buildItems(current, previous) {
  if (!current || !previous) return [];

  return [
    {
      label: "Proyectos internacionales",
      current: current.international_work.projects,
      previous: previous.international_work.projects,
      type: "number"
    },
    {
      label: "Inversión internacional",
      current: current.international_work.investment_eur,
      previous: previous.international_work.investment_eur,
      type: "currency"
    },
    {
      label: "Proyectos en Andalucía",
      current: current.andalusia_work.projects,
      previous: previous.andalusia_work.projects,
      type: "number"
    },
    {
      label: "Inversión en Andalucía",
      current: current.andalusia_work.investment_eur,
      previous: previous.andalusia_work.investment_eur,
      type: "currency"
    },
    {
      label: "Base social",
      current: current.social_base.members,
      previous: previous.social_base.members,
      type: "number"
    }
  ];
}

function getBadge(delta) {
  if (delta > 0) {
    return {
      symbol: "▲",
      text: "Crecimiento",
      className: "up"
    };
  }

  if (delta < 0) {
    return {
      symbol: "▼",
      text: "Descenso",
      className: "down"
    };
  }

  return {
    symbol: "•",
    text: "Estable",
    className: "flat"
  };
}

export default function ComparePanel({
  current,
  previous,
  year,
  previousYear
}) {
  const items = buildItems(current, previous);

  if (!previous) {
    return (
      <section className="panel panel-table compare-panel compare-panel--empty">
        <div className="panel-head">
          <div>
            <div className="eyebrow">Comparador anual</div>

            <h2 className="panel-title">
              No hay año comparativo disponible
            </h2>

            <p className="panel-text">
              No se puede construir la comparativa porque no existen datos del ejercicio alternativo.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel panel-table compare-panel compare-panel--premium">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Comparador anual</div>

          <h2 className="panel-title">
            {year} frente a {previousYear}
          </h2>

          <p className="panel-text panel-text--wide">
            Lectura ejecutiva de evolución entre ejercicios disponibles.
            Detecta crecimiento, descensos y estabilidad en los principales indicadores.
          </p>
        </div>
      </div>

      <div className="compare-grid premium-compare-grid">
        {items.map((item, index) => {
          const delta = getDelta(item.current, item.previous);
          const badge = getBadge(delta);

          return (
            <MotionSection
              key={item.label}
              delay={index * 0.05}
              y={20}
            >
              <article className="compare-card premium-compare-card">
                <div className="compare-card__top">
                  <div className="eyebrow">{item.label}</div>

                  <span
                    className={`compare-status compare-status--${badge.className}`}
                  >
                    {badge.symbol} {badge.text}
                  </span>
                </div>

                <div className="compare-current">
                  {formatValue(item.current, item.type)}
                </div>

                <div className="compare-previous">
                  {previousYear}:{" "}
                  {formatValue(item.previous, item.type)}
                </div>

                <div
                  className={`compare-delta ${badge.className}`}
                >
                  {badge.symbol}{" "}
                  {Math.abs(delta).toFixed(1)}%
                </div>
              </article>
            </MotionSection>
          );
        })}
      </div>
    </section>
  );
}
