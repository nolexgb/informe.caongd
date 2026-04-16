import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import KpiGrid from '../components/KpiGrid'
import StorySteps from '../components/StorySteps'
import FiltersPanel from '../components/FiltersPanel'
import { useData } from '../context/DataContext'
import { useFilters } from '../context/FilterContext'
import { fmt, money } from '../utils/format'

export default function HomePage() {
  const { filters } = useFilters()
  const { data, loading } = useData(filters.year)
  if (loading || !data) return <div className="loading">Cargando datos…</div>

  return (
    <>
      <Hero
        eyebrow="V3 · plataforma de datos"
        title="Una herramienta mucho más versátil, conectada y preparada para publicar el informe anual."
        copy="La V3 convierte el informe en una plataforma interactiva con navegación superior premium, filtros compartibles por URL, mapas conectados y comparativas anuales listas para GitHub."
        actions={[
          <Link key="1" className="button" to="/andalucia">Abrir Andalucía</Link>,
          <Link key="2" className="button button--ghost" to="/comparador">Abrir comparador</Link>
        ]}
      />
      <FiltersPanel />
      <KpiGrid items={[
        { label: 'ONGD participantes', value: fmt(data.summary.ongd_participants) },
        { label: 'Proyectos en Andalucía', value: fmt(data.andalusia_work.projects) },
        { label: 'Países de trabajo', value: fmt(data.international_work.countries) },
        { label: 'Inversión internacional', value: money(data.international_work.investment_eur) }
      ]} />
      <StorySteps steps={[
        { title: 'Consolidación', copy: 'Todos los bloques del informe conviven en una única estructura de datos preparada para crecer por años, territorios y entidades.' },
        { title: 'Exploración', copy: 'Los filtros cruzados activan una lectura dinámica que afecta a mapas, tablas, rankings y comparativas dentro de la misma interfaz.' },
        { title: 'Publicación', copy: 'La plataforma puede regenerarse cada año sin rehacer la web, solo actualizando el dataset y manteniendo el marco narrativo.' }
      ]} />
    </>
  )
}
