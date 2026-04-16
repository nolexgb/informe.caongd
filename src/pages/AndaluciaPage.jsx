import Hero from '../components/Hero'
import FiltersPanel from '../components/FiltersPanel'
import KpiGrid from '../components/KpiGrid'
import BarList from '../components/BarList'
import DataTable from '../components/DataTable'
import MapView from '../components/MapView'
import { useData } from '../context/DataContext'
import { useFilters } from '../context/FilterContext'
import { fmt, money } from '../utils/format'

export default function AndaluciaPage() {
  const { filters } = useFilters()
  const { data, loading } = useData(filters.year)
  if (loading || !data) return <div className="loading">Cargando datos…</div>

  const provinces = filters.province
    ? data.andalusia_work.provinces.filter((p) => p.name === filters.province)
    : data.andalusia_work.provinces

  return (
    <>
      <Hero eyebrow={data.andalusia_work.tool_intro.eyebrow} title={data.andalusia_work.tool_intro.title} copy={data.andalusia_work.tool_intro.summary} />
      <FiltersPanel />
      <KpiGrid items={[
        { label: 'Proyectos', value: fmt(data.andalusia_work.projects) },
        { label: 'Personas participantes', value: fmt(data.andalusia_work.people_total) },
        { label: 'ONGD activas', value: fmt(data.andalusia_work.ongd) },
        { label: 'Inversión', value: money(data.andalusia_work.investment_eur) }
      ]} />
      <div className="two-col">
        <MapView points={provinces} center={[37.4, -4.7]} zoom={7} />
        <BarList title="Áreas de trabajo" rows={data.andalusia_work.areas} metric="projects" />
      </div>
      <DataTable columns={[
        { key: 'name', label: 'Provincia' },
        { key: 'ongd', label: 'ONGD' },
        { key: 'projects', label: 'Proyectos' },
        { key: 'investment_eur', label: 'Inversión', type: 'money' }
      ]} rows={provinces} />
    </>
  )
}
