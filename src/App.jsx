// src/App.jsx

import { useEffect, useMemo, useState } from "react";

import "./styles/theme.css";

import Header from "./components/Header";
import FiltersBar from "./components/FiltersBar";
import NarrativeHero from "./components/NarrativeHero";
import KPICards from "./components/KPICards";
import MapPanel from "./components/MapPanel";
import RankingList from "./components/RankingList";
import DataTable from "./components/DataTable";
import ComparePanel from "./components/ComparePanel";
import StickySectionNav from "./components/StickySectionNav";
import MotionSection from "./components/MotionSection";

import {
  buildCards,
  buildNarrative,
  buildRows,
  buildTableColumns,
  buildTopRanking
} from "./utils/selectors";

const YEARS = ["2023", "2024"];

function getSectionHeading(section) {
  switch (section) {
    case "overview":
      return {
        eyebrow: "Resumen ejecutivo",
        title: "Panorama general de la cooperación andaluza",
        text: "Una vista sintética de la actividad, el alcance territorial y las principales magnitudes del ejercicio."
      };
    case "andalucia":
      return {
        eyebrow: "Trabajo en Andalucía",
        title: "Territorio, sectores y concentración provincial",
        text: "Explora la implantación territorial en Andalucía y la distribución de la actividad por áreas y métricas."
      };
    case "international":
      return {
        eyebrow: "Trabajo en otros países",
        title: "Presencia internacional y escala geográfica",
        text: "Analiza la actividad internacional por países, regiones y categorías con una lectura territorial integrada."
      };
    case "social":
      return {
        eyebrow: "Base social",
        title: "Red asociativa, personas y estructura social",
        text: "Consulta la dimensión social del ecosistema CAONGD con una mirada estructural y comparativa."
      };
    case "compare":
      return {
        eyebrow: "Comparativa anual",
        title: "Evolución de indicadores entre ejercicios",
        text: "Compara las magnitudes principales del año actual frente a 2023 para detectar cambios y continuidad."
      };
    default:
      return {
        eyebrow: "Informe interactivo",
        title: "Exploración de datos",
        text: "Consulta el informe mediante filtros, mapas, rankings y tablas."
      };
  }
}

function getAllowedMetrics(section) {
  switch (section) {
    case "overview":
      return ["investment_eur", "projects", "people", "ongd"];
    case "andalucia":
      return ["investment_eur", "projects", "people", "ongd", "total"];
    case "international":
      return ["investment_eur", "projects", "people", "countries", "ongd"];
    case "social":
      return ["people", "ongd", "total"];
    case "compare":
      return [
        "investment_eur",
        "projects",
        "people",
        "ongd",
        "countries",
        "total"
      ];
    default:
      return ["investment_eur"];
  }
}

function getMetricLabel(metric) {
  switch (metric) {
    case "investment_eur":
      return "inversión";
    case "projects":
      return "proyectos";
    case "people":
      return "personas";
    case "ongd":
      return "ONGD";
    case "countries":
      return "países";
    case "total":
      return "total";
    default:
      return "valor";
  }
}

function getTopInsight(section, ranking, metric) {
  const first = ranking?.[0];

  if (!first) {
    return {
      eyebrow: "Insight principal",
      title: "No hay suficiente información para destacar un resultado principal.",
      text: "Ajusta los filtros para generar una lectura más específica."
    };
  }

  const metricLabel = getMetricLabel(metric);

  switch (section) {
    case "andalucia":
      return {
        eyebrow: "Insight principal",
        title: `${first.name} lidera la lectura territorial por ${metricLabel}.`,
        text: "La distribución territorial muestra concentración en los nodos con mayor capacidad de ejecución y financiación."
      };

    case "international":
      return {
        eyebrow: "Insight principal",
        title: `${first.name} encabeza la presencia internacional por ${metricLabel}.`,
        text: "La actividad exterior revela focos geográficos prioritarios y concentración relativa en los principales destinos."
      };

    case "social":
      return {
        eyebrow: "Insight principal",
        title: `${first.name} destaca como indicador principal de la base social.`,
        text: "La estructura humana y organizativa muestra diferencias relevantes entre participación, personal y órganos de gobierno."
      };

    case "overview":
      return {
        eyebrow: "Insight principal",
        title: `${first.name} concentra el mayor peso relativo en esta vista.`,
        text: "La síntesis ejecutiva permite detectar rápidamente los focos con mayor intensidad dentro del sistema."
      };

    default:
      return {
        eyebrow: "Insight principal",
        title: `${first.name} destaca en la lectura actual.`,
        text: "Utiliza el mapa, el ranking y la tabla para profundizar en el detalle."
      };
  }
}

