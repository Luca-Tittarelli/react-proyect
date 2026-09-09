import { getCambioMetadata, cambiosMetadata } from '@/utils/cambiosMetadata';
import CambiosDetalleClient from './CambiosDetalleClient';
import { dolarAPI, cotizacionesAPI, dolarHistoricoAPI } from '@/apis';
import Link from 'next/link';

// Generate static params for SSG
export function generateStaticParams() {
    return Object.keys(cambiosMetadata).map((id) => ({ id }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const meta = getCambioMetadata(id);
    if (!meta) return {};

    const currencyData = await getCurrencyData(meta);
    const dynamicTitle = currencyData && currencyData.venta && currencyData.compra
        ? `${meta.name} Hoy: Venta $${currencyData.venta.toLocaleString('es-AR')} / Compra $${currencyData.compra.toLocaleString('es-AR')} — Infopeso`
        : meta.title;

    return {
        title: dynamicTitle,
        description: meta.description,
        openGraph: {
            title: dynamicTitle,
            description: meta.description,
            url: `https://infopeso.com.ar/Cambios/${id}`,
            siteName: "Infopeso",
            locale: "es_AR",
            type: "website",
            images: [{ url: "https://infopeso.com.ar/logo.png" }],
        },
        alternates: {
            canonical: `https://infopeso.com.ar/Cambios/${id}`,
        }
    };
}

async function getCurrencyData(meta) {
    try {
        if (meta.casa === 'euro' || meta.casa === 'real') {
            const res = await fetch(cotizacionesAPI, { next: { revalidate: 60 } });
            if (!res.ok) return null;
            const data = await res.json();
            return data.find(item => item.casa === meta.casa) || null;
        } else {
            const res = await fetch(dolarAPI, { next: { revalidate: 60 } });
            if (!res.ok) return null;
            const data = await res.json();
            return data.find(item => item.casa === meta.casa) || null;
        }
    } catch {
        return null;
    }
}

async function getCurrencyHistory(meta) {
    try {
        if (meta.casa === 'euro' || meta.casa === 'real') {
            return null; // No historical data available in current APIs
        }
        const res = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${meta.casa}`, { next: { revalidate: 300 } });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const meta = getCambioMetadata(id);

    if (!meta) {
        return (
            <main className="min-h-screen pt-24 pb-16 text-center">
                <h1 className="text-xl font-bold">Página no encontrada</h1>
                <Link href="/Cambios" className="underline mt-4 inline-block text-accent">Volver a Divisas</Link>
            </main>
        );
    }

    const [currencyData, historyData] = await Promise.all([
        getCurrencyData(meta),
        getCurrencyHistory(meta)
    ]);

    // Build structured data schemas
    const faqSchema = meta.faqs && meta.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": meta.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    const financialProductSchema = {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": meta.name,
        "description": meta.description,
        "provider": {
            "@type": "Organization",
            "name": "Infopeso"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://infopeso.com.ar"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Divisas",
                "item": "https://infopeso.com.ar/Cambios"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": meta.name,
                "item": `https://infopeso.com.ar/Cambios/${id}`
            }
        ]
    };

    return (
        <main className="min-h-screen pt-14 pb-16 md:pb-12">
            {/* Inject JSON-LD Schema on Server Side */}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <section className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
                {/* Breadcrumbs (Server-rendered) */}
                <nav className="flex items-center gap-2 mb-6">
                    <Link
                        href="/Cambios"
                        className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Divisas
                    </Link>
                    <span style={{ color: 'var(--border-subtle)' }}>/</span>
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        {meta.name}
                    </span>
                </nav>

                {/* Client calculator & chart component */}
                <CambiosDetalleClient 
                    id={id} 
                    meta={meta} 
                    initialData={currencyData} 
                    initialHistory={historyData} 
                />

                {/* Context section (Server-rendered, indexable!) */}
                <section className="mt-10 pt-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        Información y Contexto de Mercado
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                                ¿Qué es?
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {meta.definition}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                                ¿Por qué es importante?
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {meta.importance}
                            </p>
                        </div>
                    </div>

                    {meta.faqs && meta.faqs.length > 0 && (
                        <>
                            <h2 className="text-lg font-bold mb-4 mt-8" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                                Preguntas Frecuentes
                            </h2>
                            <div className="space-y-3">
                                {meta.faqs.map((faq, idx) => (
                                    <div key={idx} className="p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                                        <h4 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                            {faq.question}
                                        </h4>
                                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </section>
        </main>
    );
}
