export default function NarrativeHero({ narrative, year }) {
  if (!narrative) return null;

  return (
    <section className="hero panel">
      <div className="hero-copy">
        <div className="eyebrow">
          Informe interactivo {year}
        </div>

        <h1>{narrative.title}</h1>

        <p className="hero-summary">
          {narrative.summary}
        </p>

        <div className="hero-description">
          {Array.isArray(narrative.description) &&
            narrative.description.map((paragraph
