export const fmt = (n) => new Intl.NumberFormat('es-ES').format(n ?? 0)
export const money = (n) => `${new Intl.NumberFormat('es-ES').format(n ?? 0)} €`
