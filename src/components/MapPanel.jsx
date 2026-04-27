// src/components/MapPanel.jsx

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

const GEO_DETAILS = ["provinces", "countries", "regions"];

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
  return metric === "investment_eur" ? "currency" : "number";
}

function getPointValue(row, metric) {
  return (
    row?.[metric] ??
    row?.investment_eur ??
    row?.projects ??
    row?.people ??
    row?.total ??
    1
  );
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
        <div className="map-fallback__content">
          <strong>Vista no geográfica</strong>
          <p className="map-fallback__text">
            Esta vista no representa territorios con coordenadas.
          </p>
        </div>
      </div>
    );
  }

  const config = getMapConfig(section);

  const points = rows
    .map((row) => {
      const coords = getCoords(row?.name);

      if (!coords) return null;

      return {
        ...row,
        coords,
        value: getPointValue(row, metric)
      };
    })
    .filter(Boolean);

  if (!points.length) {
    return (
      <div className="map-fallback">
        <div className="map-fallback__content">
          <strong>Sin coordenadas disponibles</strong>
          <p className="map-fallback__text">
            Los datos de esta vista no incluyen ubicaciones mapeables.
          </p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(
    ...points.map((point) => Number(point.value) || 0),
    1
  );

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
        scrollWheelZoom={false}
        className="leaflet-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((row) => {
          const numericValue = Number(row.value) || 0;

          const radius = normalizeMetric(
            numericValue,
            8,
            28
          );

          const opacity =
            0.42 + (numericValue / maxValue) * 0.42;

          return (
            <CircleMarker
              key={`${row.name}-${numericValue}`}
              center={row.coords}
              radius={radius}
              pathOptions={{
                color: "#ffffff",
                weight: 1.5,
                fillColor: "#2f7a6c",
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
                      {formatValue(numericValue, metricType)}
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
