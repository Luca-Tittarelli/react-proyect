import { dolarAPI } from '@/apis';
import CalculadoraBlueClient from './CalculadoraBlueClient';
import Link from 'next/link';

export const metadata = {
    title: 'Calculadora de Pesos a Dólar Blue Hoy en Argentina (Conversor Online) — Infopeso',
    description: 'Calcula al instante el equivalente de tus pesos argentinos a dólar blue (o dólares a pesos). Tabla de conversiones frecuentes ($100, $500, $1000 USD) al tipo de cambio paralelo de hoy.',
    openGraph: {
        title: 'Calculadora de Pesos a Dólar Blue Hoy en Argentina (Conversor Online) — Infopeso',
        description: 'Calcula al instante el equivalente de tus pesos argentinos a dólar blue (o dólares a pesos). Tabla de conversiones frecuentes ($100, $500, $1000 USD) al tipo de cambio paralelo de hoy.',
        url: 'https://infopeso.com.ar/Cambios/calculadora-pesos-a-dolar-blue',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar/Cambios/calculadora-pesos-a-dolar-blue',
    }
};

async function getDolarBlue() {
    try {
        const res = await fetch(dolarAPI, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const data = await res.json();
        return data.find(item => item.casa === 'blue') || null;
    } catch {
        return null;
    }
}

export default async function Page() {
    const dolarBlueData = await getDolarBlue();

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Pesos a Dólar Blue",
        "url": "https://infopeso.com.ar/Cambios/calculadora-pesos-a-dolar-blue",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "description": "Calculadora conversora online en tiempo real de pesos argentinos a dólar blue."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Cómo funciona la calculadora de pesos a dólar blue?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La calculadora utiliza el precio de venta actualizado del dólar blue para indicar cuántos pesos necesitas para adquirir determinado monto en dólares, y el precio de compra para calcular cuántos pesos recibes al vender dólares."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cuántos pesos son 100 dólares blue hoy?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "El cálculo se realiza multiplicando 100 por el precio de cotización de venta del dólar blue del momento. Consulta la tabla interactiva de nuestra calculadora para ver el valor actualizado al instante."
                }
            }
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://infopeso.com.ar" },
            { "@type": "ListItem", "position": 2, "name": "Divisas", "item": "https://infopeso.com.ar/Cambios" },
            { "@type": "ListItem", "position": 3, "name": "Calculadora Dólar Blue", "item": "https://infopeso.com.ar/Cambios/calculadora-pesos-a-dolar-blue" }
        ]
    };

    return (
        <main className="min-h-screen pt-14 pb-16 md:pb-12">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
                <nav className="flex items-center gap-2 mb-6">
                    <Link href="/Cambios" className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline" style={{ color: 'var(--text-secondary)' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Divisas
                    </Link>
                    <span style={{ color: 'var(--border-subtle)' }}>/</span>
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        Calculadora Dólar Blue
                    </span>
                </nav>

                <CalculadoraBlueClient initialDolar={dolarBlueData} />

                {/* Explicación SEO Contextual */}
                <article className="mt-12 pt-8 border-t border-[var(--border-subtle)] space-y-6">
                    <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        ¿Cómo calcular conversiones en el mercado informal?
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Para calcular exactamente cuántos pesos necesitás para comprar dólares en el mercado informal de Argentina, tenés que multiplicar la cantidad de dólares deseada por el precio de <strong>venta</strong> del Dólar Blue. Si tenés dólares billete y querés cambiarlos a pesos, debés multiplicar por la cotización de <strong>compra</strong>.
                    </p>
                </article>
            </section>
        </main>
    );
}
