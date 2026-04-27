// src/components/FiltersBar.jsx

const DETAIL_OPTIONS = {
  overview: [{ value: "areas", label: "Áreas Andalucía" }],
  andalucia: [
    { value: "areas", label: "Áreas de trabajo" },
    { value: "provinces", label: "Provincias" },
    { value: "ods", label: "ODS" },
    { value: "funding", label: "Financiadoras" }
  ],
  international: [
    { value: "regions", label: "Áreas geográficas" },
    { value: "countries", label: "Top países" },
    { value: "ongd", label: "ONGD destacadas" }
  ],
  social: [{ value: "social", label: "Indicadores sociales" }],
  compare: [{ value: "comparison", label: "Comparación anual" }]
};

const METRIC_OPTIONS_BY_SECTION = {
  overview: [
    { value: "investment_eur", label: "Inversión (€)" },
    { value: "projects", label: "Proyectos" },
    { value: "people", label: "Personas" },
    { value: "ongd", label: "ONGD" }
  ],
  andalucia: [
    { value: "investment_eur", label: "Inversión (€)" },
    { value: "projects", label: "Proyectos" },
    { value: "people", label: "Personas" },
    { value: "ongd", label: "ONGD" },
    { value: "total", label: "Total" }
  ],
  international: [
    { value: "investment_eur", label: "Inversión (€)" },
    { value: "projects", label: "Proyectos" },
    { value: "people", label: "Personas" },
    { value: "countries", label: "Países" },
    { value: "ongd", label: "ONGD" }
  ],
  social: [
    { value: "people", label: "Personas" },
    { value: "ongd", label: "ONGD" },
    { value: "total", label: "Total" }
  ],
  compare: [
    { value: "investment_eur", label: "Inversión (€)" },
    { value: "projects", label: "Proyectos" },
    { value: "people", label: "Personas" },
    { value: "ongd", label: "ONGD" },
    { value: "countries", label: "Países" },
    { value: "total", label: "Total" }
  ]
};

const SECTION_HELP = {
  overview: "Lectura sintética de las principales magnitudes del ejercicio.",
  andalucia: "Explora distribución territorial, áreas de trabajo y financiación en Andalucía.",
  international: "Analiza presencia internacional por regiones, países y organizaciones.",
  social: "Consulta la dimensión asociativa y los principales indicadores sociales.",
  compare: "Contrasta indicadores del año actual frente al ejercicio anterior."
};

function OptionGroup({ label, options, value, onChange }) {
  return (
    <div className="filter-item filter-item--wide">
      <div className="filter-label">{label}</div>

      <div className="filter-pills" role="group" aria-label={label}>
        {options.map((option) => {
          const active = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              className={`filter-pill ${active ? "is-active" : ""}`}
              onClick={() => onChange(option.value)}
              aria-pressed={active}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FiltersBar({
  year,
  setYear,
  detail,
  setDetail,
  metric,
  setMetric,
  section
}) {
  const currentDetails = DETAIL_OPTIONS[section] || [];
  const currentMetrics =
    METRIC_OPTIONS_BY_SECTION[section] || METRIC_OPTIONS_BY_SECTION.overview;

  return (
    <section className="filters-bar panel panel-section panel-soft" aria-label="Filtros del informe">
      <div className="filters-bar__intro">
        <div className="eyebrow">Exploración</div>

        <h3 className="filters-bar__title">
          Ajusta la lectura del informe
        </h3>

        <p className="filters-bar__text">
          {SECTION_HELP[section] ||
            "Selecciona el año, la vista y la métrica para reinterpretar los datos."}
        </p>
      </div>

      <OptionGroup
        label="Año"
        options={[
          { value: "2024", label: "2024" },
          { value: "2023", label: "2023" }
        ]}
        value={year}
        onChange={setYear}
      />

      <OptionGroup
        label="Vista"
        options={currentDetails}
        value={detail}
        onChange={setDetail}
      />

      <OptionGroup
        label="Métrica"
        options={currentMetrics}
        value={metric}
        onChange={setMetric}
      />
    </section>
  );
}
