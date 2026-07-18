import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

function normalizeCookies(cookiesStr) {
  if (!cookiesStr) return '';
  return cookiesStr
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return line;
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 7) {
        const first6 = parts.slice(0, 6);
        const value = parts.slice(6).join(' ');
        return [...first6, value].join('\t');
      }
      return parts.join('\t');
    })
    .join('\n');
}

function getCookiesPath() {
  const cookiesStr = process.env.YOUTUBE_COOKIES;
  if (!cookiesStr) return null;
  const tempCookiesPath = path.join(os.tmpdir(), 'cookies.txt');
  try {
    const normalized = normalizeCookies(cookiesStr);
    fs.writeFileSync(tempCookiesPath, normalized, 'utf-8');
    return tempCookiesPath;
  } catch (err) {
    console.error('Failed to write cookies file:', err);
    return null;
  }
}

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

const FFMPEG_BIN = process.env.FFMPEG_BIN || (() => {
  if (process.platform !== 'win32') {
    if (fs.existsSync('/usr/bin/ffmpeg')) return '/usr/bin/ffmpeg';
    if (fs.existsSync('/usr/local/bin/ffmpeg')) return '/usr/local/bin/ffmpeg';
  }
  return path.join(
    process.cwd(),
    'node_modules',
    'ffmpeg-static',
    process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg'
  );
})();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const type = searchParams.get('type') ?? 'video'; // 'video' | 'audio'
  const quality = searchParams.get('quality') ?? 'best';

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing url param' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Build yt-dlp format selector
  let formatSelector;
  let ext;

  if (type === 'audio') {
    formatSelector = 'bestaudio/best';
    ext = 'mp3';
  } else {
    const h = parseInt(quality, 10);
    if (quality === 'best' || isNaN(h)) {
      formatSelector = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best';
    } else {
      formatSelector =
        `bestvideo[height<=${h}][ext=mp4]+bestaudio[ext=m4a]/` +
        `bestvideo[height<=${h}]+bestaudio/` +
        `best[height<=${h}]/best`;
    }
    ext = 'mp4';
  }

  const safeQuality = type === 'audio' ? `${quality}-audio` : `${quality}p`;
  const filename = `ytdown-${safeQuality}-${Date.now()}.${ext}`;

  // Make sure a temp directory exists in workspace
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, filename);

  const spawnArgs = [
    url,
    '--format', formatSelector,
    '--output', tempFilePath,
    '--no-playlist',
    '--no-check-certificates',
    '--no-warnings',
    '--quiet',
    '--ffmpeg-location', FFMPEG_BIN,
    '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  ];

  const cookiesPath = getCookiesPath();
  if (cookiesPath) {
    spawnArgs.push('--cookies', cookiesPath);
  }

  if (type === 'audio') {
    spawnArgs.push(
      '--extract-audio',
      '--audio-format', 'mp3',
      '--audio-quality', '0'
    );
  }

  try {
    // 1. Download and mux locally first
    let stderr = '';
    await new Promise((resolve, reject) => {
      const proc = spawn(YTDLP_BIN, spawnArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
      proc.stderr.on('data', (d) => { stderr += d.toString(); });
      proc.on('error', (err) => reject(err));
      proc.on('close', (code) => {
        if (code !== 0) {
          const cookieExists = cookiesPath ? fs.existsSync(cookiesPath) : false;
          const cookieSize = cookieExists ? fs.statSync(cookiesPath).size : 0;
          reject(new Error(`yt-dlp exited with code ${code}. Stderr: ${stderr.trim()} (Cookie file: ${cookieExists ? 'created' : 'missing'}, size: ${cookieSize} bytes)`));
        } else {
          resolve();
        }
      });
    });

    if (!fs.existsSync(tempFilePath)) {
      throw new Error('Downloaded file not found on disk.');
    }

    const stats = fs.statSync(tempFilePath);
    if (stats.size === 0) {
      throw new Error('Downloaded file is empty.');
    }

    // 2. Stream back to client
    const mimeType = type === 'audio' ? 'audio/mpeg' : 'video/mp4';
    const fileStream = fs.createReadStream(tempFilePath);

    const headers = new Headers({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': stats.size.toString(),
      'X-Accel-Buffering': 'no',
      'Cache-Control': 'no-store',
    });

    const readable = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => {
          try {
            controller.enqueue(new Uint8Array(chunk));
          } catch (e) {
            fileStream.destroy();
          }
        });
        fileStream.on('end', () => {
          try {
            controller.close();
          } catch (e) {}
          fs.unlink(tempFilePath, () => {});
        });
        fileStream.on('error', (err) => {
          try {
            controller.error(err);
          } catch (e) {}
          fs.unlink(tempFilePath, () => {});
        });
      },
      cancel() {
        fileStream.destroy();
        fs.unlink(tempFilePath, () => {});
      }
    });

    return new Response(readable, { status: 200, headers });

  } catch (err) {
    console.error('[/api/download] download error:', err.message);
    if (fs.existsSync(tempFilePath)) {
      try { fs.unlinkSync(tempFilePath); } catch (e) {}
    }
    return new Response(
      JSON.stringify({ error: 'Download failed: ' + err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
