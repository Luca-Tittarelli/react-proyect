import RentaFijaClient from './RentaFijaClient';

export const metadata = {
    title: 'Cotizaciones de Renta Fija — Bonos y Obligaciones Negociables — Infopeso',
    description: 'Cotizaciones en tiempo real y calculadora de TIR (XIRR) de Bonos Soberanos de Argentina (AL30, GD30, CER) y Obligaciones Negociables (ONs).',
    openGraph: {
        title: 'Cotizaciones de Renta Fija — Bonos y Obligaciones Negociables — Infopeso',
        description: 'Cotizaciones en tiempo real y calculadora de TIR (XIRR) de Bonos Soberanos de Argentina (AL30, GD30, CER) y Obligaciones Negociables (ONs).',
        url: 'https://infopeso.com.ar/RentaFija',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar/RentaFija',
    }
};

export default function Page() {
    return <RentaFijaClient />;
}
