import CarteraClient from './CarteraClient';
import Link from 'next/link';

export const metadata = {
    title: 'Simulador y Tracker de Cartera de Inversiones — Acciones y CEDEARs | Infopeso',
    description: 'Herramienta gratuita de simulación y monitoreo de carteras personales con acciones argentinas y CEDEARs. Cálculo de múltiplos ponderados (P/E, ROE, Beta), diagnósticos automáticos y análisis fundamental. Fines estrictamente educativos e informativos.',
    keywords: [
        'simulador de cartera de inversiones',
        'tracker de acciones argentinas',
        'seguimiento de cedears',
        'portfolio de inversiones gratis',
        'diagnostico de cartera',
        'multiplos ponderados pe roe',
        'analisis fundamental cedears'
    ],
    openGraph: {
        title: 'Simulador y Tracker de Cartera de Inversiones — Infopeso',
        description: 'Monitoreo consolidado de fundamentals para carteras personales. Múltiplos ponderados (P/E, ROE, Margen, Beta, Dividend Yield), diagnósticos automatizados y consenso de mercado. Fines estrictamente educativos e informativos.',
        url: 'https://infopeso.com.ar/Cartera',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png', width: 512, height: 512, alt: 'Simulador de Cartera Infopeso' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar/Cartera',
    }
};

export default function Page() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Simulador de Cartera de Inversiones Infopeso",
        "url": "https://infopeso.com.ar/Cartera",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Herramienta gratuita de simulación y diagnóstico educativo de carteras de inversión con acciones argentinas y CEDEARs, múltiplos ponderados y métricas fundamentales."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Cómo funciona el simulador de cartera de Infopeso?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Permite seleccionar activos (acciones locales del Merval y CEDEARs internacionales) y configurar porcentajes de ponderación teóricos. El algoritmo calcula automáticamente los múltiplos promedio ponderados (P/E, ROE, Beta, Dividend Yield) y genera diagnósticos estadísticos de concentración."
                }
            },
            {
                "@type": "Question",
                "name": "¿Las alertas y diagnósticos de la cartera son recomendaciones de compra o venta?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Todos los diagnósticos, puntuaciones y múltiplos son cálculos cuantitativos automatizados con fines exclusivamente ilustrativos y pedagógicos. No constituyen asesoramiento financiero ni sugerencias de inversión bajo la Ley N° 26.831 de la CNV."
                }
            },
            {
                "@type": "Question",
                "name": "¿Mis datos quedan guardados de forma segura?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Tu portafolio se guarda exclusivamente en el almacenamiento local de tu navegador (localStorage). No necesitas crear una cuenta, ni ingresar contraseñas, ni vincular cuentas bancarias."
                }
            }
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://infopeso.com.ar" },
            { "@type": "ListItem", "position": 2, "name": "Simulador de Cartera", "item": "https://infopeso.com.ar/Cartera" }
        ]
    };

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Server-Rendered Indexable SEO Header for Googlebot */}
            <section className="pt-20 pb-4 px-5 sm:px-8 max-w-[1400px] mx-auto space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase"
                                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                ⚡ Herramienta Educativa Gratuita
                            </span>
                            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                                Sin registro · Simulación y análisis fundamental
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Simulador y Diagnóstico de Cartera de Inversiones
                        </h1>
                        <p className="text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Monitoreo cuantitativo de carteras personales con acciones argentinas y CEDEARs. Cálculo consolidado de múltiplos fundamentales (P/E, ROE, Beta, Margen Operativo), métricas de diversificación y estimaciones de mercado.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link 
                            href="/guias/armar-cartera-inversiones-argentina" 
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold border hover:bg-[var(--bg-surface-hover)] transition-colors inline-flex items-center gap-1.5"
                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                        >
                            <span>📖 Guía conceptual de carteras</span>
                        </Link>
                    </div>
                </div>

                {/* Legal Disclaimer Box */}
                <div className="p-3.5 rounded-xl border text-[11px] leading-relaxed"
                     style={{ 
                         background: 'rgba(232, 148, 43, 0.05)', 
                         borderColor: 'rgba(232, 148, 43, 0.25)',
                         color: 'var(--text-secondary)'
                     }}>
                    <strong style={{ color: 'var(--accent)' }}>⚖️ DESCARGO DE RESPONSABILIDAD: </strong>
                    Esta herramienta es un simulador cuantitativo para fines pedagógicos e ilustrativos. <strong>No brinda asesoramiento financiero, recomendaciones de compra o venta, ni gestión de carteras</strong> regulada por la Ley N° 26.831 de la CNV. Las puntuaciones, diagnósticos y consensos son cálculos algorítmicos teóricos y no garantizan rentabilidad futura.
                </div>
            </section>

            {/* Interactive Client Component */}
            <CarteraClient />

            {/* Server-Rendered Context & FAQ Section at Bottom for SEO & AI-SEO */}
            <section className="py-16 px-5 sm:px-8 max-w-[1200px] mx-auto border-t mt-16 space-y-12" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                        <h3 className="font-bold text-sm text-accent">🎯 Diagnóstico Cuantitativo</h3>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Algoritmos estadísticos que calculan la distribución sectorial, la concentración patrimonial y la dispersión de activos de forma automática.
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                        <h3 className="font-bold text-sm text-positive">📊 Múltiplos Ponderados</h3>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Fórmulas matemáticas que ponderan ratios fundamentales (P/E, ROE, Margen Operativo, Beta) en función del peso porcentual de cada activo simulado.
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                        <h3 className="font-bold text-sm text-accent">🔒 Privacidad Total</h3>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Tu información queda almacenada exclusivamente en tu navegador (localStorage). Sin servidores externos ni vinculación de cuentas.
                        </p>
                    </div>
                </div>

                {/* FAQs */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Preguntas Frecuentes sobre el Simulador
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                            <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                                ¿Cómo se calculan los múltiplos ponderados?
                            </h4>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Cada ratio fundamental reportado se multiplica por su porcentaje de participación en el portafolio, sumándose para arrojar una métrica promedio representativa.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                            <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                                ¿Constituye asesoramiento financiero?
                            </h4>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                No. Es una herramienta técnica de cálculo y análisis matemático. Toda decisión de inversión real requiere asesoramiento profesional matriculado ante la CNV.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
