import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import { getCoords } from "../utils/coords";
import {
  normalizeMetric,
  formatValue
} from "../utils/format";

function getMapConfig(section) {
  if (section === "andalucia") {
    return {
      center: [37.45, -4.5],
      zoom: 7
    };
  }

  return {
    center: [18, 2],
    zoom: 2
  };
}

const GEO_DETAILS = ["provinces", "countries", "regions"];

function getMetricLabel(metric) {
  switch (metric) {
    case "investment_eur":
      return "Inversión";
    case "projects":
      return "Proyectos";
    case "people":
      return "Personas";
    case "ongd":
      return "ONGD";
    case "countries":
      return "Países";
    case "total":
      return "Total";
    default:
      return metric;
  }
}

export default function MapPanel({
  section,
  detail,
  rows = [],
  metric = "investment_eur"
}) {
  if (!GEO_DETAILS.includes(detail)) {
    return (
      <div className="map-fallback">
        <div>
          <strong>Vista no geográfica</strong>
          <p style={{ marginTop: "8px" }}>
            Esta vista no representa territorios con coordenadas.
          </p>
        </div>
      </div>
    );
  }

  const config = getMapConfig(section);

  const points = rows
    .map((row) => {
      const coords = getCoords(row.name);
      if (!coords) return null;

      return {
        ...row,
        coords
      };
    })
    .filter(Boolean);

  if (!points.length) {
    return (
      <div className="map-fallback">
        <div>
          <strong>Sin coordenadas disponibles</strong>
          <p style={{ marginTop: "8px" }}>
            Los datos de esta vista no incluyen ubicaciones mapeables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-shell">
      <MapContainer
        center={config.center}
        zoom={config.zoom}
        scrollWheelZoom={true}
        className="leaflet-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((row) => {
          const value =
            row[metric] ??
            row.projects ??
            row.total ??
            1;

          const radius = normalizeMetric(value, 8, 28);

          return (
            <CircleMarker
              key={row.name}
              center={row.coords}
              radius={radius}
              pathOptions={{
                color: "#ffffff",
                weight: 1.2,
                fillColor: "#2374b7",
                fillOpacity: 0.82
              }}
            >
              <Popup>
                <div style={{ minWidth: "160px" }}>
                  <strong>{row.name}</strong>
                  <div style={{ marginTop: "8px" }}>
                    {getMetricLabel(metric)}:{" "}
                    <strong>
                      {formatValue(
                        value,
                        metric === "investment_eur"
                          ? "currency"
                          : "number"
                      )}
                    </strong>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
