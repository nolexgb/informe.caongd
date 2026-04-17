const NAV_ITEMS = [
  { key: "overview", label: "Resumen" },
  { key: "andalucia", label: "Andalucía" },
  { key: "international", label: "Otros países" },
  { key: "social", label: "Base social" },
  { key: "compare", label: "Comparador" }
];

export default function Header({ section, setSection }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button
          className="brand"
          onClick={() => setSection("overview")}
          aria-label="Ir al inicio"
        >
          <div className="brand-badge">CA</div>

          <div className="brand-copy">
            <div className="brand-title">
              CAONGD Data Explorer
            </div>

            <div className="brand-subtitle">
              Informe interactivo premium
            </div>
          </div>
        </button>

        <nav className="nav" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const active = section === item.key;

            return (
              <button
                key={item.key}
                className={`nav-link ${active ? "active" : ""}`}
                onClick={() => setSection(item.key)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
