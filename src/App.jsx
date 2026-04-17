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

const YEARS = ["2023", "2024"];

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

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="eyebrow">CAONGD Data Explorer</div>
          <h1>Cargando plataforma…</h1>
          <p>Preparando gráficos, rankings, tablas y mapas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header section={section} setSection={setSection} />

      <main className="page-wrap">
        <NarrativeHero narrative={narrative} year={year} />

        <FiltersBar
          year={year}
          setYear={setYear}
          detail={detail}
          setDetail={setDetail}
          metric={metric}
          setMetric={setMetric}
          section={section}
        />

        {section === "compare" ? (
          <ComparePanel
            current={current}
            previous={previous}
            year={year}
          />
        ) : (
          <>
            <KPICards cards={cards} />

            <section className="content-grid">
              <div className="panel panel-map">
                <div className="panel-head">
                  <div>
                    <div className="eyebrow">Mapa interactivo</div>
                    <h2>Distribución territorial</h2>
                  </div>
                </div>

                <MapPanel
                  section={section}
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
                  <div className="eyebrow">Detalle</div>
                  <h2>Datos consolidados</h2>
                </div>
              </div>

              <DataTable rows={rows} columns={columns} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
