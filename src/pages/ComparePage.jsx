import Hero from '../components/Hero'
import FiltersPanel from '../components/FiltersPanel'
import CompareYears from '../components/CompareYears'
import { useData } from '../context/DataContext'
import { useFilters } from '../context/FilterContext'

export default function ComparePage() {
  const { filters } = useFilters()
  const { datasets, loading } = useData(filters.year)
  if (loading || !datasets['2023'] || !datasets['2024']) return <div className="loading">Cargando datos…</div>
  const y23 = datasets['2023']
  const y24 = datasets['2024']

  return (
    <>
      <Hero eyebrow="Comparador" title="Lectura anual conectada para seguimiento del informe." copy="La V3 incorpora un comparador base entre 2023 y 2024, pensado para evolucionar a series temporales más amplias y vistas compartibles." />
      <FiltersPanel />
      <div className="compare-grid">
        <CompareYears metricLabel="Proyectos en Andalucía" previous={y23.andalusia_work.projects} current={y24.andalusia_work.projects} />
        <CompareYears metricLabel="Inversión en Andalucía" previous={y23.andalusia_work.investment_eur} current={y24.andalusia_work.investment_eur} moneyMode />
        <CompareYears metricLabel="Proyectos internacionales" previous={y23.international_work.projects} current={y24.international_work.projects} />
        <CompareYears metricLabel="Inversión internacional" previous={y23.international_work.investment_eur} current={y24.international_work.investment_eur} moneyMode />
      </div>
    </>
  )
}
