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

export default function MapPanel({
  section,
  rows = [],
  metric = "investment_eur"
}) {
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
        No hay coordenadas disponibles para esta vista.
      </div>
    );
  }

  return (
    <MapContainer
      center={config.center}
      zoom={config.zoom}
      scrollWheelZoom={true}
      className="leaflet-map"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((row) => {
        const value =
          row[metric] ??
          row.projects ??
          row.total ??
          1;

        const radius = normalizeMetric(
          value,
          8,
          28
        );

        return (
          <CircleMarker
            key={row.name}
            center={row.coords}
            radius={radius}
            pathOptions={{
              color: "#ffffff",
              weight: 1,
              fillColor: "#4da3ff",
              fillOpacity: 0.78
            }}
          >
            <Popup>
              <strong>{row.name}</strong>
              <br />

              {metric}:{" "}
              {formatValue(
                value,
                metric === "investment_eur"
                  ? "currency"
                  : "number"
              )}
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
