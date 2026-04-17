export function formatValue(value, type = "number") {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  ) {
    return "—";
  }

  if (type === "currency") {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(value);
  }

  if (type === "percent") {
    return `${new Intl.NumberFormat("es-ES", {
      maximumFractionDigits: 2
    }).format(value)}%`;
  }

  return new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0
  }).format(value);
}

export function normalizeMetric(
  value,
  min = 8,
  max = 28
) {
  const safe = Math.max(Number(value) || 0, 1);

  const scaled = Math.log10(safe + 1) * 8;

  return Math.max(
    min,
    Math.min(max, scaled)
  );
}

export function getDelta(
  current,
  previous
) {
  if (!previous || previous === 0) {
    return 0;
  }

  return (
    ((current - previous) / previous) * 100
  );
}
