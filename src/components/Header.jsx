// src/components/Header.jsx

const YEAR = "2024";

export default function Header() {
  return (
    <header className="institutional-header">
      <div className="page-wrap institutional-header__inner">

        {/* LOGO + IDENTIDAD */}
        <div className="institutional-brand">

          <div className="institutional-brand__logo">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo-caongd.jpg`}
              alt="CAONGD"
            />
          </div>

          <div className="institutional-brand__content">
            <div className="institutional-brand__title">
              CAONGD Data Explorer
            </div>

            <div className="institutional-brand__subtitle">
              Coordinadora Andaluza de ONGD · Informe interactivo
            </div>
          </div>

        </div>

        {/* META */}
        <div className="institutional-meta">
          <span className="institutional-pill">
            Edición {YEAR}
          </span>
        </div>

      </div>
    </header>
  );
}
