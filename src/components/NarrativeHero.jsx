export default function StorySteps({ steps }) {
  return (
    <section className="story-grid">
      {steps.map((step, index) => (
        <article key={step.title} className="glass story-card">
          <div className="story-card__index">0{index + 1}</div>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </article>
      ))}
    </section>
  )
}