function getSectionSummary(section, ranking) {
  const names = ranking.slice(0, 3).map((item) => item.name).filter(Boolean);

  if (!names.length) {
    return {
      eyebrow: "Lectura final",
      title: "No hay suficiente detalle para construir un cierre automático.",
      text: "Prueba otra combinación de filtros para generar una conclusión más precisa."
    };
  }

  const joined = names.join(", ");

  switch (section) {
    case "andalucia":
      return {
        eyebrow: "Lectura final",
        title: "La actividad en Andalucía presenta una concentración territorial clara.",
        text: `Los principales focos identificados en esta vista son ${joined}, lo que sugiere una implantación desigual pero reconocible en el territorio andaluz.`
      };

    case "international":
      return {
        eyebrow: "Lectura final",
        title: "La proyección internacional se organiza alrededor de un núcleo de destinos prioritarios.",
        text: `La lectura comparada sitúa a ${joined} entre los espacios con mayor peso relativo en la acción exterior.`
      };

    case "social":
      return {
        eyebrow: "Lectura final",
        title: "La base social muestra una estructura diversa y complementaria.",
        text: `Los indicadores con mayor volumen relativo en esta lectura son ${joined}, lo que aporta una visión más completa de la capacidad organizativa.`
      };

    default:
      return {
        eyebrow: "Lectura final",
        title: "La vista actual permite identificar una jerarquía clara de resultados.",
        text: `Los primeros elementos destacados en esta combinación son ${joined}, con una presencia especialmente relevante en el conjunto analizado.`
      };
  }
}

function InsightStrip({ insight }) {
  if (!insight) return null;

  return (
    <section className="section-space">
      <div className="panel panel-section panel-soft">
        <div className="eyebrow">{insight.eyebrow}</div>
        <h2 className="section-block__title">{insight.title}</h2>
        <p className="section-block__text">{insight.text}</p>
      </div>
    </section>
  );
}

function SectionSummary({ summary }) {
  if (!summary) return null;

  return (
    <section className="section-space">
      <div className="panel panel-section panel-soft">
        <div className="eyebrow">{summary.eyebrow}</div>
        <h2 className="section-block__title">{summary.title}</h2>
        <p className="section-block__text">{summary.text}</p>
      </div>
    </section>
  );
}

