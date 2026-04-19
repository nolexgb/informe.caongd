// src/components/DataTable.jsx

import { formatValue } from "../utils/format";
import MotionSection from "./MotionSection";

export default function DataTable({
  rows = [],
  columns = [],
  caption = "",
  emptyMessage = "No hay datos para mostrar.",
  rowKey = "name"
}) {
  if (!rows.length || !columns.length) {
    return (
      <div className="empty-state">
        {emptyMessage}
      </div>
    );
  }

  function renderCell(row, column) {
    const value = row[column.key];

    if (value === null || value === undefined || value === "") {
      return "—";
    }

    if (column.type === "currency") {
      return formatValue(value, "currency");
    }

    if (column.type === "percent") {
      return formatValue(value, "percent");
    }

    if (typeof value === "number" || column.type === "number") {
      return formatValue(value, "number");
    }

    return value;
  }

  function getCellClass(column, index) {
    const classes = [];

    if (index === 0) {
      classes.push("is-primary-col");
    }

    if (
      column.type === "currency" ||
      column.type === "percent" ||
      column.type === "number"
    ) {
      classes.push("is-numeric-col");
    }

    return classes.join(" ");
  }

  return (
    <MotionSection delay={0.05}>
      <div className="table-wrap premium-table-wrap">
        <table className="data-table premium-data-table">
          {caption ? (
            <caption className="premium-data-table__caption">
              {caption}
            </caption>
          ) : null}

          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  scope="col"
                  className={getCellClass(column, index)}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => {
              const key =
                row.id ??
                row[rowKey] ??
                row.code ??
                row.slug ??
                rowIndex;

              return (
                <tr
                  key={key}
                  className={rowIndex % 2 === 0 ? "is-even" : "is-odd"}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${key}-${column.key}`}
                      className={getCellClass(column, colIndex)}
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MotionSection>
  );
}
