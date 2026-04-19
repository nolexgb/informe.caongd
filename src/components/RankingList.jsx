// src/components/RankingList.jsx

import { formatValue } from "../utils/format";
import MotionSection from "./MotionSection";

function getMetricType(metric) {
  return metric === "investment_eur" ? "currency" : "number";
}

export default function RankingList({
  rows = [],
  metric = "investment_eur"
}) {
  if (!rows.length) {
    return (
      <div className="empty-state">
        No hay datos para mostrar.
      </div>
    );
  }

  return (
    <div className="ranking-list premium-ranking-list">
      {rows.map((row, index) => {
        const pct = Math.max(0, Math.min(row._pct || 0, 100));

        return (
          <MotionSection
            key={row.name || index}
            delay={index * 0.05}
            y={18}
          >
            <article className="ranking-item premium-ranking-item">
              <div className="ranking-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="ranking-main">
                <div className="ranking-name">
                  {row.name}
                </div>

                <div className="ranking-bar premium-ranking-bar">
                  <span
                    className="ranking-bar__fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="ranking-value">
                {formatValue(row[metric], getMetricType(metric))}
              </div>
            </article>
          </MotionSection>
        );
      })}
    </div>
  );
}
