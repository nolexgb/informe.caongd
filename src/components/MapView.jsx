import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { useFilters } from '../context/FilterContext'
import { fmt, money } from '../utils/format'

export default function MapView({ points, center, zoom, mode = 'projects' }) {
  const { setFilter } = useFilters()
  return (
    <section className="glass panel map-panel">
      <div className="panel__title">Mapa interactivo</div>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: 420, borderRadius: 20 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((point) => (
          <CircleMarker
            key={point.name}
            center={[point.lat, point.lng]}
            radius={Math.max(8, Math.min(24, (point.projects || 10) / 8))}
            pathOptions={{ color: '#7ee0ff', fillColor: '#00c2ff', fillOpacity: 0.55 }}
            eventHandlers={{ click: () => setFilter(mode === 'country' ? 'country' : 'province', point.name) }}
          >
            <Popup>
              <strong>{point.name}</strong><br />
              Proyectos: {fmt(point.projects)}<br />
              Inversión: {money(point.investment_eur)}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </section>
  )
}
