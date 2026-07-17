export default function About() {
  return (
    <section className="section section--grey" id="about">
      <div className="container">
        <div className="about__inner">
          {/* Left — teacher card */}
          <div className="about__img-block">
            <div className="about__img-placeholder">👩‍🏫</div>
            <div className="about__img-name">Smt. [Teacher Name]</div>
            <div className="about__img-role">Founder &amp; Lead Educator</div>

            <div className="about__qualifications">
              <div className="about__qual-item">
                <span className="about__qual-dot"></span>
                Certified Vedic Mathematics Instructor
              </div>
              <div className="about__qual-item">
                <span className="about__qual-dot"></span>
                Level 8 Abacus Certified Trainer
              </div>
              <div className="about__qual-item">
                <span className="about__qual-dot"></span>
                B.Sc. Mathematics (Gold Medallist)
              </div>
              <div className="about__qual-item">
                <span className="about__qual-dot"></span>
                12+ Years of Teaching Experience
              </div>
            </div>
          </div>

          {/* Right — bio */}
          <div className="about__text">
            <div className="section__label">About the Educator</div>
            <h2 className="section__title">A Passion for Making Maths Joyful</h2>

            <p>
              With over a decade of dedicated teaching, our founder has helped hundreds of
              children overcome their fear of mathematics. Her approach blends the wisdom
              of ancient Vedic techniques with structured, modern pedagogy to create a
              learning environment where every child feels confident.
            </p>
            <p>
              She believes that every student has the potential to excel at mathematics —
              it only takes the right method, the right pace, and the right encouragement.
              Her small batch sizes ensure that no child is left behind.
            </p>
            <p>
              Parents consistently note improvements not just in marks, but in overall
              confidence, concentration, and love for numbers within weeks of joining.
            </p>

            <div className="about__highlights">
              <div className="about__highlight">
                <div className="about__highlight-num">500+</div>
                <div className="about__highlight-label">Students Mentored</div>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-num">12+</div>
                <div className="about__highlight-label">Years Experience</div>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-num">Rank 1</div>
                <div className="about__highlight-label">Student Achievements</div>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-num">Small</div>
                <div className="about__highlight-label">Batch Sizes (&lt;10)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
