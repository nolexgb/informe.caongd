import { useEffect, useMemo, useState } from "react";

const INITIAL_FORM = {
  ejercicio: "2026",
  entidad: "",
  siglas: "",
  cif: "",
  personaContacto: "",
  email: "",
  telefono: "",
  web: "",
  sede: "",
  provincias: [],
  municipios: "",
  paises: "",
  regiones: [],
  ods: [],
  lineas: [],
  proyectosAndalucia: "",
  proyectosInternacionales: "",
  personasTotal: "",
  mujeres: "",
  hombres: "",
  infancia: "",
  juventud: "",
  voluntariado: "",
  personasSocias: "",
  personasTrabajadoras: "",
  financiacionPublica: "",
  financiacionPrivada: "",
  fondosPropios: "",
  presupuestoTotal: "",
  observaciones: ""
};

const PROVINCIAS = ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"];
const REGIONES = ["África", "América Latina y Caribe", "Asia", "Europa", "Oriente Medio"];
const LINEAS = ["Cooperación internacional", "Educación para la ciudadanía global", "Acción humanitaria", "Incidencia política", "Voluntariado", "Investigación y formación", "Comercio justo", "Comunicación social"];
const ODS = ["ODS 1", "ODS 2", "ODS 3", "ODS 4", "ODS 5", "ODS 6", "ODS 8", "ODS 10", "ODS 13", "ODS 16", "ODS 17"];

function Field({ label, name, value, onChange, type = "text", required = false, help, min }) {
  return (
    <label className="form-field">
      <span className="form-field__label">{label} {required && <strong>*</strong>}</span>
      {help && <span className="form-field__help">{help}</span>}
      <input name={name} value={value} onChange={onChange} type={type} min={min} required={required} />
    </label>
  );
}

