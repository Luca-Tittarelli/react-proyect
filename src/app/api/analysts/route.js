import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || '';

    if (!symbol) {
        return NextResponse.json({ error: 'Parámetro "symbol" requerido' }, { status: 400 });
    }

    try {
        const result = await yahooFinance.quoteSummary(symbol, {
            modules: ['recommendationTrend', 'upgradeDowngradeHistory', 'financialData'],
        });

        // ─── Tendencia de recomendaciones ─────────────────────────────────────────
        const trendRaw = result?.recommendationTrend?.trend?.[0] || null;
        const trend = trendRaw ? {
            strongBuy:  trendRaw.strongBuy  ?? 0,
            buy:        trendRaw.buy        ?? 0,
            hold:       trendRaw.hold       ?? 0,
            sell:       trendRaw.sell       ?? 0,
            strongSell: trendRaw.strongSell ?? 0,
        } : null;

        // ─── Historial de upgrades / downgrades ───────────────────────────────────
        const historyRaw = result?.upgradeDowngradeHistory?.history || [];
        const history = historyRaw.slice(0, 10).map(item => {
            let timeStr = '';
            if (item.epochGradeDate) {
                const date = new Date(item.epochGradeDate * 1000);
                const diff = Math.floor((Date.now() - date.getTime()) / 1000);
                if (diff < 60)         timeStr = 'ahora';
                else if (diff < 3600)  timeStr = `hace ${Math.floor(diff / 60)}m`;
                else if (diff < 86400) timeStr = `hace ${Math.floor(diff / 3600)}h`;
                else if (diff < 604800)timeStr = `hace ${Math.floor(diff / 86400)}d`;
                else                   timeStr = date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' });
            }
            return {
                firm:      item.firm      || 'Casa de Análisis',
                toGrade:   item.toGrade   || '',
                fromGrade: item.fromGrade || '',
                action:    item.action    || 'main',
                timeAgo:   timeStr,
            };
        });

        // ─── Datos financieros y precio objetivo ──────────────────────────────────
        const fd = result?.financialData || {};
        const financialData = {
            targetMeanPrice:          fd.targetMeanPrice?.raw          ?? fd.targetMeanPrice          ?? null,
            targetHighPrice:          fd.targetHighPrice?.raw          ?? fd.targetHighPrice          ?? null,
            targetLowPrice:           fd.targetLowPrice?.raw           ?? fd.targetLowPrice           ?? null,
            currentPrice:             fd.currentPrice?.raw             ?? fd.currentPrice             ?? null,
            recommendationKey:        fd.recommendationKey             ?? null,
            numberOfAnalystOpinions:  fd.numberOfAnalystOpinions?.raw  ?? fd.numberOfAnalystOpinions  ?? null,
        };

        return NextResponse.json({ trend, history, financialData }, {
            headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
        });

    } catch (e) {
        console.error(`Error en /api/analysts para ${symbol}:`, e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
