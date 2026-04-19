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

export default function ComparePanel({
  current,
  previous,
  year
}) {
  const items = buildItems(current, previous);

  if (!previous) {
    return (
      <section
        className="panel panel-table compare-panel"
        style={{
          padding: "28px",
          borderRadius: "24px"
        }}
      >
        <div className="panel-head">
          <div>
            <div className="eyebrow">Comparador anual</div>
            <h2 style={{ marginTop: "8px", fontSize: "32px" }}>
              No hay año previo cargado
            </h2>
            <p style={{ marginTop: "12px" }}>
              No se puede construir la comparativa porque no hay
              datos anteriores disponibles.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="panel panel-table compare-panel"
      style={{
        padding: "28px",
        borderRadius: "24px",
        background:
          "linear-gradient(180deg,#ffffff 0%,#f8fbfe 100%)"
      }}
    >
      <div className="panel-head">
        <div>
          <div className="eyebrow">Comparador anual</div>
          <h2 style={{ marginTop: "8px", fontSize: "36px" }}>
            {year} frente a 2023
          </h2>
          <p style={{ marginTop: "12px", maxWidth: "760px" }}>
            Esta sección resume la evolución de los principales
            indicadores entre el ejercicio actual y el año base.
          </p>
        </div>
      </div>

      <div className="compare-grid premium-compare-grid">
        {items.map((item, index) => {
          const delta = getDelta(item.current, item.previous);
          const positive = delta >= 0;

          return (
            <MotionSection
              key={item.label}
              delay={index * 0.06}
              y={20}
            >
              <article className="compare-card premium-compare-card">
                <div className="eyebrow">{item.label}</div>

                <div className="compare-current">
                  {formatValue(item.current, item.type)}
                </div>

                <div className="compare-previous">
                  Antes: {formatValue(item.previous, item.type)}
                </div>

                <div
                  className={`compare-delta ${
                    positive ? "up" : "down"
                  }`}
                >
                  {positive ? "▲" : "▼"}{" "}
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
