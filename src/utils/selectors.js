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

function safe(value, fallback = 0) {
  return value ?? fallback;
}

export function buildNarrative(data, section) {
  if (!data) return null;

  if (section === "andalucia") {
    return {
      title:
        data?.andalusia_work?.tool_intro?.title ||
        "Trabajo en Andalucía",
      subtitle: "Distribución territorial y áreas de trabajo",
      text:
        data?.andalusia_work?.tool_intro?.summary ||
        "Explora automáticamente las cifras clave del trabajo en Andalucía mediante una lectura territorial, temática e institucional.",
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
    return {
      title: "Trabajo en otros países",
      subtitle: "Cobertura geográfica y alcance internacional",
      text:
        "Consulta cobertura internacional, inversión, proyectos y presencia territorial mediante una exploración dinámica por países, regiones y organizaciones.",
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
    return {
      title: "Base social e implantación",
      subtitle: "Estructura humana y capacidad organizativa",
      text:
        "Conoce la dimensión social de las entidades participantes a través de indicadores de membresía, voluntariado, personal y órganos de gobierno.",
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
          label: "Juntas y patronatos",
          rawValue: safe(data?.social_base?.boards_total)
        }
      ]
    };
  }

  if (section === "compare") {
    return {
      title: "Comparador anual",
      subtitle: "Cambios y evolución entre ejercicios",
      text:
        "Compara automáticamente indicadores entre ejercicios para detectar aumentos, descensos y continuidad en las magnitudes principales.",
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

  return {
    title: "Sistema premium de publicación de datos CAONGD",
    subtitle: "Plataforma interactiva institucional",
    text:
      "Visualiza, compara y explora los datos del informe anual mediante una experiencia integrada de narrativa, mapas, rankings, filtros y tablas.",
    stats: [
      {
        label: "Entidades participantes",
        rawValue: safe(data?.summary?.entities_participating)
      },
      {
        label: "ONGD participantes",
        rawValue: safe(data?.summary?.ongd_participants)
      },
      {
        label: "Trabajo Andalucía",
        rawValue: safe(data?.andalusia_work?.projects)
      },
      {
        label: "Trabajo internacional",
        rawValue: safe(data?.international_work?.projects)
      }
    ]
  };
}

export function buildCards(data, section) {
  if (section === "andalucia") {
    return [
      {
        label: "ONGD activas",
        value: data.andalusia_work.ongd,
        type: "number",
        note: "Entidades con actividad en Andalucía"
      },
      {
        label: "Proyectos",
        value: data.andalusia_work.projects,
        type: "number",
        note: "Intervenciones registradas"
      },
      {
        label: "Participantes",
        value: data.andalusia_work.people_total,
        type: "number",
        note: `${data.andalusia_work.women_pct}% mujeres`
      },
      {
        label: "Inversión",
        value: data.andalusia_work.investment_eur,
        type: "currency",
        note: "Volumen total"
      }
    ];
  }

  if (section === "international") {
    return [
      {
        label: "Países",
        value: data.international_work.countries,
        type: "number",
        note: "Cobertura geográfica"
      },
      {
        label: "Proyectos",
        value: data.international_work.projects,
        type: "number",
        note: "Intervenciones"
      },
      {
        label: "Personas",
        value: data.international_work.people_total,
        type: "number",
        note: `${data.international_work.women_pct}% mujeres`
      },
      {
        label: "Inversión",
        value: data.international_work.investment_eur,
        type: "currency",
        note: "Volumen internacional"
      }
    ];
  }

  if (section === "social") {
    return [
      {
        label: "Personas socias",
        value: data.social_base.members,
        type: "number",
        note: `${data.social_base.members_women_pct}% mujeres`
      },
      {
        label: "Voluntariado",
        value: data.social_base.volunteers_andalusia,
        type: "number",
        note: `${data.social_base.volunteers_women_pct}% mujeres`
      },
      {
        label: "Personal contratado",
        value: data.social_base.staff_andalusia,
        type: "number",
        note: `${data.social_base.staff_women_pct}% mujeres`
      },
      {
        label: "Juntas y patronatos",
        value: data.social_base.boards_total,
        type: "number",
        note: `${data.social_base.boards_women_pct}% mujeres`
      }
    ];
  }

  return [
    {
      label: "Entidades participantes",
      value: data.summary.entities_participating,
      type: "number",
      note: "Participantes en el informe"
    },
    {
      label: "ONGD participantes",
      value: data.summary.ongd_participants,
      type: "number",
      note: "Base principal"
    },
    {
      label: "Trabajo Andalucía",
      value: data.andalusia_work.projects,
      type: "number",
      note: "Proyectos"
    },
    {
      label: "Trabajo internacional",
      value: data.international_work.projects,
      type: "number",
      note: "Proyectos"
    }
  ];
}

export function buildRows(data, section, detail) {
  if (section === "andalucia") {
    if (detail === "areas") return data.andalusia_work.areas || [];
    if (detail === "provinces") return data.andalusia_work.province_source_table || [];
    if (detail === "ods") return data.andalusia_work.ods || [];
    if (detail === "funding") return data.andalusia_work.funding || [];
  }

  if (section === "international") {
    if (detail === "regions") return data.international_work.geographic_areas || [];
    if (detail === "countries") return data.international_work.top_countries_investment || [];
    if (detail === "ongd") return data.international_work.top_ongd_funds || [];
  }

  if (section === "social") {
    return [
      {
        name: "Personas socias",
        total: data.social_base.members,
        women_pct: data.social_base.members_women_pct
      },
      {
        name: "Voluntariado",
        total: data.social_base.volunteers_andalusia,
        women_pct: data.social_base.volunteers_women_pct
      },
      {
        name: "Personal contratado",
        total: data.social_base.staff_andalusia,
        women_pct: data.social_base.staff_women_pct
      },
      {
        name: "Personal expatriado",
        total: data.social_base.expatriates,
        women_pct: data.social_base.expatriates_women_pct
      },
      {
        name: "Juntas y patronatos",
        total: data.social_base.boards_total,
        women_pct: data.social_base.boards_women_pct
      }
    ];
  }

  return data.andalusia_work?.areas || [];
}

export function buildTableColumns(section, detail, rows) {
  if (!rows.length) return [];

  if (section === "social") {
    return [
      { key: "name", label: "Indicador" },
      { key: "total", label: "Total" },
      { key: "women_pct", label: "% mujeres", type: "percent" }
    ];
  }

  const preferred = [
    "name",
    "countries",
    "ongd",
    "projects",
    "people",
    "men",
    "women",
    "investment_eur",
    "total",
    "women_pct"
  ];

  const keys = preferred.filter((key) => key in rows[0]);

  return keys.map((key) => ({
    key,
    label: LABELS[key] || key,
    type:
      key === "investment_eur"
        ? "currency"
        : key === "women_pct"
        ? "percent"
        : "number"
  }));
}

export function buildTopRanking(
  rows,
  metric = "investment_eur",
  top = 8
) {
  const sorted = [...rows]
    .filter((row) => typeof row[metric] === "number")
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, top);

  const max = sorted[0]?.[metric] || 1;

  return sorted.map((row) => ({
    ...row,
    _pct: (row[metric] / max) * 100
  }));
}
