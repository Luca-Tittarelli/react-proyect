import { getVariableMetadata, variablesMetadata } from '@/utils/variablesMetadata';
import EconomiaDetalleClient from './EconomiaDetalleClient';
import Link from 'next/link';

// Generate static params for SSG
export function generateStaticParams() {
    return Object.keys(variablesMetadata).map((id) => ({ id }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const meta = getVariableMetadata(id);
    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: `https://infopeso.com.ar/Economia/${id}`,
            siteName: "Infopeso",
            locale: "es_AR",
            type: "website",
            images: [{ url: "https://infopeso.com.ar/logo.png" }],
        },
        alternates: {
            canonical: `https://infopeso.com.ar/Economia/${id}`,
        }
    };
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const meta = getVariableMetadata(id);

    // Build structured data schemas
    const datasetSchema = meta.dataset ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": meta.dataset.name,
        "description": meta.description,
        "url": `https://infopeso.com.ar/Economia/${id}`,
        "creator": {
            "@type": "Organization",
            "name": "Infopeso"
        },
        "temporalCoverage": "2020-01-01/.."
    } : null;

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
                "name": "Economía",
                "item": "https://infopeso.com.ar/Economia"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": meta.title.split('—')[0].trim(),
                "item": `https://infopeso.com.ar/Economia/${id}`
            }
        ]
    };

    return (
        <main className="min-h-screen pt-14 pb-16 md:pb-12">
            {/* Inject JSON-LD Schema on Server Side */}
            {datasetSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
                />
            )}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <section className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
                {/* Breadcrumbs (Server-rendered) */}
                <nav className="flex items-center gap-2 mb-6">
                    <Link
                        href="/Economia"
                        className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Economía
                    </Link>
                    <span style={{ color: 'var(--border-subtle)' }}>/</span>
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        {meta.title.split('—')[0].trim()}
                    </span>
                </nav>

                {/* Client interactivity component (chart, updates, filters) */}
                <EconomiaDetalleClient id={id} meta={meta} />

                {/* Rich text section (Server-rendered, indexable!) */}
                {meta.faqs && meta.faqs.length > 0 && (
                    <section className="mt-10 pt-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                        <h2 className="text-lg font-bold mb-4 animate-fade-in" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                            Información y Contexto Económico
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

                        <h2 className="text-lg font-bold mb-4 mt-8" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                            Preguntas Frecuentes
                        </h2>
                        <div className="space-y-3">
                            {meta.faqs.map((faq, idx) => (
                                <div key={idx} className="p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                                    <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                                        {faq.question}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </section>
        </main>
    );
}
