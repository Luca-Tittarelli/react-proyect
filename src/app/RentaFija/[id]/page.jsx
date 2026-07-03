import { BOND_DATA } from '@/utils/bondCalculator';
import BonoDetalleClient from './BonoDetalleClient';
import Link from 'next/link';

export function generateStaticParams() {
    return Object.keys(BOND_DATA).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const bond = BOND_DATA[id];
    if (!bond) return {};

    const title = `Calculadora de TIR del Bono ${id} Hoy — Paridad y Rendimiento — Infopeso`;
    const description = `Calculadora interactiva del Bono Soberano Argentino ${id} (${bond.name}). Consulta su TIR (XIRR), paridad, cronograma y flujo de fondos pendientes en dólares.`;
    
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://infopeso.com.ar/RentaFija/${id}`,
            siteName: "Infopeso",
            locale: "es_AR",
            type: "website",
            images: [{ url: "https://infopeso.com.ar/logo.png" }],
        },
        alternates: {
            canonical: `https://infopeso.com.ar/RentaFija/${id}`,
        }
    };
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const bond = BOND_DATA[id];

    if (!bond) {
        return (
            <main className="min-h-screen pt-24 text-center">
                <h1 className="text-xl font-bold">Bono no encontrado</h1>
                <Link href="/RentaFija" className="underline mt-4 inline-block text-accent">Volver a Renta Fija</Link>
            </main>
        );
    }

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
                "name": "Renta Fija",
                "item": "https://infopeso.com.ar/RentaFija"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": bond.name,
                "item": `https://infopeso.com.ar/RentaFija/${id}`
            }
        ]
    };

    const financialProductSchema = {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": bond.name,
        "description": `Bono Soberano Argentino con ticker ${id} emitido en dólares estadounidenses.`,
        "provider": {
            "@type": "Organization",
            "name": "Infopeso"
        }
    };

    return (
        <main className="min-h-screen pt-14 pb-16 md:pb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
            />

            <section className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
                {/* Breadcrumbs (Server-rendered) */}
                <nav className="flex items-center gap-2 mb-6">
                    <Link
                        href="/RentaFija"
                        className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Renta Fija
                    </Link>
                    <span style={{ color: 'var(--border-subtle)' }}>/</span>
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        Bono {id}
                    </span>
                </nav>

                {/* Client calculator & TV MiniChart */}
                <BonoDetalleClient ticker={id} bond={bond} />

                {/* Rich text section (Server-rendered, indexable!) */}
                <section className="mt-10 pt-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        Información Financiera sobre el Bono {id}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                                ¿Qué es el Bono {id}?
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                El bono {bond.name} es un título público de deuda soberana emitido por la República Argentina en dólares estadounidenses. Forma parte del esquema de reestructuración de deuda y representa una promesa de pago con cronogramas pre-establecidos de interés y amortizaciones parciales de capital (amortizing bond).
                            </p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                                ¿Cómo funciona esta calculadora?
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                La calculadora computa la Tasa Interna de Retorno (TIR) usando la fórmula XIRR para flujos de fondos con intervalos irregulares, tomando el precio ingresado como flujo negativo inicial y los cupones futuros como flujos positivos. La paridad representa la relación porcentual entre el precio actual de mercado y el valor residual del bono (VNO pendiente).
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
}
