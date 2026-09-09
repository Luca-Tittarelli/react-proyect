import IndexClient from './IndexClient';
import { dolarAPI, macroAPI, RiesgoPaisAPI, dolarFechaAPI, variableAPI, RiesgoPaisHistoricoAPI } from '@/apis';
import { getDatesRange, getYesterdayDate, filtrarUltimoMes } from '@/utils/functions';
import { fetchFinancialNews } from '@/utils/newsFetcher';

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

async function getHistoricalMacro() {
    try {
        const dates = getDatesRange();
        const targets = ['riesgo-pais', 27, 6, 1, 32, 15];
        
        const promises = targets.map(async (id) => {
            try {
                if (id === 'riesgo-pais') {
                    const res = await fetch(RiesgoPaisHistoricoAPI, { next: { revalidate: 300 } });
                    if (!res.ok) return null;
                    const data = await res.json();
                    const rp = filtrarUltimoMes(data)[0];
                    return { idVariable: 'riesgo-pais', valor: rp?.valor };
                } else {
                    const res = await fetch(variableAPI(id, dates[0], dates[1]), { next: { revalidate: 300 } });
                    if (!res.ok) return null;
                    const data = await res.json();
                    const obj = data.results?.[0];
                    if (obj?.detalle?.length > 0) {
                        return { idVariable: obj.idVariable, valor: obj.detalle[0].valor };
                    }
                }
            } catch (err) {
                console.error("Error in getHistoricalMacro for:", id, err);
            }
            return null;
        });

        const results = await Promise.all(promises);
        return results.filter(Boolean);
    } catch {
        return [];
    }
}

async function getHistoricalDolar(dolarList) {
    try {
        const casas = dolarList?.map(d => d.casa) || ['oficial', 'blue', 'bolsa', 'contadoconliqui', 'tarjeta', 'mayorista', 'cripto'];
        const yesterday = getYesterdayDate().replace(/-/g, '/');

        const promises = casas.map(async (casa) => {
            try {
                const res = await fetch(dolarFechaAPI(casa, yesterday), { next: { revalidate: 300 } });
                if (!res.ok) return null;
                return await res.json();
            } catch {
                return null;
            }
        });

        const results = await Promise.all(promises);
        return results.filter(Boolean);
    } catch {
        return [];
    }
}

async function getNews() {
    try {
        return await fetchFinancialNews();
    } catch {
        return [];
    }
}

export default async function Page() {
    const [dolarData, macroData, newsData] = await Promise.all([
        getDolar(),
        getMacro(),
        getNews(),
    ]);

    const [historicalMacroData, historicalDolarData] = await Promise.all([
        getHistoricalMacro(),
        getHistoricalDolar(dolarData),
    ]);

    return (
        <IndexClient 
            initialDolar={{ dolar: dolarData, cotizaciones: [] }} 
            initialVariables={macroData} 
            initialHistoricalMacro={historicalMacroData}
            initialHistoricalDolar={historicalDolarData}
            initialNews={newsData}
        />
    );
}
