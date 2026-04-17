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

const METRIC_OPTIONS = [
  { value: "investment_eur", label: "Inversión (€)" },
  { value: "projects", label: "Proyectos" },
  { value: "people", label: "Personas" },
  { value: "ongd", label: "ONGD" },
  { value: "countries", label: "Países" },
  { value: "total", label: "Total" }
];

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

  return (
    <section className="filters-bar panel">
      <div className="filter-item">
        <label htmlFor="year-select">Año</label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="detail-select">Vista</label>
        <select
          id="detail-select"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        >
          {currentDetails.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="metric-select">Métrica</label>
        <select
          id="metric-select"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
        >
          {METRIC_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
