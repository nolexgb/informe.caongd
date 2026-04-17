import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import FiltersBar from "./components/FiltersBar";
import NarrativeHero from "./components/NarrativeHero";
import KPICards from "./components/KPICards";
import MapPanel from "./components/MapPanel";
import RankingList from "./components/RankingList";
import DataTable from "./components/DataTable";
import ComparePanel from "./components/ComparePanel";
import {
  buildCards,
  buildNarrative,
  buildRows,
  buildTableColumns,
  buildTopRanking
} from "./utils/selectors";

const DATA_YEARS = ["2023", "2024"];

export default function App() {
  const [year, setYear] = useState("2024");
  const [section, setSection] = useState("overview");
  const [detail, setDetail] = useState("areas");
  const [metric, setMetric] = useState("investment_eur");
  const [dataByYear, setDataByYear] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        const entries = await Promise.all(
          DATA_YEARS.map(async (y) => {
            const url = `${import.meta.env.BASE_URL}data/data-${y}.json`;
            const res = await fetch(url);
            if (!res.ok) {
              throw new Error(`No se pudo cargar ${url}`);
            }
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

    loadAll();
  }, []);

  const current = dataByYear[year];
  const previous = year === "2024" ? dataByYear["2023"] : null;

  useEffect(() => {
    if (section === "overview") setDetail("areas");
    if (section === "andalucia") setDetail("areas");
    if (section === "international") setDetail("regions");
    if (section === "social") setDetail("social");
    if (section === "compare") setDetail("comparison");
  }, [section]);

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

  if (loading) {
    return (
      <div className="app-shell loading-screen">
        <div className="loading-card">
          <div className="eyebrow">CAONGD Data Explorer</div>
          <h1>Cargando plataforma…</h1>
          <p>Preparando visualizaciones, tablas, rankings y mapas.</p>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="app-shell loading-screen">
        <div className="loading-card">
          <div className="eyebrow">Error</div>
          <h1>No se han podido cargar los datos</h1>
          <p>Revisa que existan los archivos en <code>public/data/</code>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header
        section={section}
        setSection={setSection}
      />

      <main className="page-wrap">
        <NarrativeHero narrative={narrative} year={year} />

        <FiltersBar
          year={year}
          setYear={setYear}
          section={section}
          setSection={setSection}
          detail={detail}
          setDetail={setDetail}
          metric={metric}
          setMetric={setMetric}
        />

        {section === "compare" ? (
          <ComparePanel current={current} previous={previous} year={year} />
        ) : (
          <>
            <KPICards cards={cards} />

            <section className="content-grid">
              <div className="panel panel-map">
                <div className="panel-head">
                  <div>
                    <div className="eyebrow">Mapa interactivo</div>
                    <h2>Lectura territorial</h2>
                  </div>
                </div>
                <MapPanel
                  section={section}
                  detail={detail}
                  rows={rows}
                  metric={metric}
                />
              </div>

              <div className="panel panel-ranking">
                <div className="panel-head">
                  <div>
                    <div className="eyebrow">Ranking</div>
                    <h2>Principales resultados</h2>
                  </div>
                </div>
                <RankingList rows={ranking} metric={metric} />
              </div>
            </section>

            <section className="panel panel-table">
              <div className="panel-head">
                <div>
                  <div className="eyebrow">Detalle tabular</div>
                  <h2>Datos consolidados</h2>
                </div>
              </div>
              <DataTable columns={columns} rows={rows} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
