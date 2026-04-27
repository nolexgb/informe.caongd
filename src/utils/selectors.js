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

function topItem(rows = [], metric = "investment_eur") {
  const valid = rows.filter(
    (row) => typeof row?.[metric] === "number"
  );

  if (!valid.length) return null;

  return [...valid].sort((a, b) => b[metric] - a[metric])[0];
}

function topLabel(rows = [], metric = "investment_eur") {
  return topItem(rows, metric)?.name || null;
}

function getShareLabel(rows = [], metric = "investment_eur") {
  const top = topItem(rows, metric);
  if (!top) return null;

  const total = rows.reduce(
    (sum, row) =>
      sum + (typeof row?.[metric] === "number" ? row[metric] : 0),
    0
  );

  if (!total) return null;

  const share = (top[metric] / total) * 100;

  return {
    name: top.name,
    share: Math.round(share)
  };
}

/* =====================================
   NARRATIVE (AVANZADO)
===================================== */

export function buildNarrative(data, section) {
  if (!data) return null;

  if (section === "andalucia") {
    const provinceShare = getShareLabel(
      data?.andalusia_work?.province_source_table,
      "investment_eur"
    );

    const topArea = topLabel(
      data?.andalusia_work?.areas,
      "projects"
    );

    return {
      title: "Trabajo en Andalucía",

      subtitle: provinceShare
        ? `${provinceShare.name} concentra el ${provinceShare.share}% de la inversión territorial`
        : "Distribución territorial y áreas de trabajo",

      text: topArea
        ? `La actividad en Andalucía combina implantación provincial y áreas de intervención. ${topArea} destaca como el ámbito con mayor volumen de proyectos.`
        : "Análisis territorial, financiación y actividad en Andalucía.",

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

  if (section === "international") {
    const countryShare = getShareLabel(
      data?.international_work?.top_countries_investment,
      "investment_eur"
    );

    const topRegion = topLabel(
      data?.international_work?.geographic_areas,
      "investment_eur"
    );

    return {
      title: "Trabajo en otros países",

      subtitle: countryShare
        ? `${countryShare.name} representa el ${countryShare.share}% de la inversión`
        : "Cobertura internacional",

      text: topRegion
        ? `${topRegion} es la región con mayor peso económico dentro de la acción internacional.`
        : "Análisis global de la actividad internacional.",

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

  if (section === "social") {
    const members = safe(data?.social_base?.members);
    const volunteers = safe(data?.social_base?.volunteers_andalusia);
    const staff = safe(data?.social_base?.staff_andalusia);

    return {
      title: "Base social e implantación",

      subtitle:
        volunteers > staff
          ? "El voluntariado es el principal motor social"
          : "Estructura organizativa consolidada",

      text:
        `La base social integra ${members} personas socias, ${volunteers} voluntarias y ${staff} profesionales.`,

      stats: [
        {
          label: "Personas socias",
          rawValue: members
        },
        {
          label: "Voluntariado",
          rawValue: volunteers
        },
        {
          label: "Personal",
          rawValue: staff
        },
        {
          label: "Órganos de gobierno",
          rawValue: safe(data?.social_base?.boards_total)
        }
      ]
    };
  }

  if (section === "compare") {
    return {
      title: "Comparador anual",
      subtitle: "Evolución entre ejercicios",
      text:
        "Análisis de cambios en actividad, inversión y alcance social.",
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

  const totalProjects =
    safe(data?.andalusia_work?.projects) +
    safe(data?.international_work?.projects);

  return {
    title:
      "Sistema de publicación de datos de la Coordinadora Andaluza de ONGD",

    subtitle:
      `${totalProjects} proyectos entre Andalucía y ámbito internacional`,

    text:
      "Plataforma interactiva para explorar el informe anual mediante datos, mapas y comparativas.",

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
   KPI CARDS
===================================== */

export function buildCards(data, section) {
  if (!data) return [];

  if (section === "andalucia") {
    return [
      {
        label: "Proyectos",
        value: safe(data?.andalusia_work?.projects),
        type: "number",
        note: "Actividad en Andalucía"
      },
      {
        label: "Inversión",
        value: safe(data?.andalusia_work?.investment_eur),
        type: "currency",
        note: "Volumen económico"
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
        note: "Ecosistema activo"
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
        note: "Alcance"
      },
      {
        label: "Inversión",
        value: safe(data?.international_work?.investment_eur),
        type: "currency",
        note: "Financiación"
      }
    ];
  }

  if (section === "social") {
    return [
      {
        label: "Personas socias",
        value: safe(data?.social_base?.members),
        type: "number"
      },
      {
        label: "Voluntariado",
        value: safe(data?.social_base?.volunteers_andalusia),
        type: "number"
      },
      {
        label: "Personal",
        value: safe(data?.social_base?.staff_andalusia),
        type: "number"
      },
      {
        label: "Gobernanza",
        value: safe(data?.social_base?.boards_total),
        type: "number"
      }
    ];
  }

  return [
    {
      label: "Entidades",
      value: safe(data?.summary?.entities_participating),
      type: "number"
    },
    {
      label: "ONGD",
      value: safe(data?.summary?.ongd_participants),
      type: "number"
    },
    {
      label: "Andalucía",
      value: safe(data?.andalusia_work?.projects),
      type: "number"
    },
    {
      label: "Internacional",
      value: safe(data?.international_work?.projects),
      type: "number"
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

  const keys = Object.keys(rows[0]);

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
