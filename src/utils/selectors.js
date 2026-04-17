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

export function buildNarrative(data, section) {
  if (!data) return null;

  if (section === "andalucia") {
    return {
      title:
        data?.andalusia_work?.tool_intro?.title ||
        "Trabajo en Andalucía",

      summary:
        data?.andalusia_work?.tool_intro?.summary ||
        "Explora automáticamente las cifras clave del trabajo en Andalucía.",

      description:
        data?.andalusia_work?.tool_intro?.description || [
          "La herramienta recompone visualizaciones, rankings, tablas y mapa a partir de datos estructurados."
        ]
    };
  }

  if (section === "international") {
    return {
      title: "Trabajo en otros países",
      summary:
        "Consulta cobertura internacional, inversión, proyectos y presencia territorial.",
      description: [
        "Vista dinámica con mapa mundial, ranking y tablas comparativas.",
        "Permite una lectura ejecutiva y una exploración detallada."
      ]
    };
  }

  if (section === "social") {
    return {
      title: "Base social e implantación",
      summary:
        "Conoce la estructura humana y social de las entidades participantes.",
      description: [
        "Socias, voluntariado, personal contratado, expatriado y órganos de gobierno."
      ]
    };
  }

  if (section === "compare") {
    return {
      title: "Comparador anual",
      summary:
        "Compara automáticamente indicadores entre ejercicios.",
      description: [
        "Sistema preparado para evolucionar como publicación anual interactiva."
      ]
    };
  }

  return {
    title: "Sistema premium de publicación de datos CAONGD",
    summary:
      "Plataforma interactiva para visualizar, comparar y explorar los datos del informe anual.",
    description: [
      "Lee datos estructurados y regenera secciones temáticas automáticamente.",
      "Preparada para GitHub Pages y evolución institucional."
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
