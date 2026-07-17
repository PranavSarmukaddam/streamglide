'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__inner">
          {/* Brand */}
          <Link href="/" className="navbar__brand">
            <span className="navbar__brand-name">Gyandeep Academy</span>
            <span className="navbar__brand-tag">Vedic Maths · Abacus · School Classes</span>
          </Link>

          {/* Nav Links */}
          <ul className={`navbar__links${open ? ' open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="navbar__link navbar__cta" onClick={() => setOpen(false)}>
                Enrol Now
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
