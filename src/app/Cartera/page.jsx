import CarteraClient from './CarteraClient';

export const metadata = {
    title: 'Centro de Monitoreo de Fundamentals de Cartera — Infopeso',
    description: 'Monitoreo consolidado de fundamentals para carteras personales. Múltiplos ponderados (P/E, ROE, Margen, Beta, Dividend Yield), matriz comparativa, diagnósticos y consenso de Wall Street para acciones argentinas e internacionales.',
    openGraph: {
        title: 'Centro de Monitoreo de Fundamentals de Cartera — Infopeso',
        description: 'Monitoreo consolidado de fundamentals para carteras personales. Múltiplos ponderados (P/E, ROE, Margen, Beta, Dividend Yield), matriz comparativa, diagnósticos y consenso de Wall Street para acciones argentinas e internacionales.',
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
