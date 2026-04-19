// src/components/Header.jsx

const YEAR = "2024";

export default function Header() {
  return (
    <header className="institutional-header">
      <div className="page-wrap institutional-header__inner">
        <div className="institutional-brand">
          <div className="institutional-brand__badge">
            CA
          </div>

          <div>
            <div className="institutional-brand__title">
              CAONGD Data Explorer
            </div>

            <div className="institutional-brand__subtitle">
              Informe interactivo
            </div>
          </div>
        </div>

        <div className="institutional-meta">
          <span className="institutional-pill">
            Edición {YEAR}
          </span>
        </div>
      </div>
    </header>
  );
}
