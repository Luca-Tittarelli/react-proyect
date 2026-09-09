import { NextResponse } from 'next/server';
import { formatNewsFromXml } from '@/utils/newsFetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes ISR

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const customQuery = searchParams.get('q');
        
        const defaultQuery = 'BCRA dólar argentina economía inflación bonos when:3d';
        const query = encodeURIComponent(customQuery ? `${customQuery} when:7d` : defaultQuery);
        const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=es-419&gl=AR&ceid=AR%3Aes-419`;

        const res = await fetch(rssUrl, {
            next: { revalidate: 300 }
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch news feed' }, { status: res.status });
        }

        const xml = await res.text();
        const news = formatNewsFromXml(xml);

        return NextResponse.json(news, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            }
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
