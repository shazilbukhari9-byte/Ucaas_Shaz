// One id per build (per Vercel deployment): baked into the client bundle and
// served by /api/version, so an open tab can tell a newer deploy is live.
const BUILD_ID = process.env.VERCEL_DEPLOYMENT_ID || String(Date.now());

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // the ported block scripts bind to the DOM once, on mount

  env: { NEXT_PUBLIC_BUILD_ID: BUILD_ID },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.nextiva.com' },
      { protocol: 'https', hostname: 'nextivaweb.imgix.net' },
    ],
  },
};

export default nextConfig;
