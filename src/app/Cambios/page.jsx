import CambiosClient from './CambiosClient';
import { dolarAPI, cotizacionesAPI, dolarHistoricoAPI } from '@/apis';

export const metadata = {
    title: 'Cotizaciones del Dólar Hoy en Argentina — Oficial, Blue, MEP, CCL — Infopeso',
    description: 'Cotizaciones actualizadas del dólar en Argentina: Oficial, Blue, CCL, MEP y otras monedas en tiempo real. Datos provistos por DolarAPI y ArgentinaDatos.',
    openGraph: {
        title: 'Cotizaciones del Dólar Hoy en Argentina — Oficial, Blue, MEP, CCL — Infopeso',
        description: 'Cotizaciones actualizadas del dólar en Argentina: Oficial, Blue, CCL, MEP y otras monedas en tiempo real. Datos provistos por DolarAPI y ArgentinaDatos.',
        url: 'https://infopeso.com.ar/Cambios',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar/Cambios',
    }
};

async function getDolar() {
    try {
        const res = await fetch(dolarAPI, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return [];
    }
}

async function getCotizaciones() {
    try {
        const res = await fetch(cotizacionesAPI, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return [];
    }
}

async function getDolarHistorico() {
    try {
        const casas = ['oficial', 'blue', 'bolsa', 'contadoconliqui', 'tarjeta', 'cripto'];
        const results = await Promise.all(
            casas.map(async (casa) => {
                const res = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${casa}`, { next: { revalidate: 300 } });
                if (!res.ok) return [];
                const data = await res.json();
                return data.slice(-45); // last ~45 days for 1-month sparkline
            })
        );
        return results.flat();
    } catch {
        return [];
    }
}

export default async function Page() {
    const [dolarData, cotizacionesData, dolarHistoricoData] = await Promise.all([
        getDolar(),
        getCotizaciones(),
        getDolarHistorico(),
    ]);

    return (
        <CambiosClient 
            initialDolar={dolarData} 
            initialOthers={cotizacionesData} 
            initialCotizaciones={dolarHistoricoData} 
        />
    );
}
