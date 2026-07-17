const courses = [
  {
    icon: '🧠',
    badge: 'Flagship Programme',
    title: 'Vedic Mathematics',
    desc: 'Master lightning-fast mental arithmetic using 16 ancient sutras. Students learn to multiply, divide, square, and solve equations in seconds — building speed and accuracy simultaneously.',
    tags: ['Class 3 – 9', 'Speed Maths', 'Mental Arithmetic', 'Competitive Prep'],
  },
  {
    icon: '🧮',
    badge: 'Foundation Programme',
    title: 'Abacus Training',
    desc: 'Structured Abacus learning that strengthens concentration, memory, and bilateral brain development. Suitable from a young age, this programme builds a visual sense of numbers.',
    tags: ['Class 1 – 5', 'Beginner to Advanced', 'Concentration', 'Memory'],
  },
  {
    icon: '📚',
    badge: 'Academic Coaching',
    title: 'Regular Classes (till 9th)',
    desc: 'Comprehensive subject coaching in Mathematics and Science for students up to Class 9. Focus on concepts, board preparation, and exam strategy with personalised attention.',
    tags: ['Class 1 – 9', 'Maths', 'Science', 'Board Prep'],
  },
];

export default function Courses() {
  return (
    <section className="section" id="courses">
      <div className="container">
        <div className="section__header">
          <div className="section__label">What We Offer</div>
          <h2 className="section__title">Our Programmes</h2>
          <p className="section__subtitle">
            Carefully designed courses for every stage of a child's academic
            journey — from early numeracy to competitive readiness.
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((c) => (
            <div className="course-card" key={c.title}>
              <div className="course-card__icon">{c.icon}</div>
              <div className="course-card__badge">{c.badge}</div>
              <h3 className="course-card__title">{c.title}</h3>
              <p className="course-card__desc">{c.desc}</p>
              <div className="course-card__tags">
                {c.tags.map((t) => (
                  <span className="course-card__tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
