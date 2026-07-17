'use client';

import { useState } from 'react';
import UrlInput from '@/components/UrlInput';
import VideoCard from '@/components/VideoCard';
import FormatPicker from '@/components/FormatPicker';

const steps = [
  {
    num: '01',
    title: 'Paste Video URL',
    desc: 'Copy a YouTube video link and paste it directly into our secure input field.',
  },
  {
    num: '02',
    title: 'Choose Output Format',
    desc: 'Select high-quality MP4 (up to 1080p) or extract clean, high-bitrate MP3 audio.',
  },
  {
    num: '03',
    title: 'Download & Play',
    desc: 'Click Download to capture the file onto your device with absolute speed.',
  },
];

export default function HomePage() {
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleResult(info) {
    setVideoInfo(info);
  }

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="site-nav">
        <div className="site-nav__container">
          <div className="site-nav__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="StreamGlide Logo" className="site-nav__logo-img" />
            <span className="site-nav__logo-text">StreamGlide</span>
          </div>
          <ul className="site-nav__links">
            <li><a href="#" className="site-nav__link">Downloader</a></li>
            <li><a href="#how-it-works" className="site-nav__link">How It Works</a></li>
            <li><a href="#features" className="site-nav__link">Features</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero" id="downloader">
        <div className="hero__content">
          <div className="hero__badge">Premium Media Utility</div>
          <h1 className="hero__title">
            Capture video & audio with seamless speed.
          </h1>
          <p className="hero__desc">
            An elegant, secure interface to convert YouTube streams into high-definition MP4 videos or extract crystal-clear MP3 audio files. No ads, no tracking, no friction.
          </p>

          <ul className="feature-list" id="features">
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text"><strong>High-Definition</strong> downloads up to 1080p.</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text"><strong>Crystal-Clear</strong> audio siphoned directly to 320kbps MP3.</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text"><strong>Privacy Focused:</strong> Zero tracking, zero analytics, for personal use only.</span>
            </li>
          </ul>
        </div>

        {/* Downloader Widget */}
        <div className="hero__widget">
          <div className="downloader-widget">
            <UrlInput onResult={handleResult} onLoading={setLoading} />

            {/* Render results when video info is parsed */}
            {videoInfo && !loading && (
              <>
                <div className="divider" />
                <VideoCard info={videoInfo} />
                <FormatPicker videoUrl={videoInfo.url} />
              </>
            )}
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="how-to" id="how-it-works">
        <h2 className="how-to__title">Designed for simplicity</h2>
        <div className="how-to__steps">
          {steps.map((s) => (
            <div key={s.num} className="how-to__step">
              <div className="how-to__step-num">{s.num}</div>
              <h3 className="how-to__step-title">{s.title}</h3>
              <p className="how-to__step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <span className="site-footer__note">
          © {new Date().getFullYear()} StreamGlide - All rights reserved.
        </span>
        <span className="site-footer__warning">
          🛡️ Respect copyright regulations and download for personal use only.
        </span>
      </footer>
    </div>
  );
}
