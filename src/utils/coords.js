const COORDS = {
  // Andalucía
  Sevilla: [37.3891, -5.9845],
  Málaga: [36.7213, -4.4214],
  Granada: [37.1773, -3.5986],
  Córdoba: [37.8882, -4.7794],
  Cádiz: [36.5271, -6.2886],
  Almería: [36.8340, -2.4637],
  Huelva: [37.2614, -6.9447],
  Jaén: [37.7796, -3.7849],

  // Países frecuentes
  Marruecos: [31.7917, -7.0926],
  Mali: [17.5707, -3.9962],
  Senegal: [14.4974, -14.4524],
  Mozambique: [-18.6657, 35.5296],
  El Salvador: [13.7942, -88.8965],
  Guatemala: [15.7835, -90.2308],
  Honduras: [15.2, -86.2419],
  Nicaragua: [12.8654, -85.2072],
  Bolivia: [-16.2902, -63.5887],
  Perú: [-9.19, -75.0152],
  Colombia: [4.5709, -74.2973],
  Ecuador: [-1.8312, -78.1834],

  // Regiones agregadas
  "África Occidental": [14.8, -5.5],
  "África del Norte": [28, 10],
  "África Oriental": [1.5, 37],
  "África Media": [0, 20],
  "Centroamérica y Caribe": [15.5, -84],
  "América del Sur": [-15, -60],
  Asia: [28, 84],
  "Oriente Medio": [31, 37]
};

export function getCoords(name) {
  return COORDS[name] || null;
}
