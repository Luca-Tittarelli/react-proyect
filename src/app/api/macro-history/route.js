import { NextResponse } from 'next/server';
import { variableAPI, RiesgoPaisHistoricoAPI } from '@/apis';
import { getLastMonthDate, getLastYearDate, getTodayDate, filtrarUltimoMes } from '@/utils/functions';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes ISR

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const idsParam = searchParams.get('ids');
        const duration = searchParams.get('duration') || 'month';

        if (!idsParam) {
            return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 });
        }

        const ids = idsParam.split(',').map(s => s.trim()).filter(Boolean);
        const firstDate = duration === 'year' ? getLastYearDate() : getLastMonthDate();
        const today = getTodayDate();

        const entries = await Promise.all(
            ids.map(async (id) => {
                try {
                    if (id === 'riesgo-pais') {
                        const res = await fetch(RiesgoPaisHistoricoAPI, { next: { revalidate: 300 } });
                        if (!res.ok) return [id, null];
                        const data = await res.json();
                        const filtered = Array.isArray(data) ? filtrarUltimoMes(data).reverse() : [];
                        const prev = filtered[0]?.valor || 0;
                        const current = filtered[filtered.length - 1]?.valor || 0;
                        const difference = prev !== 0 ? ((current - prev) / Math.abs(prev)) * 100 : 0;
                        return [id, { history: filtered, difference }];
                    } else {
                        const url = variableAPI(id, firstDate, today);
                        const res = await fetch(url, { next: { revalidate: 300 } });
                        if (!res.ok) return [id, null];
                        const data = await res.json();
                        const results = data.results?.[0]?.detalle;
                        const history = Array.isArray(results) ? [...results].reverse() : [];
                        const prev = history[0]?.valor || 0;
                        const current = history[history.length - 1]?.valor || 0;
                        const difference = prev !== 0 ? ((current - prev) / Math.abs(prev)) * 100 : 0;
                        return [id, { history, difference }];
                    }
                } catch (err) {
                    console.error(`Error fetching macro history for ${id}:`, err);
                    return [id, null];
                }
            })
        );

        const result = Object.fromEntries(entries.filter(([, v]) => v !== null));

        return NextResponse.json(result, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            },
        });
    } catch (error) {
        console.error('Error in /api/macro-history:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
