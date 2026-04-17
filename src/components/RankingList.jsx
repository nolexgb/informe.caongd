import { formatValue } from "../utils/format";

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
    <div className="ranking-list">
      {rows.map((row, index) => (
        <div
          key={row.name}
          className="ranking-item"
        >
          <div className="ranking-index">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="ranking-main">
            <div className="ranking-name">
              {row.name}
            </div>

            <div className="ranking-bar">
              <span
                style={{
                  width: `${row._pct || 0}%`
                }}
              />
            </div>
          </div>

          <div className="ranking-value">
            {formatValue(
              row[metric],
              metric === "investment_eur"
                ? "currency"
                : "number"
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
