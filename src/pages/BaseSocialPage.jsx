import Hero from '../components/Hero'
import FiltersPanel from '../components/FiltersPanel'
import KpiGrid from '../components/KpiGrid'
import CompareYears from '../components/CompareYears'
import { useData } from '../context/DataContext'
import { useFilters } from '../context/FilterContext'
import { fmt } from '../utils/format'

export default function BaseSocialPage() {
  const { filters } = useFilters()
  const { datasets, loading } = useData(filters.year)
  if (loading || !datasets['2023'] || !datasets['2024']) return <div className="loading">Cargando datos…</div>
  const current = datasets['2024'].social_base
  const previous = datasets['2023'].social_base

  return (
    <>
      <Hero eyebrow="Base social" title="Personas socias, voluntariado, empleo y gobierno de las ONGD." copy="La V3 añade comparativas anuales para entender mejor la evolución del respaldo social y la estructura humana del sector." />
      <FiltersPanel />
      <KpiGrid items={[
        { label: 'Socias', value: fmt(current.members) },
        { label: 'Voluntariado', value: fmt(current.volunteers_andalusia) },
        { label: 'Plantilla', value: fmt(current.staff_andalusia) },
        { label: 'Juntas y patronatos', value: fmt(current.boards_total) }
      ]} />
      <div className="compare-grid">
        <CompareYears metricLabel="Personas socias" current={current.members} previous={previous.members} />
        <CompareYears metricLabel="Voluntariado" current={current.volunteers_andalusia} previous={previous.volunteers_andalusia} />
        <CompareYears metricLabel="Personal contratado" current={current.staff_andalusia} previous={previous.staff_andalusia} />
      </div>
    </>
  )
}
