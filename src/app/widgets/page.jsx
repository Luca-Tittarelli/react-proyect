import Link from 'next/link';
import WidgetsGeneratorClient from './WidgetsGeneratorClient';

export const metadata = {
    title: 'Widgets Financieros Gratis para tu Web — Cotizaciones en Tiempo Real | Infopeso',
    description: 'Embebé widgets interactivos gratuitos de cotizaciones del Dólar Blue, MEP, Oficial y Mercados en tu sitio web, blog o portal de noticias. Código iframe listo para copiar y pegar.',
    openGraph: {
        title: 'Widgets Financieros Gratis para tu Web — Infopeso',
        description: 'Embebé widgets interactivos gratuitos de cotizaciones del Dólar Blue, MEP, Oficial y Mercados en tu sitio web, blog o portal de noticias. Código iframe listo para copiar y pegar.',
        url: 'https://infopeso.com.ar/widgets',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar/widgets',
    }
};

export default function WidgetsPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://infopeso.com.ar" },
            { "@type": "ListItem", "position": 2, "name": "Widgets Financieros", "item": "https://infopeso.com.ar/widgets" }
        ]
    };

    return (
        <main className="min-h-screen pt-20 pb-16 px-5 sm:px-8 max-w-[1200px] mx-auto space-y-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                     style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <span>💻 Herramientas para Webmasters y Medios</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Widgets de Cotizaciones Financieras para tu Web
                </h1>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Agregá cotizaciones del Dólar Blue, MEP, Oficial y seguimiento de cartera en tu blog o portal en menos de 1 minuto. Livianos, responsivos y con actualización automática.
                </p>
            </div>

            {/* Interactive Widget Configurator */}
            <WidgetsGeneratorClient />

            {/* Features & Integration Guide */}
            <section className="pt-12 border-t grid grid-cols-1 md:grid-cols-3 gap-6" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="p-6 rounded-2xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <div className="text-2xl">⚡</div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Ultra Livianos</h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Cargan en milisegundos sin afectar el rendimiento ni el Core Web Vitals de tu sitio.
                    </p>
                </div>
                <div className="p-6 rounded-2xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <div className="text-2xl">🔄</div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Actualización Automática</h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Los datos se refrescan permanentemente sin necesidad de que recargues tu servidor.
                    </p>
                </div>
                <div className="p-6 rounded-2xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <div className="text-2xl">🎨</div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Modo Oscuro & Claro</h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Se adaptan visualmente al diseño y paleta de colores de tu página web.
                    </p>
                </div>
            </section>
        </main>
    );
}
