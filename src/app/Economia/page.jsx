import EconomiaClient from './EconomiaClient';
import { macroAPI, RiesgoPaisAPI, PBIApi, PBIGrowthApi, PBIIndustryApi, PBIAgricultureApi, PBIServicesApi, PBIManufacturingApi } from '@/apis';

export const metadata = {
    title: 'Indicadores Macroeconómicos de Argentina — Tasas, Reservas, Inflación — Infopeso',
    description: 'Seguimiento en tiempo real de los indicadores económicos clave de Argentina: inflación (INDEC), reservas del BCRA, tasa de política monetaria, PBI y base monetaria.',
    openGraph: {
        title: 'Indicadores Macroeconómicos de Argentina — Tasas, Reservas, Inflación — Infopeso',
        description: 'Seguimiento en tiempo real de los indicadores económicos clave de Argentina: inflación (INDEC), reservas del BCRA, tasa de política monetaria, PBI y base monetaria.',
        url: 'https://infopeso.com.ar/Economia',
        siteName: 'Infopeso',
        locale: 'es_AR',
        type: 'website',
        images: [{ url: 'https://infopeso.com.ar/logo.png' }],
    },
    alternates: {
        canonical: 'https://infopeso.com.ar/Economia',
    }
};

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

async function getPBI() {
    try {
        const [
            totalRes,
            growthRes,
            industryRes,
            agriRes,
            servicesRes,
            manufacRes
        ] = await Promise.all([
            fetch(PBIApi, { next: { revalidate: 3600 } }).then(r => r.json()),
            fetch(PBIGrowthApi, { next: { revalidate: 3600 } }).then(r => r.json()),
            fetch(PBIIndustryApi, { next: { revalidate: 3600 } }).then(r => r.json()),
            fetch(PBIAgricultureApi, { next: { revalidate: 3600 } }).then(r => r.json()),
            fetch(PBIServicesApi, { next: { revalidate: 3600 } }).then(r => r.json()),
            fetch(PBIManufacturingApi, { next: { revalidate: 3600 } }).then(r => r.json())
        ]);

        const extractData = (data, title, desc, formatFn = (v) => v) => {
            const series = data?.[1] || [];
            const validData = series.filter(item => item.value !== null);
            if (validData.length === 0) return null;
            const latest = validData[0];
            const previous = validData[1];
            let difference = 0;
            if (previous && previous.value) {
                difference = ((latest.value - previous.value) / Math.abs(previous.value)) * 100;
            }
            const history = validData.slice(0, 10).reverse().map(item => ({
                fecha: item.date,
                valor: item.value
            }));
            return {
                idVariable: title.replace(/\s+/g, '-').toLowerCase(),
                descripcion: `${title} (${desc})`,
                valor: formatFn(latest.value),
                fecha: latest.date,
                difference,
                history,
                rawValor: latest.value
            };
        };

        const formatUSD = (val) => {
            if (val >= 1e12) return `$ ${(val / 1e12).toFixed(2)} Billones USD`;
            if (val >= 1e9) return `$ ${(val / 1e9).toFixed(2)} Mil Millones USD`;
            return `$ ${val.toLocaleString('es-AR')} USD`;
        };
        const formatPct = (val) => `${val.toFixed(2)}%`;

        return [
            extractData(totalRes, 'PBI Total', 'en dólares corrientes', formatUSD),
            extractData(growthRes, 'Crecimiento PBI', 'anual %', formatPct),
            extractData(servicesRes, 'Sector Servicios', '% del PBI', formatPct),
            extractData(industryRes, 'Sector Industrial', '% del PBI', formatPct),
            extractData(agriRes, 'Sector Agropecuario', '% del PBI', formatPct),
            extractData(manufacRes, 'Manufactura', '% del PBI', formatPct)
        ].filter(Boolean);
    } catch {
        return [];
    }
}

export default async function Page() {
    const [macroData, pbiData] = await Promise.all([
        getMacro(),
        getPBI(),
    ]);

    return (
        <EconomiaClient 
            initialVariables={macroData} 
            initialPBI={pbiData} 
        />
    );
}
