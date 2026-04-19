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
      return "Valor";
  }
}

function getMetricType(metric) {
  return metric === "investment_eur"
    ? "currency"
    : "number";
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

      const value =
        row[metric] ??
        row.projects ??
        row.total ??
        1;

      return {
        ...row,
        coords,
        value
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

  const maxValue =
    Math.max(...points.map((point) => point.value), 1);

  const metricLabel = getMetricLabel(metric);
  const metricType = getMetricType(metric);

  return (
    <div className="map-shell">
      <div className="map-legend">
        <div className="map-legend__title">
          Intensidad por {metricLabel.toLowerCase()}
        </div>

        <div className="map-legend__scale">
          <span className="map-legend__dot map-legend__dot--sm" />
          <span className="map-legend__dot map-legend__dot--md" />
          <span className="map-legend__dot map-legend__dot--lg" />
        </div>

        <div className="map-legend__labels">
          <span>Baja</span>
          <span>Media</span>
          <span>Alta</span>
        </div>
      </div>

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
          const radius = normalizeMetric(
            row.value,
            8,
            28
          );

          const opacity =
            0.45 + (row.value / maxValue) * 0.4;

          return (
            <CircleMarker
              key={row.name}
              center={row.coords}
              radius={radius}
              pathOptions={{
                color: "#ffffff",
                weight: 1.5,
                fillColor: "#2374b7",
                fillOpacity: Math.min(opacity, 0.88)
              }}
            >
              <Popup>
                <div className="map-popup">
                  <div className="map-popup__title">
                    {row.name}
                  </div>

                  <div className="map-popup__metric">
                    <span>{metricLabel}</span>
                    <strong>
                      {formatValue(row.value, metricType)}
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
