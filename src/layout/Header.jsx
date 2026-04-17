const ITEMS = [
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
        <div className="brand">
          <div className="brand-badge">CA</div>
          <div>
            <div className="brand-title">CAONGD Data Explorer</div>
            <div className="brand-subtitle">Plataforma interactiva premium</div>
          </div>
        </div>

        <nav className="nav">
          {ITEMS.map((item) => (
            <button
              key={item.key}
              className={`nav-link ${section === item.key ? "active" : ""}`}
              onClick={() => setSection(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
