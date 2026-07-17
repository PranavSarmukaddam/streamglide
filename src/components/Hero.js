export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__inner">
          {/* Left copy */}
          <div className="hero__copy">
            <div className="hero__badge">
              <span className="hero__badge-dot"></span>
              Enrolments Open 2024–25
            </div>

            <h1 className="hero__title">
              Learn Smarter with<br />
              <span>Vedic Maths</span> &amp;<br />
              Abacus
            </h1>

            <p className="hero__desc">
              A trusted learning centre helping students from Class 1 to 9
              build strong mathematical foundations through ancient Vedic techniques,
              Abacus training, and focused academic coaching.
            </p>

            <div className="hero__actions">
              <a href="#contact" className="btn-primary">Enrol Now</a>
              <a href="#courses" className="btn-outline">View Courses</a>
            </div>

            <div className="hero__stats">
              <div>
                <div className="hero__stat-num">500+</div>
                <div className="hero__stat-label">Students Trained</div>
              </div>
              <div>
                <div className="hero__stat-num">12+</div>
                <div className="hero__stat-label">Years Experience</div>
              </div>
              <div>
                <div className="hero__stat-num">95%</div>
                <div className="hero__stat-label">Improvement Rate</div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="hero__visual">
            <div className="hero__visual-inner">
              <div className="hero__visual-icon">🧮</div>
              <div className="hero__visual-label">
                Building Confidence · One Number at a Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
