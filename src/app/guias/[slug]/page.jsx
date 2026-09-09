import { getGuiaBySlug, getAllGuiaSlugs } from '@/utils/guiasData';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return getAllGuiaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const guia = getGuiaBySlug(resolvedParams.slug);
    if (!guia) return {};

    return {
        title: `${guia.metaTitle}`,
        description: guia.description,
        openGraph: {
            title: guia.metaTitle,
            description: guia.description,
            url: `https://infopeso.com.ar/guias/${guia.slug}`,
            siteName: 'Infopeso',
            locale: 'es_AR',
            type: 'article',
            publishedTime: guia.publishedAt,
            modifiedTime: guia.updatedAt,
            authors: [guia.author],
            images: [{ url: 'https://infopeso.com.ar/logo.png', width: 512, height: 512, alt: guia.title }],
        },
        alternates: {
            canonical: `https://infopeso.com.ar/guias/${guia.slug}`,
        }
    };
}

export default async function GuiaArticuloPage({ params }) {
    const resolvedParams = await params;
    const guia = getGuiaBySlug(resolvedParams.slug);

    if (!guia) {
        notFound();
    }

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guia.title,
        "description": guia.description,
        "author": {
            "@type": "Organization",
            "name": "Infopeso",
            "url": "https://infopeso.com.ar"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Infopeso",
            "logo": {
                "@type": "ImageObject",
                "url": "https://infopeso.com.ar/logo.png"
            }
        },
        "datePublished": guia.publishedAt,
        "dateModified": guia.updatedAt,
        "mainEntityOfPage": `https://infopeso.com.ar/guias/${guia.slug}`
    };

    const faqSchema = guia.faqs && guia.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": guia.faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    } : null;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://infopeso.com.ar" },
            { "@type": "ListItem", "position": 2, "name": "Guías", "item": "https://infopeso.com.ar/guias" },
            { "@type": "ListItem", "position": 3, "name": guia.title, "item": `https://infopeso.com.ar/guias/${guia.slug}` }
        ]
    };

    return (
        <main className="min-h-screen pt-20 pb-16 px-5 sm:px-8 max-w-[900px] mx-auto">
            {/* Inject Structured Data Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
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

            {/* Breadcrumb navigation */}
            <nav className="flex items-center gap-2 text-xs mb-6 overflow-x-auto whitespace-nowrap py-1" style={{ color: 'var(--text-tertiary)' }}>
                <Link href="/" className="hover:underline">Inicio</Link>
                <span>/</span>
                <Link href="/guias" className="hover:underline">Guías Educativas</Link>
                <span>/</span>
                <span className="truncate max-w-[260px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {guia.title}
                </span>
            </nav>

            {/* Header info */}
            <header className="mb-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <span className="px-2.5 py-1 rounded-full font-semibold" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                        {guia.category}
                    </span>
                    <span>⏱️ {guia.readTime} de lectura</span>
                    <span>•</span>
                    <time dateTime={guia.updatedAt}>Actualizado: {guia.updatedAt}</time>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {guia.title}
                </h1>

                <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {guia.description}
                </p>
            </header>

            {/* Legal Disclaimer Box - Top */}
            <div className="p-4 rounded-xl mb-8 border text-xs leading-relaxed"
                 style={{ 
                     background: 'rgba(232, 148, 43, 0.05)', 
                     borderColor: 'rgba(232, 148, 43, 0.25)',
                     color: 'var(--text-secondary)'
                 }}>
                <div className="flex items-center gap-2 font-bold mb-1" style={{ color: 'var(--accent)' }}>
                    <span>⚖️ AVISO LEGAL Y DESCARGO DE RESPONSABILIDAD</span>
                </div>
                <p>
                    El contenido de este artículo tiene fines <strong>exclusivamente educativos, informativos y pedagógicos</strong>. 
                    <strong>No constituye asesoramiento financiero, recomendación de inversión, ni oferta de compra o venta</strong> de ningún título valor o activo en los términos de la Ley N° 26.831 de Mercado de Capitales de la República Argentina. Cada inversor debe realizar su propio análisis de riesgo y consultar a un idóneo matriculado ante la Comisión Nacional de Valores (CNV) antes de tomar decisiones financieras.
                </p>
            </div>

            {/* Answer-First Box (GEO & AI-SEO Optimized for snippet extraction) */}
            <div className="p-5 sm:p-6 rounded-2xl mb-10 border relative"
                 style={{ 
                     background: 'var(--bg-surface)', 
                     borderColor: 'var(--accent)',
                     borderLeftWidth: '5px'
                 }}>
                <span className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: 'var(--accent)' }}>
                    💡 Resumen Metodológico y Conceptual
                </span>
                <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
                    {guia.directAnswer}
                </p>
            </div>

            {/* Main Content Sections */}
            <article className="space-y-8 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {guia.sections.map((sec, idx) => (
                    <section key={idx} className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-6" style={{ color: 'var(--text-primary)' }}>
                            {sec.heading}
                        </h2>
                        <div className="whitespace-pre-line space-y-2">
                            {sec.content}
                        </div>
                    </section>
                ))}
            </article>

            {/* Contextual CTA Banner */}
            {guia.ctaLink && (
                <div className="my-10 p-6 rounded-2xl border text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5"
                     style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <div className="space-y-1">
                        <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                            Herramientas Interactivas y Simuladores de Infopeso
                        </h3>
                        <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Probá nuestras calculadoras financieras y paneles de simulación de múltiplos con fines pedagógicos.
                        </p>
                    </div>
                    <Link
                        href={guia.ctaLink}
                        className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shrink-0 hover:scale-105 active:scale-95 transition-transform"
                        style={{ background: 'var(--accent)' }}
                    >
                        {guia.ctaText || 'Ver herramienta en Infopeso'} →
                    </Link>
                </div>
            )}

            {/* FAQ Section */}
            {guia.faqs && guia.faqs.length > 0 && (
                <section className="mt-12 pt-8 border-t space-y-4" style={{ borderColor: 'var(--border-subtle)' }}>
                    <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Preguntas Frecuentes Relacionadas
                    </h2>
                    <div className="space-y-3">
                        {guia.faqs.map((faq, idx) => (
                            <div key={idx} className="p-4 rounded-xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    {faq.question}
                                </h3>
                                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Author Attribution & Footer Disclaimer */}
            <div className="mt-12 space-y-4">
                <div className="p-4 rounded-xl border flex items-center justify-between text-xs"
                     style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-tertiary)' }}>
                    <span>✍️ {guia.author}</span>
                    <Link href="/guias" className="hover:underline text-accent font-semibold">
                        ← Volver al Hub de Guías
                    </Link>
                </div>

                <p className="text-[11px] text-center leading-normal" style={{ color: 'var(--text-tertiary)' }}>
                    Infopeso no brinda asesoramiento financiero, recomendaciones de compra o venta ni gestión de carteras. Toda la información es de carácter ilustrativo y de acceso público.
                </p>
            </div>
        </main>
    );
}