export default function App() {
  const [year, setYear] = useState("2024");
  const [section, setSection] = useState("overview");
  const [detail, setDetail] = useState("areas");
  const [metric, setMetric] = useState("investment_eur");

  const [dataByYear, setDataByYear] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const entries = await Promise.all(
          YEARS.map(async (y) => {
            const url = `${import.meta.env.BASE_URL}data/data-${y}.json`;
            const res = await fetch(url);
            const json = await res.json();
            return [y, json];
          })
        );

        setDataByYear(Object.fromEntries(entries));
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (section === "overview") setDetail("areas");
    if (section === "andalucia") setDetail("areas");
    if (section === "international") setDetail("regions");
    if (section === "social") setDetail("social");
    if (section === "compare") setDetail("comparison");
  }, [section]);

  useEffect(() => {
    const allowed = getAllowedMetrics(section);

    if (!allowed.includes(metric)) {
      setMetric(allowed[0]);
    }
  }, [section, metric]);

  const current = dataByYear[year];
  const previous = dataByYear["2023"];

  const narrative = useMemo(
    () => (current ? buildNarrative(current, section) : null),
    [current, section]
  );

  const cards = useMemo(
    () => (current ? buildCards(current, section) : []),
    [current, section]
  );

  const rows = useMemo(
    () => (current ? buildRows(current, section, detail) : []),
    [current, section, detail]
  );

  const columns = useMemo(
    () => buildTableColumns(section, detail, rows),
    [section, detail, rows]
  );

  const ranking = useMemo(
    () => buildTopRanking(rows, metric, 8),
    [rows, metric]
  );

  const sectionHeading = getSectionHeading(section);

  const insight = useMemo(
    () => getTopInsight(section, ranking, metric),
    [section, ranking, metric]
  );

  const summary = useMemo(
    () => getSectionSummary(section, ranking),
    [section, ranking]
  );

  if (loading) {
    return (
      <div className="loading-screen-pro">
        <div className="loading-screen-pro__glow loading-screen-pro__glow--one" />
        <div className="loading-screen-pro__glow loading-screen-pro__glow--two" />

        <div className="loading-card-pro panel">
          <div className="loading-brand">
            <div className="loading-brand__badge">CA</div>

            <div>
              <div className="loading-brand__title">
                CAONGD Data Explorer
              </div>

              <div className="loading-brand__subtitle">
                Informe interactivo
              </div>
            </div>
          </div>

          <h1 className="loading-title">Preparando la plataforma…</h1>

          <p className="loading-text">
            Cargando mapas, rankings, tablas y visualizaciones.
          </p>

          <div className="loading-bar">
            <span />
          </div>

          <div className="loading-skeleton-grid">
            <div className="loading-skeleton-card" />
            <div className="loading-skeleton-card" />
            <div className="loading-skeleton-card" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header />

      <div className="page-wrap">
        <NarrativeHero narrative={narrative} year={year} />
      </div>

      <StickySectionNav
        section={section}
        setSection={setSection}
      />

      <main className="page-wrap app-main">
        <MotionSection delay={0.05}>
          <section className="section-space">
            <div className="panel panel-section panel-soft">
              <div className="eyebrow">{sectionHeading.eyebrow}</div>

              <h2 className="section-block__title">
                {sectionHeading.title}
              </h2>

              <p className="section-block__text">
                {sectionHeading.text}
              </p>
            </div>
          </section>
        </MotionSection>

        <MotionSection delay={0.08}>
          <FiltersBar
            year={year}
            setYear={setYear}
            detail={detail}
            setDetail={setDetail}
            metric={metric}
            setMetric={setMetric}
            section={section}
          />
        </MotionSection>

        {section === "compare" ? (
          <MotionSection delay={0.12}>
            <section className="section-space">
              <ComparePanel
                current={current}
                previous={previous}
                year={year}
                previousYear="2023"
              />
            </section>
          </MotionSection>
        ) : (
          <>
            <MotionSection delay={0.1}>
              <InsightStrip insight={insight} />
            </MotionSection>

            <KPICards cards={cards} />

            <section className="content-grid section-space">
              <MotionSection delay={0.12}>
                <div className="panel panel-map panel-section panel-soft panel-primary panel-large">
                  <div className="panel-head">
                    <div className="eyebrow">Mapa interactivo</div>

                    <h2 className="panel-title">
                      Distribución territorial
                    </h2>

                    <p className="panel-text panel-text--wide">
                      Visualiza la distribución territorial de la
                      actividad según la sección, la vista y la
                      métrica seleccionada.
                    </p>
                  </div>

                  <div className="panel-body-spaced">
                    <MapPanel
                      section={section}
                      detail={detail}
                      rows={rows}
                      metric={metric}
                    />
                  </div>
                </div>
              </MotionSection>

              <MotionSection delay={0.18}>
                <div className="panel panel-ranking panel-section panel-soft panel-secondary">
                  <div className="panel-head">
                    <div className="eyebrow">Ranking</div>

                    <h2 className="panel-title">
                      Principales resultados
                    </h2>

                    <p className="panel-text">
                      Identifica rápidamente los territorios o
                      categorías con mayor peso relativo.
                    </p>
                  </div>

                  <div className="panel-body-spaced">
                    <RankingList
                      rows={ranking}
                      metric={metric}
                    />
                  </div>
                </div>
              </MotionSection>
            </section>

            <MotionSection delay={0.22}>
              <section className="panel panel-table panel-section panel-soft panel-tertiary section-space">
                <div className="panel-head">
                  <div className="eyebrow">Detalle</div>

                  <h2 className="panel-title">
                    Datos consolidados
                  </h2>

                  <p className="panel-text panel-text--wide">
                    Consulta el detalle estructurado de cada vista en
                    formato tabular, con una lectura clara y trazable.
                  </p>
                </div>

                <div className="panel-body-spaced">
                  <DataTable
                    rows={rows}
                    columns={columns}
                  />
                </div>
              </section>
            </MotionSection>

            <MotionSection delay={0.26}>
              <SectionSummary summary={summary} />
            </MotionSection>
          </>
        )}
      </main>
    </div>
  );
}
