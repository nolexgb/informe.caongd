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

/* =====================================
   SECTION HEADINGS
===================================== */

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

/* =====================================
   METRICS
===================================== */

function getAllowedMetrics(section) {
  switch (section) {
    case "overview":
      return [
        "investment_eur",
        "projects",
        "people",
        "ongd"
      ];

    case "andalucia":
      return [
        "investment_eur",
        "projects",
        "people",
        "ongd",
        "total"
      ];

    case "international":
      return [
        "investment_eur",
        "projects",
        "people",
        "countries",
        "ongd"
      ];

    case "social":
      return [
        "people",
        "ongd",
        "total"
      ];

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

function getDefaultMetric(section, detail) {
  if (section === "social") return "total";

  if (section === "andalucia") {
    if (detail === "areas") return "projects";
    if (detail === "provinces") return "investment_eur";
    if (detail === "ods") return "projects";
    if (detail === "funding") return "investment_eur";
  }

  if (section === "international") {
    if (detail === "regions") return "investment_eur";
    if (detail === "countries") return "investment_eur";
    if (detail === "ongd") return "investment_eur";
  }

  return "investment_eur";
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

/* =====================================
   INSIGHTS
===================================== */

function getTopInsight(section, ranking, metric) {
  const first = ranking?.[0];

  if (!first) {
    return {
      eyebrow: "Insight principal",
      title: "No hay suficiente información para destacar resultados.",
      text: "Ajusta filtros o cambia de vista para generar nuevas lecturas."
    };
  }

  const metricLabel = getMetricLabel(metric);

  switch (section) {
    case "andalucia":
      return {
        eyebrow: "Insight principal",
        title: `${first.name} lidera Andalucía por ${metricLabel}.`,
        text: "La distribución territorial refleja concentración relativa en los principales nodos provinciales."
      };

    case "international":
      return {
        eyebrow: "Insight principal",
        title: `${first.name} encabeza la acción exterior por ${metricLabel}.`,
        text: "Los destinos prioritarios concentran una parte sustancial del esfuerzo internacional."
      };

    case "social":
      return {
        eyebrow: "Insight principal",
        title: `${first.name} destaca dentro de la base social.`,
        text: "La estructura humana muestra pesos diferenciados entre perfiles organizativos."
      };

    default:
      return {
        eyebrow: "Insight principal",
        title: `${first.name} destaca en la vista actual.`,
        text: "Consulta ranking, mapa y tabla para ampliar detalle."
      };
  }
}

function getSectionSummary(section, ranking) {
  const names = ranking
    .slice(0, 3)
    .map((item) => item.name)
    .filter(Boolean);

  if (!names.length) {
    return {
      eyebrow: "Lectura final",
      title: "No hay suficiente información para generar cierre.",
      text: "Prueba otras combinaciones de filtros."
    };
  }

  const joined = names.join(", ");

  switch (section) {
    case "andalucia":
      return {
        eyebrow: "Lectura final",
        title: "La actividad territorial muestra focos claros.",
        text: `Los principales territorios observados son ${joined}.`
      };

    case "international":
      return {
        eyebrow: "Lectura final",
        title: "La proyección internacional se concentra en destinos prioritarios.",
        text: `Sobresalen ${joined} como espacios de mayor intensidad.`
      };

    case "social":
      return {
        eyebrow: "Lectura final",
        title: "La base social presenta una estructura diversa.",
        text: `Los indicadores más destacados son ${joined}.`
      };

    default:
      return {
        eyebrow: "Lectura final",
        title: "La vista actual permite identificar jerarquías claras.",
        text: `Destacan especialmente ${joined}.`
      };
  }
}

/* =====================================
   INLINE COMPONENTS
===================================== */

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

/* =====================================
   APP
===================================== */

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
            const res = await fetch(
              `${import.meta.env.BASE_URL}data/data-${y}.json`
            );

            const json = await res.json();

            return [y, json];
          })
        );

        setDataByYear(Object.fromEntries(entries));
      } catch (error) {
        console.error(error);
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
    const suggested = getDefaultMetric(section, detail);

    if (!allowed.includes(metric)) {
      setMetric(
        allowed.includes(suggested)
          ? suggested
          : allowed[0]
      );
    }
  }, [section, detail, metric]);

  const current = dataByYear[year];
  const previous = dataByYear["2023"];

  const narrative = useMemo(
    () =>
      current
        ? buildNarrative(current, section)
        : null,
    [current, section]
  );

  const cards = useMemo(
    () =>
      current
        ? buildCards(current, section)
        : [],
    [current, section]
  );

  const rows = useMemo(
    () =>
      current
        ? buildRows(current, section, detail)
        : [],
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
    () =>
      getTopInsight(section, ranking, metric),
    [section, ranking, metric]
  );

  const summary = useMemo(
    () =>
      getSectionSummary(section, ranking),
    [section, ranking]
  );

  if (loading) {
    return (
      <div className="loading-screen-pro">
        <div className="loading-card-pro panel">
          <h1 className="loading-title">
            Cargando plataforma...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header />

      <div className="page-wrap">
        <NarrativeHero
          narrative={narrative}
          year={year}
        />
      </div>

      <StickySectionNav
        section={section}
        setSection={setSection}
      />

      <main className="page-wrap app-main">
        <MotionSection delay={0.05}>
          <section className="section-space">
            <div className="panel panel-section panel-soft">
              <div className="eyebrow">
                {sectionHeading.eyebrow}
              </div>

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
          <section className="section-space">
            <ComparePanel
              current={current}
              previous={previous}
              year={year}
            />
          </section>
        ) : (
          <>
            <InsightStrip insight={insight} />

            <KPICards cards={cards} />

            <section className="content-grid section-space">
              <div className="panel panel-section">
                <MapPanel
                  section={section}
                  detail={detail}
                  rows={rows}
                  metric={metric}
                />
              </div>

              <div className="panel panel-section">
                <RankingList
                  rows={ranking}
                  metric={metric}
                />
              </div>
            </section>

            <section className="panel panel-section section-space">
              <DataTable
                rows={rows}
                columns={columns}
              />
            </section>

            <SectionSummary summary={summary} />
          </>
        )}
      </main>
    </div>
  );
}
