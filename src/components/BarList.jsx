import { fmt, money } from '../utils/format'

export default function BarList({ title, rows, metric = 'projects', moneyMode = false }) {
  const max = Math.max(...rows.map((r) => r[metric] || 0), 1)
  return (
    <section className="glass panel">
      <div className="panel__title">{title}</div>
      <div className="barlist">
        {rows.map((row) => (
          <div className="barlist__row" key={row.name}>
            <div className="barlist__head">
              <span>{row.name}</span>
              <strong>{moneyMode ? money(row[metric]) : fmt(row[metric])}</strong>
            </div>
            <div className="barlist__track"><div className="barlist__fill" style={{ width: `${(row[metric] / max) * 100}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}
