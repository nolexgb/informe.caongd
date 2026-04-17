import { useData } from '../context/DataContext'
import { useFilters } from '../context/FilterContext'

export default function FiltersPanel() {
  const { filters, setFilter, resetFilters } = useFilters()
  const { data } = useData(filters.year)
  if (!data) return null

  const provinceOptions = data.andalusia_work.provinces.map((p) => p.name)
  const countryOptions = data.international_work.top_countries_investment.map((c) => c.name)
  const odsOptions = data.andalusia_work.ods.map((o) => o.name)
  const funderOptions = data.andalusia_work.funding.map((f) => f.name)
  const ongdOptions = data.organizations.map((o) => o.name)

  return (
    <aside className="glass filters-panel">
      <div className="filters-panel__head">
        <div>
          <div className="eyebrow">Vista activa</div>
          <strong>Filtros cruzados</strong>
        </div>
        <button className="button button--ghost" onClick={resetFilters}>Reset</button>
      </div>
      <div className="filters-grid">
        <label><span>Año</span><select value={filters.year} onChange={(e)=>setFilter('year', e.target.value)}><option>2023</option><option>2024</option></select></label>
        <label><span>Territorio</span><select value={filters.territory} onChange={(e)=>setFilter('territory', e.target.value)}><option value="andalucia">Andalucía</option><option value="international">Otros países</option></select></label>
        <label><span>Provincia</span><select value={filters.province} onChange={(e)=>setFilter('province', e.target.value)}><option value="">Todas</option>{provinceOptions.map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>País</span><select value={filters.country} onChange={(e)=>setFilter('country', e.target.value)}><option value="">Todos</option>{countryOptions.map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>ODS</span><select value={filters.ods} onChange={(e)=>setFilter('ods', e.target.value)}><option value="">Todos</option>{odsOptions.map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>Financiadora</span><select value={filters.funder} onChange={(e)=>setFilter('funder', e.target.value)}><option value="">Todas</option>{funderOptions.map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>ONGD</span><select value={filters.organization} onChange={(e)=>setFilter('organization', e.target.value)}><option value="">Todas</option>{ongdOptions.map(x=><option key={x}>{x}</option>)}</select></label>
      </div>
    </aside>
  )
}
