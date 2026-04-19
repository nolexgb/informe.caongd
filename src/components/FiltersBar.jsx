const DETAIL_OPTIONS = {
  overview: [
    { value: "areas", label: "Áreas Andalucía" }
  ],
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
  social: [
    { value: "social", label: "Indicadores sociales" }
  ],
  compare: [
    { value: "comparison", label: "Comparación anual" }
  ]
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
  overview:
    "Lectura sintética de las principales magnitudes del ejercicio.",
  andalucia:
    "Explora distribución territorial, áreas de trabajo y financiación en Andalucía.",
  international:
    "Analiza presencia internacional por regiones, países y organizaciones.",
  social:
    "Consulta la dimensión asociativa y los principales indicadores sociales.",
  compare:
    "Contrasta indicadores del año actual frente al ejercicio anterior."
};

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
    METRIC_OPTIONS_BY_SECTION[section] ||
    METRIC_OPTIONS_BY_SECTION.overview;

  return (
    <section
      className="filters-bar panel panel-section panel-soft"
      aria-label="Filtros del informe"
    >
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

      <div className="filter-item">
        <label htmlFor="year-select">Año</label>
        <div className="filter-control">
          <select
            id="year-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      <div className="filter-item">
        <label htmlFor="detail-select">Vista</label>
        <div className="filter-control">
          <select
            id="detail-select"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          >
            {currentDetails.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-item">
        <label htmlFor="metric-select">Métrica</label>
        <div className="filter-control">
          <select
            id="metric-select"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          >
            {currentMetrics.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
