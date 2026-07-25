/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.infopeso.com.ar' }],
        destination: 'https://infopeso.com.ar/:path*',
        permanent: true,
      },
    ];
  },

  // Proxy para Google News RSS (reemplaza el proxy de Vite + vercel.json catch-all)
  async rewrites() {
    return [
      {
        source: '/gnews-rss/:path*',
        destination: 'https://news.google.com/:path*',
      },
    ];
  },

  // Soporte SSR para styled-components
  compiler: {
    styledComponents: true,
  },

  // Permitir imágenes externas usadas en el proyecto
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.cafecito.app' },
      { protocol: 'https', hostname: 's3.tradingview.com' },
    ],
  },
};

export default nextConfig;
