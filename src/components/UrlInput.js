'use client';

import { useState } from 'react';

export default function UrlInput({ onResult, onLoading }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleFetch(e) {
    e.preventDefault();
    setError('');

    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please paste a YouTube URL first.');
      return;
    }

    setLoading(true);
    onLoading(true);

    try {
      const res = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? 'Failed to fetch video info.');
        onLoading(false);
        setLoading(false);
        return;
      }

      onResult({ ...data, url: trimmed });
    } catch {
      setError('Network error. Is the dev server running?');
    } finally {
      setLoading(false);
      onLoading(false);
    }
  }

  function handlePaste(e) {
    // Auto-submit on paste if it looks like a URL
    const pasted = e.clipboardData?.getData('text') ?? '';
    if (pasted.includes('youtube.com') || pasted.includes('youtu.be')) {
      e.preventDefault();
      setUrl(pasted);
      // Small delay so state updates first
      setTimeout(() => {
        document.getElementById('fetch-btn')?.click();
      }, 80);
    }
  }

  return (
    <div className="url-section">
      <div className="url-section__label">Paste Video URL</div>
      <form onSubmit={handleFetch}>
        <div className="url-input-row">
          <input
            id="yt-url"
            type="text"
            className={`url-input${error ? ' error' : ''}`}
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(''); }}
            onPaste={handlePaste}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            id="fetch-btn"
            type="submit"
            className="btn-fetch"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Fetching…
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Fetch Info
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="msg msg--error">
          <span>⚠️</span> {error}
        </div>
      )}
    </div>
  );
}
