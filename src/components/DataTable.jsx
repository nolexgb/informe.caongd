import { formatValue } from "../utils/format";

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

    if (value === null
