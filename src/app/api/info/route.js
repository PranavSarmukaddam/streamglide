import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

const YTDLP_BIN = process.env.YTDLP_BIN || (() => {
  if (process.platform !== 'win32') {
    if (fs.existsSync('/usr/local/bin/yt-dlp')) return '/usr/local/bin/yt-dlp';
    if (fs.existsSync('/usr/bin/yt-dlp')) return '/usr/bin/yt-dlp';
  }
  return path.join(
    process.cwd(),
    'node_modules',
    'yt-dlp-exec',
    'bin',
    process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp'
  );
})();

function getCookiesPath() {
  const cookiesStr = process.env.YOUTUBE_COOKIES;
  if (!cookiesStr) return null;
  const tempCookiesPath = path.join(os.tmpdir(), 'cookies.txt');
  try {
    fs.writeFileSync(tempCookiesPath, cookiesStr.trim(), 'utf-8');
    return tempCookiesPath;
  } catch (err) {
    console.error('Failed to write cookies file:', err);
    return null;
  }
}

/** Run yt-dlp and collect stdout/stderr, resolving even on non-zero exit */
function runYtDlp(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(YTDLP_BIN, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    proc.on('error', reject);
    proc.on('close', () => resolve({ stdout, stderr }));
  });
}

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'No URL provided.' }, { status: 400 });
    }

    // Basic YouTube URL validation
    const ytPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|live\/)|youtu\.be\/)[\w-]{11}/;
    if (!ytPattern.test(url.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid YouTube URL.' },
        { status: 400 }
      );
    }

    const args = [
      url.trim(),
      '--dump-json',
      '--no-playlist',
      '--no-check-certificates',
      '--no-warnings',
      '--quiet',
      '--ignore-no-formats-error',
    ];

    const cookiesPath = getCookiesPath();
    if (cookiesPath) {
      args.push('--cookies', cookiesPath);
    }

    const { stdout, stderr } = await runYtDlp(args);

    // stdout contains the JSON even if exit code was non-zero
    const raw = stdout.trim();
    if (!raw) {
      console.error('[/api/info] yt-dlp stderr:', stderr);
      return NextResponse.json(
        { error: 'Could not fetch video info. ' + (stderr.split('\n')[0] ?? '') },
        { status: 500 }
      );
    }

    const info = JSON.parse(raw);

    // Collect available video heights
    const heightSet = new Set();
    if (Array.isArray(info.formats)) {
      for (const f of info.formats) {
        if (f.height && f.vcodec && f.vcodec !== 'none') {
          heightSet.add(f.height);
        }
      }
    }
    const availableHeights = [...heightSet]
      .sort((a, b) => a - b)
      .filter((h) => [360, 480, 720, 1080, 1440, 2160].includes(h));

    // Format duration mm:ss or hh:mm:ss
    let duration = '';
    if (info.duration) {
      const total = Math.floor(info.duration);
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      duration = h
        ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        : `${m}:${String(s).padStart(2, '0')}`;
    }

    return NextResponse.json({
      title: info.title ?? info.fulltitle ?? 'Unknown Title',
      channel: info.uploader ?? info.channel ?? 'Unknown Channel',
      thumbnail: info.thumbnail ?? null,
      duration,
      viewCount: info.view_count ? Number(info.view_count).toLocaleString() : null,
      availableHeights: availableHeights.length ? availableHeights : [360, 720],
    });
  } catch (err) {
    console.error('[/api/info] error:', err?.message ?? err);
    return NextResponse.json(
      { error: 'Unexpected error: ' + (err?.message ?? 'unknown') },
      { status: 500 }
    );
  }
}
