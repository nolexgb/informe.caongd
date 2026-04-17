import { formatValue, getDelta } from "../utils/format";

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

export default function ComparePanel({ current, previous, year }) {
  const items = buildItems(current, previous);

  if (!previous) {
    return (
      <section className="panel panel-table">
        <div className="panel-head">
          <div>
            <div className="eyebrow">Comparador anual</div>
            <h2>No hay año previo cargado</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel panel-table">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Comparador anual</div>
          <h2>{year} frente a 2023</h2>
        </div>
      </div>

      <div className="compare-grid">
        {items.map((item) => {
          const delta = getDelta(item.current, item.previous);
          const positive = delta >= 0;

          return (
            <article key={item.label} className="compare-card">
              <div className="eyebrow">{item.label}</div>

              <div className="compare-current">
                {formatValue(item.current, item.type)}
              </div>

              <div className="compare-previous">
                Antes: {formatValue(item.previous, item.type)}
              </div>

              <div className={`compare-delta ${positive ? "up" : "down"}`}>
                {positive ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
