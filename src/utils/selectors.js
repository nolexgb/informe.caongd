// src/utils/selectors.js

/* =====================================
   LABELS
===================================== */

const LABELS = {
  name: "Nombre",
  countries: "Países",
  ongd: "ONGD",
  projects: "Proyectos",
  people: "Personas",
  men: "Hombres",
  women: "Mujeres",
  investment_eur: "Inversión",
  total: "Total",
  women_pct: "% mujeres"
};

/* =====================================
   HELPERS
===================================== */

function safe(value, fallback = 0) {
  return value ?? fallback;
}

function topLabel(rows = [], metric = "investment_eur") {
  const valid = rows.filter(
    (row) => typeof row?.[metric] === "number"
  );

  if (!valid.length) return null;

  const best = [...valid].sort(
    (a, b) => b[metric] - a[metric]
  )[0];

  return best?.name || null;
}

/* =====================================
   NARRATIVE (MEJORADO)
===================================== */

export function buildNarrative(data, section) {
  if (!data) return null;

  /* ---------- ANDALUCÍA ---------- */
  if (section === "andalucia") {
    const topProvince = topLabel(
      data?.andalusia_work?.province_source_table,
      "investment_eur"
    );

    return {
      title: "Trabajo en Andalucía",

      subtitle: topProvince
        ? `${topProvince} concentra la mayor inversión territorial`
        : "Distribución territorial y áreas de trabajo",

      text:
        "Análisis de implantación territorial, volumen de actividad y financiación en Andalucía mediante una lectura integrada por provincias, áreas y actores.",

      stats: [
        {
          label: "ONGD activas",
          rawValue: safe(data?.andalusia_work?.ongd)
        },
        {
          label: "Proyectos",
          rawValue: safe(data?.andalusia_work?.projects)
        },
        {
          label: "Participantes",
          rawValue: safe(data?.andalusia_work?.people_total)
        },
        {
          label: "Inversión",
          rawValue: safe(data?.andalusia_work?.investment_eur),
          suffix: " €"
        }
      ]
    };
  }

  /* ---------- INTERNACIONAL ---------- */
  if (section === "international") {
    const topCountry = topLabel(
      data?.international_work?.top_countries_investment,
      "investment_eur"
    );

    return {
      title: "Trabajo en otros países",

      subtitle: topCountry
        ? `${topCountry} lidera la inversión internacional`
        : "Cobertura geográfica y alcance internacional",

      text:
        "Exploración de la actividad internacional por países, regiones y organizaciones, con foco en alcance territorial, inversión y población beneficiaria.",

      stats: [
        {
          label: "Países",
          rawValue: safe(data?.international_work?.countries)
        },
        {
          label: "Proyectos",
          rawValue: safe(data?.international_work?.projects)
        },
        {
          label: "Personas",
          rawValue: safe(data?.international_work?.people_total)
        },
        {
          label: "Inversión",
          rawValue: safe(data?.international_work?.investment_eur),
          suffix: " €"
        }
      ]
    };
  }

  /* ---------- SOCIAL ---------- */
  if (section === "social") {
    return {
      title: "Base social e implantación",

      subtitle:
        "Estructura humana y capacidad organizativa",

      text:
        "Dimensión social del ecosistema CAONGD a través de indicadores de membresía, voluntariado, personal y órganos de gobierno.",

      stats: [
        {
          label: "Personas socias",
          rawValue: safe(data?.social_base?.members)
        },
        {
          label: "Voluntariado",
          rawValue: safe(data?.social_base?.volunteers_andalusia)
        },
        {
          label: "Personal",
          rawValue: safe(data?.social_base?.staff_andalusia)
        },
        {
          label: "Órganos de gobierno",
          rawValue: safe(data?.social_base?.boards_total)
        }
      ]
    };
  }

  /* ---------- COMPARATIVA ---------- */
  if (section === "compare") {
    return {
      title: "Comparador anual",

      subtitle:
        "Evolución de indicadores entre ejercicios",

      text:
        "Lectura ejecutiva de la evolución de las principales magnitudes entre años, identificando crecimiento, descenso o estabilidad.",

      stats: [
        {
          label: "Año actual",
          value: data?.year || "2024"
        },
        {
          label: "Base comparativa",
          value: "2023"
        }
      ]
    };
  }

  /* ---------- OVERVIEW ---------- */
  return {
    title:
      "Sistema de publicación de datos de la Coordinadora Andaluza de ONGD",

    subtitle:
      "Plataforma interactiva de análisis",

    text:
      "Explora el informe anual mediante una experiencia integrada de narrativa, mapas, rankings, filtros y tablas.",

    stats: [
      {
        label: "Entidades",
        rawValue: safe(data?.summary?.entities_participating)
      },
      {
        label: "ONGD",
        rawValue: safe(data?.summary?.ongd_participants)
      },
      {
        label: "Proyectos Andalucía",
        rawValue: safe(data?.andalusia_work?.projects)
      },
      {
        label: "Proyectos internacionales",
        rawValue: safe(data?.international_work?.projects)
      }
    ]
  };
}

