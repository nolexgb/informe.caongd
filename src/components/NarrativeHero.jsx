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

  const stats = narrative?.stats || [
    ["8", "Provincias activas"],
    ["68", "Países"],
    ["+300", "Proyectos"],
    [year || "2024", "Edición actual"]
  ];

  return (
    <section
      style={{
        marginTop: "24px",
        padding: "64px",
        borderRadius: "28px",
        color: "white",
        background:
          "linear-gradient(135deg,#0b2e59 0%,#1a5a96 55%,#2374b7 100%)",
        boxShadow: "0 25px 60px rgba(11,46,89,.18)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)"
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(255,255,255,.05)"
        }}
      />

      <div
        className="eyebrow"
        style={{
          color: "#8cc4f0",
          position: "relative",
          zIndex: 2
        }}
      >
        INFORME INTERACTIVO {year}
      </div>

      <h1
        style={{
          fontSize: "clamp(42px,7vw,74px)",
          maxWidth: "920px",
          marginTop: "14px",
          lineHeight: "1.02",
          position: "relative",
          zIndex: 2
        }}
      >
        {title}
      </h1>

      <p
        style={{
          maxWidth: "760px",
          marginTop: "20px",
          color: "rgba(255,255,255,.88)",
          fontSize: "18px",
          lineHeight: "1.6",
          position: "relative",
          zIndex: 2
        }}
      >
        {text}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "18px",
          marginTop: "34px",
          position: "relative",
          zIndex: 2
        }}
      >
        {stats.map(([n, t]) => (
          <div
            key={t}
            style={{
              padding: "18px",
              borderRadius: "18px",
              background: "rgba(255,255,255,.10)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.08)"
            }}
          >
            <div
              style={{
                fontSize: "34px",
                fontWeight: 800,
                lineHeight: 1
              }}
            >
              {n}
            </div>

            <div
              style={{
                marginTop: "8px",
                opacity: 0.9
              }}
            >
              {t}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
