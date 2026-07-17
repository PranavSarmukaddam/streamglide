'use client';

import { useState } from 'react';

const VIDEO_QUALITIES = [
  { label: 'Best Quality', value: 'best' },
  { label: '1080p HD', value: '1080' },
  { label: '720p HD', value: '720' },
  { label: '480p', value: '480' },
  { label: '360p', value: '360' },
];

const AUDIO_QUALITIES = [
  { label: '320 kbps', value: '320k' },
  { label: '192 kbps', value: '192k' },
  { label: '128 kbps', value: '128k' },
];

export default function FormatPicker({ videoUrl }) {
  const [type, setType] = useState('video');        // 'video' | 'audio'
  const [quality, setQuality] = useState('best');
  const [status, setStatus] = useState('idle');     // 'idle' | 'downloading' | 'done' | 'error'
  const [errMsg, setErrMsg] = useState('');

  const qualities = type === 'video' ? VIDEO_QUALITIES : AUDIO_QUALITIES;

  // Reset quality when switching type
  function switchType(t) {
    setType(t);
    setQuality(t === 'video' ? 'best' : '320k');
    setStatus('idle');
    setErrMsg('');
  }

  async function handleDownload() {
    if (!videoUrl) return;
    setStatus('downloading');
    setErrMsg('');

    try {
      const params = new URLSearchParams({ url: videoUrl, type, quality });
      const res = await fetch(`/api/download?${params}`);

      if (!res.ok) {
        let msg = 'Download failed.';
        try { const j = await res.json(); msg = j.error ?? msg; } catch {}
        setErrMsg(msg);
        setStatus('error');
        return;
      }

      const blob = await res.blob();
      const ext = type === 'audio' ? 'mp3' : 'mp4';
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `streamglide-${quality}-${Date.now()}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setStatus('done');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (e) {
      setErrMsg(e?.message ?? 'Unexpected error during download.');
      setStatus('error');
    }
  }

  return (
    <div className="format-picker">
      {/* Type toggle */}
      <div className="format-picker__label">Download Options</div>

      <div className="type-tabs">
        <button
          id="tab-video"
          className={`type-tab${type === 'video' ? ' active' : ''}`}
          onClick={() => switchType('video')}
        >
          Video (MP4)
        </button>
        <button
          id="tab-audio"
          className={`type-tab${type === 'audio' ? ' active' : ''}`}
          onClick={() => switchType('audio')}
        >
          Audio Only (MP3)
        </button>
      </div>

      {/* Quality buttons */}
      <div className="quality-grid">
        {qualities.map((q) => (
          <button
            key={q.value}
            className={`quality-btn${quality === q.value ? ' selected' : ''}`}
            onClick={() => setQuality(q.value)}
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Download button */}
      <button
        id="download-btn"
        className="btn-download"
        onClick={handleDownload}
        disabled={status === 'downloading'}
      >
        {status === 'downloading' ? (
          <>
            <span className="spinner" />
            Downloading… (this may take a moment)
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download{type === 'audio' ? ' MP3' : ' MP4'} — {qualities.find(q => q.value === quality)?.label}
          </>
        )}
      </button>

      {/* Fake progress bar while downloading */}
      {status === 'downloading' && (
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: '75%', animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
      )}

      {/* Status messages */}
      {status === 'done' && (
        <div className="msg msg--success">
          Download complete. Check your device's downloads folder.
        </div>
      )}
      {status === 'error' && (
        <div className="msg msg--error">
          {errMsg || 'Download failed. Please try a different quality or check the URL.'}
        </div>
      )}
    </div>
  );
}
