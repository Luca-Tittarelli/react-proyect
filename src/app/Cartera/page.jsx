import CarteraClient from './CarteraClient';

export const metadata = {
    title: 'Seguí tu Cartera de Acciones — Infopeso',
    description: 'Monitorea tus inversiones en vivo. Análisis fundamental, plan de negocios, múltiplos de valuación y opinión de profesionales para tus acciones argentinas e internacionales.',
    openGraph: {
        title: 'Seguí tu Cartera de Acciones — Infopeso',
        description: 'Monitorea tus inversiones en vivo. Análisis fundamental, plan de negocios, múltiplos de valuación y opinión de profesionales para tus acciones argentinas e internacionales.',
        url: 'https://infopeso.com.ar/Cartera',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar/Cartera',
    }
};

export default function Page() {
    return <CarteraClient />;
}
