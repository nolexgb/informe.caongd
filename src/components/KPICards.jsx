export default function KpiGrid({ items }) {
  return (
    <div className="kpi-grid">
      {items.map((item) => (
        <article key={item.label} className="glass kpi-card">
          <div className="kpi-card__value">{item.value}</div>
          <div className="kpi-card__label">{item.label}</div>
          {item.note ? <div className="kpi-card__note">{item.note}</div> : null}
        </article>
      ))}
    </div>
  )
}
