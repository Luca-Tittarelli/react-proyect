import IndexClient from './IndexClient';
import { dolarAPI, macroAPI, RiesgoPaisAPI } from '@/apis';

export const metadata = {
    title: 'Infopeso — Dashboard Financiero',
    description: 'Dashboard financiero argentino. Estado del sistema económico, tasas, reservas, riesgo país y tipo de cambio en tiempo real.',
    openGraph: {
        title: 'Infopeso — Dashboard Financiero',
        description: 'Dashboard financiero argentino. Estado del sistema económico, tasas, reservas, riesgo país y tipo de cambio en tiempo real.',
        url: 'https://infopeso.com.ar',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar',
    }
};

async function getDolar() {
    try {
        const res = await fetch(dolarAPI, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return null;
    }
}

async function getMacro() {
    try {
        const macroRes = await fetch(macroAPI, { next: { revalidate: 60 } });
        const rpRes = await fetch(RiesgoPaisAPI, { next: { revalidate: 60 } });
        
        const macroData = macroRes.ok ? await macroRes.json() : {};
        const rpData = rpRes.ok ? await rpRes.json() : {};

        const mappedResults = macroData.results ? macroData.results.map((item) => ({
            ...item,
            valor: item.ultValorInformado,
            fecha: item.ultFechaInformada,
        })) : [];

        const newElement = {
            idVariable: 'riesgo-pais',
            cdSerie: 5678,
            descripcion: 'Riesgo País',
            fecha: rpData.fecha || '',
            valor: rpData.valor || 0,
        };

        return [...mappedResults, newElement];
    } catch {
        return [];
    }
}

export default async function Page() {
    const [dolarData, macroData] = await Promise.all([
        getDolar(),
        getMacro(),
    ]);

    return (
        <IndexClient 
            initialDolar={{ dolar: dolarData, cotizaciones: null }} 
            initialVariables={macroData} 
        />
    );
}
