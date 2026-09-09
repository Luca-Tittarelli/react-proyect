import { CATEGORIES, getCompanyBySymbol } from '@/utils/carteraData';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function resolveCompany(symbolParam) {
    if (!symbolParam) return null;
    const decoded = decodeURIComponent(symbolParam).toUpperCase();
    
    let company = getCompanyBySymbol(decoded);
    if (company) return company;

    for (const cat of CATEGORIES) {
        for (const c of cat.companies) {
            if (
                c.symbol.toUpperCase() === decoded ||
                c.name.toUpperCase() === decoded ||
                c.tvSymbol.toUpperCase().endsWith(`:${decoded}`) ||
                c.symbol.toUpperCase().replace('.BA', '') === decoded
            ) {
                return { ...c, category: cat.name };
            }
        }
    }
    return null;
}

export function generateStaticParams() {
    const symbols = [];
    for (const cat of CATEGORIES) {
        for (const c of cat.companies) {
            symbols.push({ symbol: encodeURIComponent(c.symbol) });
            if (c.symbol.includes('.BA')) {
                symbols.push({ symbol: c.symbol.replace('.BA', '').toLowerCase() });
            } else {
                symbols.push({ symbol: c.symbol.toLowerCase() });
            }
        }
    }
    return symbols;
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const company = resolveCompany(resolvedParams.symbol);
    if (!company) return {};

    const title = `Acciones de ${company.name} (${company.symbol}): Fundamentals y Plan de Negocios — Infopeso`;
    const description = `Ficha informativa y análisis fundamental de ${company.name} (${company.symbol}). ${company.description} Plan de negocios y ratios clave con fines educativos.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://infopeso.com.ar/Empresas/${encodeURIComponent(company.symbol)}`,
            siteName: 'Infopeso',
            locale: 'es_AR',
            type: 'article',
            images: [{ url: company.logo || 'https://infopeso.com.ar/logo.png', width: 512, height: 512, alt: company.name }],
        },
        alternates: {
            canonical: `https://infopeso.com.ar/Empresas/${encodeURIComponent(company.symbol)}`,
        }
    };
}

