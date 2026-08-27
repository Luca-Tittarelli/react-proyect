import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const symbolsParam = searchParams.get('symbols') || '';

    if (!symbolsParam) {
        return NextResponse.json({ error: 'Parámetro "symbols" requerido (separados por coma)' }, { status: 400 });
    }

    const symbols = symbolsParam
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .slice(0, 30);

    try {
        const results = {};

        await Promise.allSettled(
            symbols.map(async (rawSymbol) => {
                let querySym = rawSymbol;
                try {
                    const data = await yahooFinance.quoteSummary(querySym, {
                        modules: [
                            'summaryDetail',
                            'defaultKeyStatistics',
                            'financialData',
                            'price',
                            'calendarEvents'
                        ]
                    });

                    const sd = data.summaryDetail || {};
                    const ks = data.defaultKeyStatistics || {};
                    const fd = data.financialData || {};
                    const pr = data.price || {};
                    const ce = data.calendarEvents || {};

                    const num = (v) => {
                        if (v === null || v === undefined) return null;
                        if (typeof v === 'object' && 'raw' in v) return v.raw;
                        return typeof v === 'number' && !isNaN(v) ? v : null;
                    };

                    const currentPrice = num(pr.regularMarketPrice) ?? num(fd.currentPrice) ?? null;
                    const targetMeanPrice = num(fd.targetMeanPrice) ?? null;
                    
                    let upsidePotential = null;
                    if (currentPrice && targetMeanPrice && currentPrice > 0) {
                        upsidePotential = ((targetMeanPrice - currentPrice) / currentPrice) * 100;
                    }

                    let nextEarningsDate = null;
                    if (ce.earnings?.earningsDate && Array.isArray(ce.earnings.earningsDate) && ce.earnings.earningsDate.length > 0) {
                        const rawDate = ce.earnings.earningsDate[0];
                        if (rawDate) {
                            try {
                                nextEarningsDate = new Date(rawDate).toISOString();
                            } catch { nextEarningsDate = null; }
                        }
                    }

                    let divYield = num(sd.dividendYield) ?? num(sd.trailingAnnualDividendYield) ?? null;
                    if (divYield !== null && divYield < 0.5) {
                        divYield = divYield * 100;
                    }

                    let roe = num(fd.returnOnEquity) ?? null;
                    if (roe !== null && Math.abs(roe) < 10) roe = roe * 100;

                    let roa = num(fd.returnOnAssets) ?? null;
                    if (roa !== null && Math.abs(roa) < 10) roa = roa * 100;

                    let operatingMargin = num(fd.operatingMargins) ?? null;
                    if (operatingMargin !== null && Math.abs(operatingMargin) < 10) operatingMargin = operatingMargin * 100;

                    let profitMargin = num(fd.profitMargins) ?? num(ks.profitMargins) ?? null;
                    if (profitMargin !== null && Math.abs(profitMargin) < 10) profitMargin = profitMargin * 100;

                    results[rawSymbol] = {
                        symbol: rawSymbol,
                        shortName: pr.shortName || rawSymbol,
                        currency: pr.currency || 'USD',
                        price: currentPrice,
                        changePercent: num(pr.regularMarketChangePercent) ? num(pr.regularMarketChangePercent) * 100 : 0,
                        marketCap: num(pr.marketCap) ?? num(sd.marketCap) ?? null,
                        pe: num(sd.trailingPE) ?? null,
                        forwardPe: num(ks.forwardPE) ?? num(sd.forwardPE) ?? null,
                        pegRatio: num(ks.pegRatio) ?? null,
                        priceToBook: num(ks.priceToBook) ?? null,
                        priceToSales: num(sd.priceToSalesTrailing12Months) ?? null,
                        evToEbitda: num(ks.enterpriseToEbitda) ?? null,
                        roe,
                        roa,
                        operatingMargin,
                        profitMargin,
                        debtToEquity: num(fd.debtToEquity) ?? null,
                        freeCashflow: num(fd.freeCashflow) ?? null,
                        dividendYield: divYield,
                        beta: num(ks.beta) ?? num(sd.beta) ?? 1.0,
                        targetMeanPrice,
                        targetHighPrice: num(fd.targetHighPrice) ?? null,
                        targetLowPrice: num(fd.targetLowPrice) ?? null,
                        upsidePotential,
                        recommendationKey: fd.recommendationKey || null,
                        numberOfAnalysts: num(fd.numberOfAnalystOpinions) ?? 0,
                        nextEarningsDate,
                    };
                } catch (err) {
                    console.warn('Error obteniendo datos para ' + rawSymbol + ':', err.message);
                    results[rawSymbol] = {
                        symbol: rawSymbol,
                        error: true,
                        price: null,
                        pe: null,
                        forwardPe: null,
                        roe: null,
                        operatingMargin: null,
                        dividendYield: null,
                        beta: 1.0,
                        targetMeanPrice: null,
                        upsidePotential: null,
                    };
                }
            })
        );

        return NextResponse.json(
            { fundamentals: results },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
                },
            }
        );
    } catch (e) {
        console.error('Error en /api/portfolio-fundamentals:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
