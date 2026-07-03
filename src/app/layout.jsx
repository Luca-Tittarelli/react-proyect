import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Inter, DM_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://infopeso.com.ar"),
  title: {
    default: "Infopeso — Datos económicos de Argentina",
    template: "%s — Infopeso",
  },
  description:
    "Infopeso: datos económicos y cotizaciones de Argentina en tiempo real. Dólar Blue, Riesgo País, Inflación, Reservas BCRA y más.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Infopeso",
    "datos económicos",
    "Argentina",
    "finanzas",
    "cotizaciones",
    "dolar blue",
    "dolar hoy",
    "BCRA",
    "riesgo pais",
    "inflacion",
    "reservas",
    "tipo de cambio",
  ],
  authors: [{ name: "Infopeso" }],
  creator: "Infopeso",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Infopeso",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Infopeso" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@infopeso",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  themeColor: "#0F0F0D",
};

// JSON-LD global: Organization + WebSite
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Infopeso",
  url: "https://infopeso.com.ar",
  logo: "https://infopeso.com.ar/logo.png",
  description: "Datos económicos y cotizaciones de Argentina en tiempo real.",
  sameAs: ["https://x.com/infopeso"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Infopeso",
  url: "https://infopeso.com.ar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${dmMono.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Ahrefs Analytics (Optimized using next/script) */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="dyUorFBLMLqDr0dtEh9Klg"
          strategy="afterInteractive"
        />
        {/* Google AdSense (Optimized using next/script) */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4776852547323922"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* JSON-LD global */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
