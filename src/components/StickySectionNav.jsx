const ITEMS = [
  ["overview", "Resumen"],
  ["andalucia", "Andalucía"],
  ["international", "Otros países"],
  ["social", "Base social"],
  ["compare", "Comparativa"]
];

export default function StickySectionNav({
  section,
  setSection
}) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        background: "rgba(248,250,252,.82)",
        borderBottom: "1px solid #e2e8f0",
        marginTop: "18px"
      }}
    >
      <div
        className="page-wrap"
        style={{
          display: "flex",
          gap: "10px",
          padding: "14px 0",
          overflowX: "auto"
        }}
      >
        {ITEMS.map(([id, label]) => {
          const active = section === id;

          return (
            <button
              key={id}
              onClick={() => setSection(id)}
              style={{
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                padding: "12px 18px",
                borderRadius: "999px",
                fontWeight: 700,
                background: active
                  ? "#1a5a96"
                  : "white",
                color: active
                  ? "white"
                  : "#334155",
                boxShadow: active
                  ? "0 10px 24px rgba(26,90,150,.20)"
                  : "none"
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
