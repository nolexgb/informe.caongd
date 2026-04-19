import AnimatedCounter from "./AnimatedCounter";

function formatStatValue(stat) {
  if (stat?.rawValue !== undefined && stat?.rawValue !== null) {
    return stat.rawValue;
  }

  return stat?.value ?? "—";
}

function getFallbackStats(year) {
  return [
    {
      label: "Provincias activas",
      value: "8",
      rawValue: 8
    },
    {
      label: "Países",
      value: "68",
      rawValue: 68
    },
    {
      label: "Proyectos",
      value: "+300",
      rawValue: 300,
      prefix: "+"
    },
    {
      label: "Edición actual",
      value: year || "2024"
    }
  ];
}

export default function NarrativeHero({
  narrative,
  year
}) {
  const title =
    narrative?.title ||
    "La cooperación andaluza, en cifras y en impacto.";

  const text =
    narrative?.text ||
    "Explora el trabajo en Andalucía, la acción internacional, la financiación y la base social mediante una experiencia visual premium basada en datos.";

  const subtitle = narrative?.subtitle || "";

  const stats =
    Array.isArray(narrative?.stats) && narrative.stats.length
      ? narrative.stats
      : getFallbackStats(year);

  return (
    <section className="narrative-hero">
      <div className="narrative-hero__glow narrative-hero__glow--one" />
      <div className="narrative-hero__glow narrative-hero__glow--two" />

      <div className="eyebrow narrative-hero__eyebrow">
        INFORME INTERACTIVO {year}
      </div>

      <h1 className="narrative-hero__title">
        {title}
      </h1>

      {subtitle ? (
        <div
          style={{
            marginTop: "12px",
            color: "rgba(255,255,255,.72)",
            fontSize: "14px",
            position: "relative",
            zIndex: 2
          }}
        >
          {subtitle}
        </div>
      ) : null}

      <p className="narrative-hero__text">
        {text}
      </p>

      <div className="narrative-hero__stats">
        {stats.map((stat, index) => {
          const raw = formatStatValue(stat);

          return (
            <div
              key={`${stat.label}-${index}`}
              className="narrative-hero__stat"
            >
              <div className="narrative-hero__stat-value">
                {stat.prefix || ""}
                <AnimatedCounter value={raw} />
                {stat.suffix || ""}
              </div>

              <div className="narrative-hero__stat-label">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
