import { formatValue } from "../utils/format";
import MotionSection from "./MotionSection";

export default function DataTable({
  rows = [],
  columns = []
}) {
  if (!rows.length || !columns.length) {
    return (
      <div className="empty-state">
        No hay datos para mostrar.
      </div>
    );
  }

  function renderCell(row, column) {
    const value = row[column.key];

    if (value === null || value === undefined) {
      return "—";
    }

    if (column.type === "currency") {
      return formatValue(value, "currency");
    }

    if (column.type === "percent") {
      return formatValue(value, "percent");
    }

    if (typeof value === "number") {
      return formatValue(value, "number");
    }

    return value;
  }

  return (
    <MotionSection delay={0.05}>
      <div className="table-wrap premium-table-wrap">
        <table className="data-table premium-data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                {columns.map((column) => (
                  <td key={`${row.name}-${column.key}`}>
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MotionSection>
  );
}