export default async function EmpresaFichaPage({ params }) {
    const resolvedParams = await params;
    const company = resolveCompany(resolvedParams.symbol);

    if (!company) {
        notFound();
    }

    const financialProductSchema = {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": `Acciones de ${company.name} (${company.symbol})`,
        "description": company.description,
        "provider": {
            "@type": "Organization",
            "name": company.name,
            "url": `https://infopeso.com.ar/Empresas/${encodeURIComponent(company.symbol)}`
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://infopeso.com.ar" },
            { "@type": "ListItem", "position": 2, "name": "Empresas", "item": "https://infopeso.com.ar/Empresas" },
            { "@type": "ListItem", "position": 3, "name": company.name, "item": `https://infopeso.com.ar/Empresas/${encodeURIComponent(company.symbol)}` }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `¿Cómo se negocian las acciones o CEDEARs de ${company.name} en Argentina?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Las acciones o CEDEARs de ${company.name} (${company.symbol}) se negocian a través de agentes bursátiles (ALyCs) autorizados por la Comisión Nacional de Valores (CNV) en Bolsas y Mercados Argentinos (BYMA), ya sea en pesos o en dólares.`
                }
            },
            {
                "@type": "Question",
                "name": `¿Cuál es el modelo de negocios de ${company.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": company.planDeNegocios
                }
            },
            {
                "@type": "Question",
                "name": `¿Cuáles son los fundamentos y ratios a monitorear en ${company.name}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": company.fundamentosClave.join(' ')
                }
            }
        ]
    };

    return (
        <main className="min-h-screen pt-20 pb-16 px-5 sm:px-8 max-w-[1000px] mx-auto space-y-10">
            {/* Inject Structured Data Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <Link href="/" className="hover:underline">Inicio</Link>
                <span>/</span>
                <Link href="/Empresas" className="hover:underline">Empresas</Link>
                <span>/</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{company.name} ({company.symbol})</span>
            </nav>

            {/* Hero Header */}
            <header className="p-6 sm:p-8 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold"
                              style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                            {company.sector}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-md border font-mono font-bold"
                              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                            Ticker: {company.symbol}
                        </span>
                        <span className="text-xs text-tertiary">
                            TradingView: {company.tvSymbol}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {company.name} <span className="text-accent text-lg sm:text-2xl font-mono">({company.symbol})</span>
                    </h1>

                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {company.description}
                    </p>
                </div>

                <Link
                    href="/Cartera"
                    className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shrink-0 hover:scale-105 active:scale-95 transition-transform shadow-md flex items-center gap-2"
                    style={{ background: 'var(--accent)' }}
                >
                    <span>➕ Simular en mi Cartera</span>
                </Link>
            </header>

            {/* Legal Disclaimer Box */}
            <div className="p-4 rounded-xl border text-xs leading-relaxed"
                 style={{ 
                     background: 'rgba(232, 148, 43, 0.05)', 
                     borderColor: 'rgba(232, 148, 43, 0.25)',
                     color: 'var(--text-secondary)'
                 }}>
                <strong style={{ color: 'var(--accent)' }}>⚖️ AVISO LEGAL: </strong>
                La información presentada sobre {company.name} ({company.symbol}) es de carácter estrictamente informativo, técnico y educativo, recopilada de balances públicos y hechos relevantes de mercado. <strong>No constituye asesoramiento financiero, recomendación de inversión ni invitación a comprar o vender valores</strong> bajo la Ley N° 26.831 de la CNV.
            </div>

            {/* Business Plan & Strategy */}
            <section className="p-6 sm:p-8 rounded-2xl border space-y-4"
                     style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Plan de Negocios y Visión Estratégica
                    </h2>
                </div>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {company.planDeNegocios}
                </p>
            </section>

            {/* Key Fundamentals */}
            <section className="p-6 sm:p-8 rounded-2xl border space-y-4"
                     style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Métricas y Fundamentales a Monitorear
                    </h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {company.fundamentosClave.map((item, idx) => (
                        <li key={idx} className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm"
                            style={{ background: 'var(--bg-surface-hover)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                            <span className="text-positive font-bold">✓</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Professional Equity Research Analysis */}
            <section className="p-6 sm:p-8 rounded-2xl border space-y-4"
                     style={{ background: 'var(--bg-surface)', borderColor: 'var(--accent)' }}>
                <div className="flex items-center gap-2">
                    <span className="text-lg">🔍</span>
                    <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--accent)' }}>
                        Análisis Sectorial Informativo
                    </h2>
                </div>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {company.analisisProfesional}
                </p>
            </section>

            {/* Strategic Call to action */}
            <div className="p-6 sm:p-8 rounded-2xl border text-center space-y-4"
                 style={{ background: 'linear-gradient(135deg, rgba(196, 123, 43, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)', borderColor: 'var(--accent)' }}>
                <h3 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    ¿Querés evaluar {company.name} en conjunto con tus otras inversiones?
                </h3>
                <p className="text-xs sm:text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Nuestro simulador de cartera calcula el P/E ponderado, el riesgo y los múltiplos fundamentales en un panel consolidado y gratuito.
                </p>
                <div className="pt-2">
                    <Link
                        href="/Cartera"
                        className="px-6 py-3 rounded-xl font-bold text-sm text-white inline-flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md"
                        style={{ background: 'var(--accent)' }}
                    >
                        Abrir Simulador de Cartera →
                    </Link>
                </div>
            </div>

            {/* FAQs */}
            <section className="space-y-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Preguntas Frecuentes sobre {company.name}
                </h2>
                <div className="space-y-3">
                    {faqSchema.mainEntity.map((faq, idx) => (
                        <div key={idx} className="p-4 rounded-xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                            <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                {faq.name}
                            </h3>
                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {faq.acceptedAnswer.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
