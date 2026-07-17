const quickLinks = ['Courses', 'About', 'Why Us', 'Testimonials', 'Contact'];
const programmes = ['Vedic Mathematics', 'Abacus Training', 'Regular Coaching (1–9)', 'Combined Package'];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div>
            <div className="footer__brand-name">Gyandeep Academy</div>
            <div className="footer__brand-tag">Vedic Maths · Abacus · Academic Coaching</div>
            <p className="footer__brand-desc">
              Helping students from Class 1 to 9 build confidence, speed, and
              a genuine love for mathematics through proven, structured methods.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer__col-title">Quick Links</div>
            <ul className="footer__links">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="footer__link">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <div className="footer__col-title">Programmes</div>
            <ul className="footer__links">
              {programmes.map((p) => (
                <li key={p}>
                  <a href="#courses" className="footer__link">{p}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer__col-title">Contact</div>
            <ul className="footer__links">
              <li><span className="footer__link">📞 +91 98765 43210</span></li>
              <li><span className="footer__link">✉️ gyandeepacademy@gmail.com</span></li>
              <li><span className="footer__link">📍 123, Shanti Nagar, Your City</span></li>
              <li style={{ marginTop: '12px' }}>
                <span className="footer__link">Mon – Sat: 7 AM – 7 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            © {year} Gyandeep Academy. All rights reserved.
          </div>
          <div className="footer__made">
            Nurturing young minds, one number at a time.
          </div>
        </div>
      </div>
    </footer>
  );
}
