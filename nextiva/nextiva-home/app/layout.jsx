import SmoothScroll from '../components/SmoothScroll';
import UpdateNotice from '../components/UpdateNotice';
import '../styles/globals.css';

export const metadata = {
  title: 'UCaaS - AI Customer Experience Management Platform',
  description:
    'UCaaS is the best customer experience platform to optimize every customer journey. Business phone, contact center, AI receptionist, and unified CX in one.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'UCaaS',
    title: 'UCaaS - AI Customer Experience Management Platform',
    description:
      'UCaaS is the best customer experience platform to optimize every customer journey. Business phone, contact center, AI receptionist, and unified CX in one.',
  },
  twitter: { card: 'summary_large_image', site: '@UCaaS' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// The captured markup is styled by body-level classes, so they have to survive.
const BODY_CLASS = [
  'home', 'wp-singular', 'page-template', 'page-template-transparent-2-0',
  'page', 'page-id-97622', 'wp-custom-logo', 'wp-embed-responsive',
  'wp-theme-ucaas-2024-v2', 'design-v2', 'page-home-page-v2',
].join(' ');

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        {/* design-v2.css @imports this, but a nested remote @import is unreliable
            once the sheets are bundled — so the page requests it directly. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body className={BODY_CLASS}>
        {children}
        {/* Locomotive Scroll smooth scrolling, site-wide (client-only). */}
        <SmoothScroll />
        {/* "New version available" toast after a deploy. */}
        <UpdateNotice />
      </body>
    </html>
  );
}
