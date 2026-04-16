import Hero from '../components/Hero'
import FiltersPanel from '../components/FiltersPanel'
import DataTable from '../components/DataTable'
import { useData } from '../context/DataContext'
import { useFilters } from '../context/FilterContext'

export default function ONGDPage() {
  const { filters } = useFilters()
  const { data, loading } = useData(filters.year)
  if (loading || !data) return <div className="loading">Cargando datos…</div>

  const rows = filters.organization ? data.organizations.filter((o)=>o.name===filters.organization) : data.organizations

  return (
    <>
      <Hero eyebrow="ONGD" title="Fichero rápido de entidades socias" copy="La ficha de entidad es un punto de partida para evolucionar hacia perfiles completos con proyectos, territorios, financiadoras y ODS." />
      <FiltersPanel />
      <DataTable columns={[
        { key: 'name', label: 'Entidad' },
        { key: 'hq', label: 'Sede' },
        { key: 'focus', label: 'Especialidad' },
        { key: 'andalucia_projects', label: 'Proyectos Andalucía' },
        { key: 'international_projects', label: 'Proyectos internacionales' }
      ]} rows={rows} />
    </>
  )
}
