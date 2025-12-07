// web/next.config.js
// Plain Next.js 16 config – no Nx "withNx" wrapper.
// This avoids the Nx Cloud `with-nx` "options is undefined" bug.

 /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // These are safe, modern defaults for app router projects.
    typedRoutes: true,
    instrumentationHook: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig;
