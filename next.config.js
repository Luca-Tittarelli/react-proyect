/** @type {import('next').NextConfig} */
const nextConfig = {
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
