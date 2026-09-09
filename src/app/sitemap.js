import { variablesMetadata } from '@/utils/variablesMetadata';
import { cambiosMetadata } from '@/utils/cambiosMetadata';
import { BOND_DATA } from '@/utils/bondCalculator';
import { getAllGuiaSlugs } from '@/utils/guiasData';
import { CATEGORIES } from '@/utils/carteraData';

export default function sitemap() {
    const base = 'https://infopeso.com.ar';
    const today = new Date();

    const staticRoutes = [
        '',
        '/Cartera',
        '/guias',
        '/widgets',
        '/Cambios',
        '/Cambios/calculadora-pesos-a-dolar-blue',
        '/Cambios/calculadora-dolar-tarjeta',
        '/Economia',
        '/Mercado',
        '/RentaFija',
        '/Empresas',
        '/privacidad',
        '/terminos',
        '/contacto'
    ].map(route => ({
        url: `${base}${route}`,
        lastModified: today,
        changeFrequency: route === '' || route === '/Cartera' ? 'daily' : ['/privacidad', '/terminos', '/contacto'].includes(route) ? 'monthly' : 'daily',
        priority: route === '' ? 1.0 : ['/Cartera', '/guias', '/widgets', '/Cambios/calculadora-pesos-a-dolar-blue', '/Cambios/calculadora-dolar-tarjeta'].includes(route) ? 0.9 : ['/privacidad', '/terminos', '/contacto'].includes(route) ? 0.3 : 0.8,
    }));

    const dynamicEconomia = Object.keys(variablesMetadata).map(id => ({
        url: `${base}/Economia/${id}`,
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.7,
    }));

    const dynamicCambios = Object.keys(cambiosMetadata).map(id => ({
        url: `${base}/Cambios/${id}`,
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.8,
    }));

    const dynamicBonos = Object.keys(BOND_DATA).map(id => ({
        url: `${base}/RentaFija/${id}`,
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.7,
    }));

    const dynamicGuias = getAllGuiaSlugs().map(slug => ({
        url: `${base}/guias/${slug}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.85,
    }));

    const allCompanies = CATEGORIES.flatMap(c => c.companies);
    const dynamicEmpresas = allCompanies.map(c => ({
        url: `${base}/Empresas/${encodeURIComponent(c.symbol)}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.75,
    }));

    return [
        ...staticRoutes,
        ...dynamicEconomia,
        ...dynamicCambios,
        ...dynamicBonos,
        ...dynamicGuias,
        ...dynamicEmpresas
    ];
}
