'use client';

import { useState } from 'react';

const contactItems = [
  {
    icon: '📍',
    label: 'Address',
    value: '123, Shanti Nagar, Near City Bank, Your City – 400001',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 98765 43210',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'gyandeepacademy@gmail.com',
  },
  {
    icon: '🕐',
    label: 'Batch Timings',
    value: 'Morning: 7–9 AM  |  Evening: 5–7 PM',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section__header">
          <div className="section__label">Get In Touch</div>
          <h2 className="section__title">Enrol or Enquire</h2>
          <p className="section__subtitle">
            Fill in the form and we'll get back to you within 24 hours.
            Walk-in enquiries are always welcome too.
          </p>
        </div>

        <div className="contact__inner">
          {/* Contact Info */}
          <div className="contact__info-block">
            {contactItems.map((item) => (
              <div className="contact__info-item" key={item.label}>
                <div className="contact__info-icon">{item.icon}</div>
                <div>
                  <div className="contact__info-label">{item.label}</div>
                  <div className="contact__info-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Enquiry Form */}
          <div className="contact__form">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Enquiry Received!
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  Thank you for reaching out. We'll contact you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="contact__form-title">Send an Enquiry</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="parent-name">Parent Name</label>
                      <input id="parent-name" type="text" placeholder="e.g. Sunita Joshi" required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="student-name">Student Name</label>
                      <input id="student-name" type="text" placeholder="e.g. Rahul Joshi" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="class">Current Class</label>
                      <select id="class" required>
                        <option value="">Select class</option>
                        {[1,2,3,4,5,6,7,8,9].map(c => (
                          <option key={c} value={c}>Class {c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="course">Course of Interest</label>
                    <select id="course" required>
                      <option value="">Select a programme</option>
                      <option value="vedic">Vedic Mathematics</option>
                      <option value="abacus">Abacus Training</option>
                      <option value="regular">Regular Academic Coaching</option>
                      <option value="combined">Vedic + Abacus (Combined)</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Message (Optional)</label>
                    <textarea
                      id="message"
                      placeholder="Any specific concerns or questions you'd like to share…"
                    />
                  </div>

                  <button type="submit" className="form-submit">
                    Submit Enquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