/* =====================================
   KPI CARDS (PRO)
===================================== */

export function buildCards(data, section) {
  if (!data) return [];

  if (section === "andalucia") {
    return [
      {
        label: "Proyectos",
        value: safe(data?.andalusia_work?.projects),
        type: "number",
        note: "Actividad total en Andalucía"
      },
      {
        label: "Inversión",
        value: safe(data?.andalusia_work?.investment_eur),
        type: "currency",
        note: "Volumen económico movilizado"
      },
      {
        label: "Personas",
        value: safe(data?.andalusia_work?.people_total),
        type: "number",
        note: `${safe(data?.andalusia_work?.women_pct)}% mujeres`
      },
      {
        label: "ONGD",
        value: safe(data?.andalusia_work?.ongd),
        type: "number",
        note: "Ecosistema organizativo"
      }
    ];
  }

  if (section === "international") {
    return [
      {
        label: "Países",
        value: safe(data?.international_work?.countries),
        type: "number",
        note: "Cobertura geográfica"
      },
      {
        label: "Proyectos",
        value: safe(data?.international_work?.projects),
        type: "number",
        note: "Intervenciones"
      },
      {
        label: "Personas",
        value: safe(data?.international_work?.people_total),
        type: "number",
        note: `${safe(data?.international_work?.women_pct)}% mujeres`
      },
      {
        label: "Inversión",
        value: safe(data?.international_work?.investment_eur),
        type: "currency",
        note: "Financiación internacional"
      }
    ];
  }

  if (section === "social") {
    return [
      {
        label: "Personas socias",
        value: safe(data?.social_base?.members),
        type: "number",
        note: "Base social activa"
      },
      {
        label: "Voluntariado",
        value: safe(data?.social_base?.volunteers_andalusia),
        type: "number",
        note: "Participación ciudadana"
      },
      {
        label: "Personal",
        value: safe(data?.social_base?.staff_andalusia),
        type: "number",
        note: "Capacidad operativa"
      },
      {
        label: "Gobernanza",
        value: safe(data?.social_base?.boards_total),
        type: "number",
        note: "Órganos de decisión"
      }
    ];
  }

  return [
    {
      label: "Entidades",
      value: safe(data?.summary?.entities_participating),
      type: "number",
      note: "Participación total"
    },
    {
      label: "ONGD",
      value: safe(data?.summary?.ongd_participants),
      type: "number",
      note: "Base organizativa"
    },
    {
      label: "Andalucía",
      value: safe(data?.andalusia_work?.projects),
      type: "number",
      note: "Proyectos territoriales"
    },
    {
      label: "Internacional",
      value: safe(data?.international_work?.projects),
      type: "number",
      note: "Proyectos globales"
    }
  ];
}

/* =====================================
   ROWS
===================================== */

export function buildRows(data, section, detail) {
  if (!data) return [];

  if (section === "andalucia") {
    if (detail === "areas") return data?.andalusia_work?.areas || [];
    if (detail === "provinces") return data?.andalusia_work?.province_source_table || [];
    if (detail === "ods") return data?.andalusia_work?.ods || [];
    if (detail === "funding") return data?.andalusia_work?.funding || [];
  }

  if (section === "international") {
    if (detail === "regions") return data?.international_work?.geographic_areas || [];
    if (detail === "countries") return data?.international_work?.top_countries_investment || [];
    if (detail === "ongd") return data?.international_work?.top_ongd_funds || [];
  }

  if (section === "social") {
    return [
      {
        name: "Personas socias",
        total: safe(data?.social_base?.members),
        women_pct: safe(data?.social_base?.members_women_pct)
      },
      {
        name: "Voluntariado",
        total: safe(data?.social_base?.volunteers_andalusia),
        women_pct: safe(data?.social_base?.volunteers_women_pct)
      }
    ];
  }

  return [];
}

/* =====================================
   TABLE COLUMNS
===================================== */

export function buildTableColumns(section, detail, rows) {
  if (!rows?.length) return [];

  if (section === "social") {
    return [
      { key: "name", label: "Indicador" },
      { key: "total", label: "Total", type: "number" },
      { key: "women_pct", label: "% mujeres", type: "percent" }
    ];
  }

  const preferred = [
    "name",
    "countries",
    "ongd",
    "projects",
    "people",
    "investment_eur"
  ];

  const keys = preferred.filter((key) => key in rows[0]);

  return keys.map((key) => ({
    key,
    label: LABELS[key] || key,
    type:
      key === "investment_eur"
        ? "currency"
        : typeof rows[0][key] === "number"
        ? "number"
        : "text"
  }));
}

/* =====================================
   RANKING
===================================== */

export function buildTopRanking(rows, metric = "investment_eur", top = 8) {
  const sorted = [...rows]
    .filter((row) => typeof row?.[metric] === "number")
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, top);

  const max = sorted[0]?.[metric] || 1;

  return sorted.map((row) => ({
    ...row,
    _pct: (row[metric] / max) * 100
  }));
}
