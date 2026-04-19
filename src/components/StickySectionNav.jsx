// src/components/StickySectionNav.jsx

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
    <nav className="sticky-nav" aria-label="Secciones del informe">
      <div className="page-wrap sticky-nav__inner">
        {ITEMS.map(([id, label]) => {
          const active = section === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              className={`sticky-nav__btn ${active ? "is-active" : ""}`}
              aria-pressed={active}
            >
              {active && <span className="sticky-nav__pill" />}

              <span className="sticky-nav__label">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
