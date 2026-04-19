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
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={index === 0 ? "is-primary-col" : ""}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.name || rowIndex}
                className={rowIndex % 2 === 0 ? "is-even" : "is-odd"}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${row.name || rowIndex}-${column.key}`}
                    className={colIndex === 0 ? "is-primary-col" : ""}
                  >
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
