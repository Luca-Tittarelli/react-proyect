/**
 * News fetcher using Google News RSS via Vite dev proxy (/gnews-rss).
 * The Vite server proxies /gnews-rss -> news.google.com to bypass CORS.
 * Uses when:3d in the search query to restrict results to last 3 days on Google's side,
 * plus a client-side 14-day cutoff as a safety net.
 */

const MAX_AGE_DAYS = 14; // discard anything older than 14 days

// Financial keyword whitelist - must match at least one to show
const FINANCIAL_KEYWORDS = [
    'dólar', 'dolar', 'dollar', 'bcra', 'tasa', 'inflación', 'inflacion', 'ipc', 'indec',
    'reservas', 'bono', 'bonos', 'al30', 'gd30', 'mep', 'ccl', 'brecha',
    'cepo', 'tipo de cambio', 'lecap', 'letras', 'merval', 'riesgo país',
    'riesgo pais', 'fmi', 'deuda', 'licitación', 'licitacion', 'swap',
    'devaluación', 'devaluacion', 'crawling', 'obligación', 'obligacion',
    'bolsa', 'acciones', 'tir', 'rendimiento', 'cnv', 'afip', 'retenciones',
    'arancel', 'economía', 'economia', 'mercado cambiario', 'banco central',
    'carry', 'blue', 'peso argentino', 'divisa'
];

export function detectCategory(title) {
    const t = title.toLowerCase();
    if (t.includes('dólar') || t.includes('dolar') || t.includes('dollar') ||
        t.includes('tipo de cambio') || t.includes('mep') || t.includes('ccl') ||
        t.includes('cepo') || t.includes('blue') || t.includes('brecha') ||
        t.includes('divisa') || t.includes('cambi')) {
        return { label: 'Tipo de Cambio', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' };
    }
    if (t.includes('inflación') || t.includes('inflacion') || t.includes('ipc') ||
        t.includes('indec') || t.includes('precios') || t.includes('tarifas')) {
        return { label: 'Inflación', color: '#F97316', bg: 'rgba(249,115,22,0.12)' };
    }
    if (t.includes('bcra') || t.includes('tasa') || t.includes('reservas') ||
        t.includes('banco central') || t.includes('lecap') || t.includes('swap') ||
        t.includes('carry') || t.includes('base monetaria')) {
        return { label: 'Política Monetaria', color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' };
    }
    if (t.includes('bono') || t.includes('bonos') || t.includes('al30') || t.includes('gd30') ||
        t.includes('deuda') || t.includes('fmi') || t.includes('licitaci') ||
        t.includes('obligaci') || t.includes('tir') || t.includes('rendimiento')) {
        return { label: 'Deuda & Bonos', color: '#10B981', bg: 'rgba(16,185,129,0.12)' };
    }
    if (t.includes('bolsa') || t.includes('merval') || t.includes('acciones') ||
        t.includes('cnv') || t.includes('cedear')) {
        return { label: 'Mercado', color: '#06B6D4', bg: 'rgba(6,182,212,0.12)' };
    }
    if (t.includes('retenciones') || t.includes('arancel') || t.includes('afip') ||
        t.includes('decreto') || t.includes('resolución') || t.includes('regulac')) {
        return { label: 'Regulaciones', color: '#6B7280', bg: 'rgba(107,114,128,0.12)' };
    }
    return { label: 'Economía', color: '#6B7280', bg: 'rgba(107,114,128,0.12)' };
}

function isFinancialNews(title) {
    const t = title.toLowerCase();
    return FINANCIAL_KEYWORDS.some(k => t.includes(k));
}

function isRecent(dateStr) {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    if (isNaN(date)) return false;
    const ageDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
    return ageDays <= MAX_AGE_DAYS;
}

export function parseXMLFeed(xmlText) {
    if (typeof DOMParser !== 'undefined') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'application/xml');

        const parseError = doc.querySelector('parsererror');
        if (parseError) throw new Error('XML parse error');

        const items = Array.from(doc.querySelectorAll('item'));
        return items.map(item => {
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent ||
                         item.querySelector('guid')?.textContent || '#';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const source = item.querySelector('source')?.textContent || 'Google News';

            return { title, link, pubDate, source };
        });
    }

    // Node.js SSR / API route fallback using regex
    const items = [];
    const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];
    for (const itemXml of itemMatches) {
        const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/title>/i);
        const linkMatch = itemXml.match(/<link>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/link>/i);
        const guidMatch = itemXml.match(/<guid[^>]*>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/guid>/i);
        const pubDateMatch = itemXml.match(/<pubDate>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/pubDate>/i);
        const sourceMatch = itemXml.match(/<source[^>]*>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/source>/i);

        const title = (titleMatch ? (titleMatch[1] ?? titleMatch[2]) : '').trim();
        const link = (linkMatch ? (linkMatch[1] ?? linkMatch[2]) : (guidMatch ? (guidMatch[1] ?? guidMatch[2]) : '#')).trim();
        const pubDate = (pubDateMatch ? (pubDateMatch[1] ?? pubDateMatch[2]) : '').trim();
        const source = (sourceMatch ? (sourceMatch[1] ?? sourceMatch[2]) : 'Google News').trim();

        items.push({ title, link, pubDate, source });
    }
    return items;
}

export function timeAgo(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    const diff = Math.floor((Date.now() - date) / 1000);
    if (diff < 60) return 'hace un momento';
    if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
    return `hace ${Math.floor(diff / 86400)}d`;
}

export function formatNewsFromXml(xmlText) {
    const raw = parseXMLFeed(xmlText);
    return raw
        .filter(item => isFinancialNews(item.title) && isRecent(item.pubDate))
        .slice(0, 12)
        .map(item => ({
            id: item.link,
            title: item.title,
            link: item.link,
            date: item.pubDate,
            timeAgo: timeAgo(item.pubDate),
            source: item.source,
            category: detectCategory(item.title),
        }));
}

/**
 * Fetch financial news.
 * On server: queries Google News RSS directly with ISR caching.
 * On client: queries /api/news.
 */
export async function fetchFinancialNews() {
    const isServer = typeof window === 'undefined';
    const query = encodeURIComponent('BCRA dólar argentina economía inflación bonos when:3d');

    if (isServer) {
        const url = `https://news.google.com/rss/search?q=${query}&hl=es-419&gl=AR&ceid=AR%3Aes-419`;
        const res = await fetch(url, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const xml = await res.text();
        return formatNewsFromXml(xml);
    }

    // Client-side: fetch from cached Next.js API route
    try {
        const res = await fetch('/api/news');
        if (res.ok) {
            return await res.json();
        }
    } catch {
        // Fallback to proxy if API route fails
    }

    const proxyUrl = `/gnews-rss/rss/search?q=${query}&hl=es-419&gl=AR&ceid=AR%3Aes-419`;
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return formatNewsFromXml(xml);
}
