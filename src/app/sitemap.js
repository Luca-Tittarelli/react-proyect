import { variablesMetadata } from '@/utils/variablesMetadata';
import { cambiosMetadata } from '@/utils/cambiosMetadata';
import { BOND_DATA } from '@/utils/bondCalculator';

export default function sitemap() {
    const base = 'https://infopeso.com.ar';
    const today = new Date();

    const staticRoutes = ['', '/Cambios', '/Cambios/calculadora-pesos-a-dolar-blue', '/Cambios/calculadora-dolar-tarjeta', '/Economia', '/Mercado', '/RentaFija', '/Empresas', '/privacidad', '/terminos', '/contacto']
        .map(route => ({
            url: `${base}${route}`,
            lastModified: today,
            changeFrequency: route === '' ? 'always' : ['/privacidad', '/terminos', '/contacto'].includes(route) ? 'monthly' : 'daily',
            priority: route === '' ? 1.0 : ['/Cambios/calculadora-pesos-a-dolar-blue', '/Cambios/calculadora-dolar-tarjeta'].includes(route) ? 0.9 : ['/privacidad', '/terminos', '/contacto'].includes(route) ? 0.3 : 0.8,
        }));

    const dynamicEconomia = Object.keys(variablesMetadata).map(id => ({
        url: `${base}/Economia/${id}`,
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.6,
    }));

    const dynamicCambios = Object.keys(cambiosMetadata).map(id => ({
        url: `${base}/Cambios/${id}`,
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.6,
    }));

    const dynamicBonos = Object.keys(BOND_DATA).map(id => ({
        url: `${base}/RentaFija/${id}`,
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicEconomia, ...dynamicCambios, ...dynamicBonos];
}
