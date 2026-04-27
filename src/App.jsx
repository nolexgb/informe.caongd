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
        text: "Explora la implantación territorial en Andalucía"
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
        text: "Contrasta automáticamente las principales magnitudes entre años disponibles."
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

function getDefaultMetric(section, detail) {
  if (section === "social") return "total";

  if (section === "andalucia") {
    if (detail === "areas") return "projects";
    if (detail === "provinces") return "investment_eur";
    if (detail === "ods") return "projects";
    if (detail === "funding") return "investment_eur";
  }

  if (section === "international") {
    return "investment_eur";
  }

  return "investment_eur";
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

  const comparisonYear =
    year === "2024" ? "2023" : "2024";

  const previous = dataByYear[comparisonYear];

  const cards = useMemo(
    () =>
      current
        ? buildCards(current, section)
        : [],
    [current, section]
  );

  const narrative = useMemo(
    () =>
      current
        ? buildNarrative(current, section)
        : null,
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
    () =>
      buildTableColumns(section, detail, rows),
    [section, detail, rows]
  );

  const ranking = useMemo(
    () =>
      buildTopRanking(rows, metric, 8),
    [rows, metric]
  );

  const heading = getSectionHeading(section);

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
                {heading.eyebrow}
              </div>

              <h2 className="section-block__title">
                {heading.title}
              </h2>

              <p className="section-block__text">
                {heading.text}
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
              previousYear={comparisonYear}
            />
          </section>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
}
