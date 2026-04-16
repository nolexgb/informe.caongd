import Hero from '../components/Hero'
import FiltersPanel from '../components/FiltersPanel'
import KpiGrid from '../components/KpiGrid'
import BarList from '../components/BarList'
import DataTable from '../components/DataTable'
import MapView from '../components/MapView'
import { useData } from '../context/DataContext'
import { useFilters } from '../context/FilterContext'
import { fmt, money } from '../utils/format'

export default function OtrosPaisesPage() {
  const { filters } = useFilters()
  const { data, loading } = useData(filters.year)
  if (loading || !data) return <div className="loading">Cargando datos…</div>

  const countries = filters.country
    ? data.international_work.top_countries_investment.filter((c) => c.name === filters.country)
    : data.international_work.top_countries_investment

  return (
    <>
      <Hero eyebrow="Trabajo en otros países" title="Mapa mundial, países prioritarios y lectura comparativa por región." copy="La herramienta consolida la dimensión internacional con una vista cartográfica, rankings por país y lectura anual lista para comparación." />
      <FiltersPanel />
      <KpiGrid items={[
        { label: 'Países', value: fmt(data.international_work.countries) },
        { label: 'Proyectos', value: fmt(data.international_work.projects) },
        { label: 'Personas', value: fmt(data.international_work.people_total) },
        { label: 'Inversión', value: money(data.international_work.investment_eur) }
      ]} />
      <div className="two-col">
        <MapView points={countries} center={[18, 0]} zoom={2} mode="country" />
        <BarList title="Top países por inversión" rows={countries} metric="investment_eur" moneyMode />
      </div>
      <DataTable columns={[
        { key: 'name', label: 'País' },
        { key: 'projects', label: 'Proyectos' },
        { key: 'people', label: 'Personas' },
        { key: 'investment_eur', label: 'Inversión', type: 'money' }
      ]} rows={countries} />
    </>
  )
}
