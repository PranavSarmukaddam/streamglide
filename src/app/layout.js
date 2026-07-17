import './globals.css';
import { CartProvider } from '@/components/CartProvider';

export const metadata = {
  title: 'StreamGlide - Premium HD Video & Audio Downloader',
  description:
    'Download YouTube videos in high-definition MP4 (up to 1080p) or extract crystal-clear MP3 audio. Paste any link to glide your downloads smoothly and securely.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
