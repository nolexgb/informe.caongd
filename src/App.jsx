import { useEffect, useMemo, useState } from "react";

import "./styles/theme.css";

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

  if (loading) {
    return (
      <div
        className="loading-screen"
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background:
            "linear-gradient(180deg,#f8fafc 0%,#eef6fc 100%)"
        }}
      >
        <div
          className="panel"
          style={{
            maxWidth: "620px",
            padding: "38px",
            textAlign: "center"
          }}
        >
          <div className="eyebrow">CAONGD Data Explorer</div>
          <h1 style={{ marginTop: "10px", fontSize: "40px" }}>
            Cargando plataforma…
          </h1>
          <p style={{ marginTop: "14px" }}>
            Preparando gráficos, rankings, tablas y mapas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="app-shell"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(140,196,240,.18), transparent 30%)"
      }}
    >
      <div className="page-wrap">
        <NarrativeHero narrative={narrative} year={year} />
      </div>

      <StickySectionNav
        section={section}
        setSection={setSection}
      />

      <main
        className="page-wrap"
        style={{ paddingBottom: "60px" }}
      >
        <MotionSection delay={0.05}>
          <section className="section-space">
            <div
              className="panel"
              style={{
                padding: "24px",
                borderRadius: "24px",
                background:
                  "linear-gradient(180deg,#ffffff 0%,#f8fbfe 100%)"
              }}
            >
              <div className="eyebrow">
                {sectionHeading.eyebrow}
              </div>
              <h2
                style={{
                  marginTop: "10px",
                  fontSize: "clamp(28px,4vw,44px)"
                }}
              >
                {sectionHeading.title}
              </h2>
              <p
                style={{
                  marginTop: "12px",
                  maxWidth: "760px"
                }}
              >
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
              />
            </section>
          </MotionSection>
        ) : (
          <>
            <KPICards cards={cards} />

            <section className="content-grid section-space">
              <MotionSection delay={0.12}>
                <div
                  className="panel panel-map"
                  style={{
                    padding: "24px",
                    borderRadius: "24px",
                    minHeight: "560px"
                  }}
                >
                  <div className="panel-head">
                    <div className="eyebrow">
                      Mapa interactivo
                    </div>
                    <h2
                      style={{
                        marginTop: "8px",
                        fontSize: "32px"
                      }}
                    >
                      Distribución territorial
                    </h2>
                    <p
                      style={{
                        marginTop: "12px",
                        maxWidth: "620px"
                      }}
                    >
                      Visualiza la distribución territorial de la
                      actividad según la sección, la vista y la
                      métrica seleccionada.
                    </p>
                  </div>

                  <div style={{ marginTop: "18px" }}>
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
                <div
                  className="panel panel-ranking"
                  style={{
                    padding: "24px",
                    borderRadius: "24px"
                  }}
                >
                  <div className="panel-head">
                    <div className="eyebrow">Ranking</div>
                    <h2
                      style={{
                        marginTop: "8px",
                        fontSize: "32px"
                      }}
                    >
                      Principales resultados
                    </h2>
                    <p style={{ marginTop: "12px" }}>
                      Identifica rápidamente los territorios o
                      categorías con mayor peso relativo.
                    </p>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <RankingList
                      rows={ranking}
                      metric={metric}
                    />
                  </div>
                </div>
              </MotionSection>
            </section>

            <MotionSection delay={0.22}>
              <section
                className="panel panel-table section-space"
                style={{
                  padding: "24px",
                  borderRadius: "24px"
                }}
              >
                <div className="panel-head">
                  <div className="eyebrow">Detalle</div>
                  <h2
                    style={{
                      marginTop: "8px",
                      fontSize: "32px"
                    }}
                  >
                    Datos consolidados
                  </h2>
                  <p
                    style={{
                      marginTop: "12px",
                      maxWidth: "760px"
                    }}
                  >
                    Consulta el detalle estructurado de cada vista
                    en formato tabular, con una lectura clara y
                    trazable.
                  </p>
                </div>

                <div style={{ marginTop: "18px" }}>
                  <DataTable
                    rows={rows}
                    columns={columns}
                  />
                </div>
              </section>
            </MotionSection>
          </>
        )}
      </main>
    </div>
  );
}
