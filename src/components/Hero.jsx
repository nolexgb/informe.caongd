export default function Hero({ eyebrow, title, copy, actions = [] }) {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="hero__actions">
          {actions}
        </div>
      </div>
      <div className="glass hero__panel">
        <div className="hero__panelGlow" />
        <div className="hero__panelText">Explora, filtra, compara y comparte vistas con URL.</div>
      </div>
    </section>
  )
}
