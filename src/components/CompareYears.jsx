import { fmt, money } from '../utils/format'

export default function CompareYears({ metricLabel, current, previous, moneyMode = false }) {
  const delta = current - previous
  const pct = previous ? ((delta / previous) * 100) : 0
  const format = moneyMode ? money : fmt
  return (
    <article className="glass compare-card">
      <div className="eyebrow">Comparativa anual</div>
      <h3>{metricLabel}</h3>
      <div className="compare-values">
        <div><span>2023</span><strong>{format(previous)}</strong></div>
        <div><span>2024</span><strong>{format(current)}</strong></div>
        <div><span>Variación</span><strong className={delta >= 0 ? 'up' : 'down'}>{pct.toFixed(1)}%</strong></div>
      </div>
    </article>
  )
}
