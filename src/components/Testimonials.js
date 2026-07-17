const testimonials = [
  {
    stars: '★★★★★',
    text: `My daughter used to be terrified of maths. After just two months of Vedic Maths, she's the fastest in her class! The teacher explains every concept so patiently.`,
    name: 'Priya Sharma',
    grade: 'Parent of Class 6 student',
    initial: 'P',
  },
  {
    stars: '★★★★★',
    text: `The Abacus programme is truly transformative. My son's concentration has improved dramatically. He can now do mental calculations that shock even his school teachers.`,
    name: 'Ramesh Gupta',
    grade: 'Parent of Class 3 student',
    initial: 'R',
  },
  {
    stars: '★★★★★',
    text: 'I enrolled for regular coaching in Class 8 and it changed everything. Scored 97 in Maths in my board exams. The small batch size means you never feel lost.',
    name: 'Ananya Verma',
    grade: 'Class 9 student',
    initial: 'A',
  },
];

export default function Testimonials() {
  return (
    <section className="section section--grey" id="testimonials">
      <div className="container">
        <div className="section__header">
          <div className="section__label">What Parents Say</div>
          <h2 className="section__title">Student &amp; Parent Reviews</h2>
          <p className="section__subtitle">
            Don't just take our word for it — hear from families who've seen
            the difference firsthand.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-card__stars">{t.stars}</div>
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__grade">{t.grade}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