function CheckGroup({ title, name, options, selected, onToggle }) {
  return (
    <div className="form-field form-field--full">
      <span className="form-field__label">{title}</span>
      <div className="check-grid">
        {options.map((option) => (
          <label className="check-card" key={option}>
            <input type="checkbox" checked={selected.includes(option)} onChange={() => onToggle(name, option)} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function toCsv(data) {
  const rows = Object.entries(data).map(([key, value]) => [key, Array.isArray(value) ? value.join(" | ") : value]);
  return rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function DataCollectionForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("caongd-form-draft");
    if (saved) setForm({ ...INITIAL_FORM, ...JSON.parse(saved) });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("caongd-form-draft", JSON.stringify(form));
  }, [form]);

  const completion = useMemo(() => {
    const required = ["entidad", "cif", "personaContacto", "email", "sede", "presupuestoTotal"];
    const done = required.filter((key) => String(form[key]).trim()).length;
    return Math.round((done / required.length) * 100);
  }, [form]);

  const totalsWarning = useMemo(() => {
    const partes = Number(form.financiacionPublica || 0) + Number(form.financiacionPrivada || 0) + Number(form.fondosPropios || 0);
    const total = Number(form.presupuestoTotal || 0);
    return total > 0 && partes > 0 && Math.abs(partes - total) > 1;
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleArray(name, value) {
    setForm((current) => {
      const values = current[name];
      return { ...current, [name]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] };
    });
  }

  function payload() {
    return { ...form, fechaEnvio: new Date().toISOString(), fuente: "Ficha digital CAONGD", estado: "pendiente_validacion" };
  }

  function exportJson() {
    const data = payload();
    downloadFile(`caongd-${form.ejercicio}-${form.entidad || "entidad"}.json`, JSON.stringify(data, null, 2), "application/json");
  }

  function exportCsv() {
    downloadFile(`caongd-${form.ejercicio}-${form.entidad || "entidad"}.csv`, toCsv(payload()), "text/csv;charset=utf-8");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    exportJson();
  }

  function resetDraft() {
    setForm(INITIAL_FORM);
    setSubmitted(false);
    window.localStorage.removeItem("caongd-form-draft");
  }

  return (
    <main className="page-wrap app-main form-page">
      <section className="form-hero panel">
        <div>
          <div className="eyebrow">Ficha online de recogida · Entidades socias</div>
          <h1>Formulario para alimentar el informe virtual CAONGD</h1>
          <p>Recogida estructurada, validación y exportación de datos para generar indicadores, mapas, rankings y comparativas interanuales.</p>
        </div>
        <div className="form-progress"><span>{completion}%</span><small>campos clave completados</small></div>
      </section>

      <form className="collection-form" onSubmit={handleSubmit}>
        <section className="panel panel-section form-section">
          <div className="form-section__header"><span className="form-step">01</span><div><h2>Datos generales de la entidad</h2><p>Identificación, contacto y datos básicos de la ONGD.</p></div></div>
          <div className="form-grid">
            <Field label="Ejercicio" name="ejercicio" value={form.ejercicio} onChange={handleChange} required />
            <Field label="Nombre de la entidad" name="entidad" value={form.entidad} onChange={handleChange} required />
            <Field label="Siglas" name="siglas" value={form.siglas} onChange={handleChange} />
            <Field label="CIF" name="cif" value={form.cif} onChange={handleChange} required />
            <Field label="Persona de contacto" name="personaContacto" value={form.personaContacto} onChange={handleChange} required />
            <Field label="Correo electrónico" name="email" value={form.email} onChange={handleChange} type="email" required />
            <Field label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
            <Field label="Página web" name="web" value={form.web} onChange={handleChange} type="url" help="Ejemplo: https://www.entidad.org" />
            <Field label="Sede principal" name="sede" value={form.sede} onChange={handleChange} required />
          </div>
        </section>

        <section className="panel panel-section form-section">
          <div className="form-section__header"><span className="form-step">02</span><div><h2>Presencia territorial</h2><p>Datos preparados para mapas y filtros territoriales.</p></div></div>
          <div className="form-grid">
            <CheckGroup title="Provincias andaluzas con presencia" name="provincias" options={PROVINCIAS} selected={form.provincias} onToggle={toggleArray} />
            <label className="form-field form-field--full"><span className="form-field__label">Municipios andaluces</span><span className="form-field__help">Separar municipios con comas.</span><textarea name="municipios" value={form.municipios} onChange={handleChange} rows="3" /></label>
            <CheckGroup title="Regiones internacionales" name="regiones" options={REGIONES} selected={form.regiones} onToggle={toggleArray} />
            <label className="form-field form-field--full"><span className="form-field__label">Países de intervención</span><span className="form-field__help">Separar países con comas para facilitar la normalización.</span><textarea name="paises" value={form.paises} onChange={handleChange} rows="4" /></label>
          </div>
        </section>

        <section className="panel panel-section form-section">
          <div className="form-section__header"><span className="form-step">03</span><div><h2>Proyectos y líneas de actuación</h2><p>Clasificación temática para gráficos, tablas y comparativas.</p></div></div>
          <div className="form-grid">
            <CheckGroup title="Líneas de actuación" name="lineas" options={LINEAS} selected={form.lineas} onToggle={toggleArray} />
            <CheckGroup title="ODS principales" name="ods" options={ODS} selected={form.ods} onToggle={toggleArray} />
            <Field label="Nº proyectos en Andalucía" name="proyectosAndalucia" value={form.proyectosAndalucia} onChange={handleChange} type="number" min="0" />
            <Field label="Nº proyectos internacionales" name="proyectosInternacionales" value={form.proyectosInternacionales} onChange={handleChange} type="number" min="0" />
          </div>
        </section>

        <section className="panel panel-section form-section">
          <div className="form-section__header"><span className="form-step">04</span><div><h2>Personas, voluntariado y base social</h2><p>Indicadores sociales del trabajo de la entidad.</p></div></div>
          <div className="form-grid">
            <Field label="Personas beneficiarias total" name="personasTotal" value={form.personasTotal} onChange={handleChange} type="number" min="0" />
            <Field label="Mujeres beneficiarias" name="mujeres" value={form.mujeres} onChange={handleChange} type="number" min="0" />
            <Field label="Hombres beneficiarios" name="hombres" value={form.hombres} onChange={handleChange} type="number" min="0" />
            <Field label="Infancia" name="infancia" value={form.infancia} onChange={handleChange} type="number" min="0" />
            <Field label="Juventud" name="juventud" value={form.juventud} onChange={handleChange} type="number" min="0" />
            <Field label="Personas voluntarias" name="voluntariado" value={form.voluntariado} onChange={handleChange} type="number" min="0" />
            <Field label="Personas socias" name="personasSocias" value={form.personasSocias} onChange={handleChange} type="number" min="0" />
            <Field label="Personas trabajadoras" name="personasTrabajadoras" value={form.personasTrabajadoras} onChange={handleChange} type="number" min="0" />
          </div>
        </section>

        <section className="panel panel-section form-section">
          <div className="form-section__header"><span className="form-step">05</span><div><h2>Recursos económicos</h2><p>Control de importes para financiación pública, privada y presupuesto total.</p></div></div>
          <div className="form-grid">
            <Field label="Financiación pública (€)" name="financiacionPublica" value={form.financiacionPublica} onChange={handleChange} type="number" min="0" />
            <Field label="Financiación privada (€)" name="financiacionPrivada" value={form.financiacionPrivada} onChange={handleChange} type="number" min="0" />
            <Field label="Fondos propios (€)" name="fondosPropios" value={form.fondosPropios} onChange={handleChange} type="number" min="0" />
            <Field label="Presupuesto total ejecutado (€)" name="presupuestoTotal" value={form.presupuestoTotal} onChange={handleChange} type="number" min="0" required />
          </div>
          {totalsWarning && <div className="form-warning">Aviso: la suma de financiación pública, privada y fondos propios no coincide con el presupuesto total.</div>}
        </section>

        <section className="panel panel-section form-section">
          <div className="form-section__header"><span className="form-step">06</span><div><h2>Validación y envío</h2><p>Exportación del registro para integrar los datos en el informe virtual.</p></div></div>
          <label className="form-field form-field--full"><span className="form-field__label">Observaciones</span><textarea name="observaciones" value={form.observaciones} onChange={handleChange} rows="5" /></label>
          {submitted && <div className="form-success" role="status">Ficha generada correctamente. El archivo JSON descargado queda preparado para validación y carga en la base de datos del informe.</div>}
          <div className="form-actions">
            <button type="submit" className="primary-action">Enviar y exportar JSON</button>
            <button type="button" className="secondary-action" onClick={exportCsv}>Exportar CSV</button>
            <button type="button" className="ghost-action" onClick={resetDraft}>Limpiar formulario</button>
          </div>
        </section>
      </form>
    </main>
  );
}
