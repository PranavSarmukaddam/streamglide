const reasons = [
  {
    icon: '🎯',
    title: 'Personalised Attention',
    desc: 'Batch sizes capped at 10 students so every child receives individual focus and feedback.',
  },
  {
    icon: '⚡',
    title: 'Proven Methods',
    desc: 'Vedic sutras and Abacus techniques backed by decades of research and results.',
  },
  {
    icon: '📈',
    title: 'Measurable Progress',
    desc: 'Monthly assessments and parent feedback reports track each student\'s growth clearly.',
  },
  {
    icon: '🏠',
    title: 'Flexible Timings',
    desc: 'Morning and evening batches available to suit school schedules and family routines.',
  },
];

export default function WhyUs() {
  return (
    <section className="section" id="why-us">
      <div className="container">
        <div className="section__header">
          <div className="section__label">Why Choose Us</div>
          <h2 className="section__title">What Sets Us Apart</h2>
          <p className="section__subtitle">
            We don't just teach — we build lifelong learners who carry these skills
            well beyond the classroom.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((r) => (
            <div className="why-card" key={r.title}>
              <div className="why-card__icon">{r.icon}</div>
              <h3 className="why-card__title">{r.title}</h3>
              <p className="why-card__desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
