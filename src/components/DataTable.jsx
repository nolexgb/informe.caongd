import { fmt, money } from '../utils/format'

export default function DataTable({ columns, rows }) {
  return (
    <div className="glass panel table-wrap">
      <table>
        <thead>
          <tr>{columns.map((col) => <th key={col.key}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.name || idx}>
              {columns.map((col) => {
                const value = row[col.key]
                return <td key={col.key}>{col.type === 'money' ? money(value) : typeof value === 'number' ? fmt(value) : value}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
