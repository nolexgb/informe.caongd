export default function PremiumHero() {
  return (
    <section
      style={{
        marginTop: "24px",
        padding: "64px",
        borderRadius: "28px",
        color: "white",
        background:
          "linear-gradient(135deg,#0b2e59 0%,#1a5a96 55%,#2374b7 100%)",
        boxShadow: "0 25px 60px rgba(11,46,89,.18)"
      }}
    >
      <div className="eyebrow" style={{ color: "#8cc4f0" }}>
        INFORME INTERACTIVO 2024
      </div>

      <h1
        style={{
          fontSize: "clamp(42px,7vw,74px)",
          maxWidth: "900px",
          marginTop: "14px"
        }}
      >
        La cooperación andaluza,
        en cifras y en impacto.
      </h1>

      <p
        style={{
          maxWidth: "720px",
          marginTop: "20px",
          color: "rgba(255,255,255,.86)",
          fontSize: "18px"
        }}
      >
        Explora el trabajo en Andalucía, la acción internacional,
        la financiación y la base social mediante una experiencia
        visual premium basada en datos.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "18px",
          marginTop: "34px"
        }}
      >
        {[
          ["8", "Provincias activas"],
          ["68", "Países"],
          ["+300", "Proyectos"],
          ["2024", "Edición actual"]
        ].map(([n, t]) => (
          <div
            key={t}
            style={{
              padding: "18px",
              borderRadius: "18px",
              background: "rgba(255,255,255,.10)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div style={{ fontSize: "34px", fontWeight: 800 }}>{n}</div>
            <div style={{ opacity: .86 }}>{t}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
