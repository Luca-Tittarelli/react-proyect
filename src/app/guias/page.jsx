import { GUIAS } from '@/utils/guiasData';
import Link from 'next/link';

export const metadata = {
    title: 'Guías Educativas de Finanzas e Inversiones — Infopeso',
    description: 'Material educativo y conceptual sobre finanzas en Argentina: estructura de carteras, CEDEARs, bonos soberanos (AL30, GD30), Dólar MEP, CCL y análisis fundamental.',
    openGraph: {
        title: 'Guías Educativas de Finanzas e Inversiones — Infopeso',
        description: 'Material educativo y conceptual sobre finanzas en Argentina: estructura de carteras, CEDEARs, bonos soberanos (AL30, GD30), Dólar MEP, CCL y análisis fundamental.',
        url: 'https://infopeso.com.ar/guias',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar/guias',
    }
};

export default function GuiasHubPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://infopeso.com.ar" },
            { "@type": "ListItem", "position": 2, "name": "Guías Educativas", "item": "https://infopeso.com.ar/guias" }
        ]
    };

    const categories = Array.from(new Set(GUIAS.map(g => g.category)));

    return (
        <main className="min-h-screen pt-20 pb-16 px-5 sm:px-8 max-w-[1200px] mx-auto space-y-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Header section */}
            <div className="text-center sm:text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                     style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <span>📚 Educación & Análisis Financiero</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Guías Educativas de Finanzas e Inversiones
                </h1>
                <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Conceptos teóricos, fórmulas de valuación y marcos analíticos para comprender el mercado de capitales argentino y la macroeconomía.
                </p>
            </div>

            {/* Legal Notice */}
            <div className="p-4 rounded-xl border text-xs leading-relaxed"
                 style={{ 
                     background: 'rgba(232, 148, 43, 0.05)', 
                     borderColor: 'rgba(232, 148, 43, 0.25)',
                     color: 'var(--text-secondary)'
                 }}>
                <strong style={{ color: 'var(--accent)' }}>⚖️ AVISO LEGAL: </strong>
                El contenido de todas las guías de Infopeso tiene un propósito estrictamente educativo e informativo. No constituye asesoramiento financiero, recomendación de inversión ni solicitud u oferta de compra/venta de valores negociables. Toda decisión de inversión debe ser evaluada individualmente por el usuario con el asesoramiento de un idóneo registrado ante la CNV.
            </div>

            {/* Featured Portfolio Simulator */}
            <div className="p-6 sm:p-8 rounded-2xl border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
                 style={{ 
                     background: 'linear-gradient(135deg, rgba(196, 123, 43, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                     borderColor: 'var(--accent)' 
                 }}>
                <div className="space-y-2 max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">Simulador Educativo Gratuito</span>
                    <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Simulador y Tracker de Cartera con Múltiplos Ponderados
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Probá diferentes combinaciones de acciones argentinas y CEDEARs para estudiar sus múltiplos consolidados (P/E, ROE, Beta, Yield) de forma didáctica.
                    </p>
                </div>
                <Link
                    href="/Cartera"
                    className="px-6 py-3 rounded-xl font-bold text-sm text-white shrink-0 hover:scale-105 active:scale-95 transition-all shadow-lg"
                    style={{ background: 'var(--accent)' }}
                >
                    Abrir Simulador de Cartera →
                </Link>
            </div>

            {/* Articles Grid grouped by category */}
            <div className="space-y-12">
                {categories.map((cat) => {
                    const guiasInCategory = GUIAS.filter(g => g.category === cat);
                    return (
                        <section key={cat} className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }}></span>
                                {cat}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {guiasInCategory.map((guia) => (
                                    <Link
                                        key={guia.slug}
                                        href={`/guias/${guia.slug}`}
                                        className="group p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                                        style={{
                                            background: 'var(--bg-surface)',
                                            borderColor: 'var(--border-subtle)',
                                        }}
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
                                                <span className="font-medium">{guia.category}</span>
                                                <span>⏱️ {guia.readTime}</span>
                                            </div>
                                            <h3 className="text-base font-bold group-hover:text-accent transition-colors leading-snug" style={{ color: 'var(--text-primary)' }}>
                                                {guia.title}
                                            </h3>
                                            <p className="text-xs line-clamp-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                {guia.description}
                                            </p>
                                        </div>
                                        <div className="pt-4 mt-4 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent)' }}>
                                            <span>Leer artículo educativo</span>
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
