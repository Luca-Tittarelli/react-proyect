'use client';

import { useEffect, useState } from "react";
import { filtrarUltimoMes, getDatesRange, getYesterdayDate } from "@/utils/functions";
import { fetchData } from "@/utils/Fetch";
import { dolarFechaAPI, variableAPI, RiesgoPaisHistoricoAPI } from "@/apis";
import { ErrorComponent } from "@/components/Error";
import { indexCategories } from "@/MacroFilters";
import { LoadingCard } from "@/components/LoadingCard";
import { useDolar } from "@/hooks/useDolar";
import { useMacro } from "@/hooks/useMacro";
import Link from "next/link";
import { DenseRowItem } from "@/components/cards/DenseRowItem";
import { MiniChart, TickerTape, MarketData } from "react-ts-tradingview-widgets";
import { useTheme } from "@/hooks/useTheme";
import { NewsFeed } from "@/components/news/NewsFeed";
import { TradingViewContainer } from "@/components/TradingViewContainer";

// ─── SystemStatusBar ────────────────────────────────────────────
function SystemStatusBar({ variables, lastMacro, isLoading }) {
    const find    = (id) => variables?.find(v => v.idVariable === id);
    const findLast = (id) => lastMacro?.find(m => m.idVariable === id);

    const rp   = find('riesgo-pais');
    const tasa = find(6);
    const base = find(15);

    const rpLast   = findLast('riesgo-pais');
    const tasaLast = findLast(6);
    const baseLast = findLast(15);

    const signal = (curr, prev, invert) => {
        if (!curr || !prev || prev === 0) return 0;
        const pct = ((curr - prev) / Math.abs(prev)) * 100;
        if (Math.abs(pct) < 0.5) return 0;
        return invert ? (pct > 0 ? -1 : 1) : (pct > 0 ? 1 : -1);
    };

    const s1 = signal(rp?.valor, rpLast?.valor, true);
    const s2 = signal(tasa?.valor, tasaLast?.valor, true);
    const s3 = signal(base?.valor, baseLast?.valor, false);
    const score = s1 + s2 + s3;

    const status =
        score >=  2 ? { label: 'EXPANSIVO',   color: 'var(--positive)', bg: 'var(--positive-soft)' } :
        score <= -2 ? { label: 'CONTRACTIVO', color: 'var(--negative)', bg: 'var(--negative-soft)' } :
                      { label: 'NEUTRO',       color: 'var(--accent)',   bg: 'var(--accent-soft)'   };

    const arrow = (s) => s > 0 ? '↑' : s < 0 ? '↓' : '→';

    const now     = new Date();
    const timeStr = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-1.5 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40"
                                  style={{ background: status.color, animationDuration: '2.5s' }} />
                            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: status.color }} />
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.14em] uppercase"
                              style={{ color: status.color, fontFamily: 'var(--font-ui)' }}>
                            {isLoading ? '···' : status.label}
                        </span>
                    </div>

                    {!isLoading && rp && tasa && base && (
                        <>
                            <span className="text-[10px]" style={{ color: 'var(--border-strong)' }}>·</span>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                                    Riesgo {arrow(s1)}
                                </span>
                                <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                                    Tasa {arrow(s2)}
                                </span>
                                <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                                    Liquidez {arrow(s3)}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                <span className="text-[10px] capitalize hidden sm:block"
                      style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                    {dateStr} · {timeStr}
                </span>
            </div>
        </div>
    );
}

// ─── PrimaryMetric — Tier 1 ─────────────────────────────────────
function PrimaryMetric({ label, sublabel, value, unit, delta, deltaLabel, deltaIsAbs, prefix, source, loading }) {
    const pos = delta > 0;
    const neg = delta < 0;
    const col = pos ? 'var(--positive)' : neg ? 'var(--negative)' : 'var(--text-tertiary)';
    const bg  = pos ? 'var(--positive-soft)' : neg ? 'var(--negative-soft)' : 'var(--bg-surface-hover)';

    return (
        <article className="flex flex-col gap-1.5 p-3 rounded-xl h-full"
                 style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
            {loading ? (
                <div className="space-y-2 animate-pulse">
                    <div className="skeleton h-2.5 w-20 rounded" />
                    <div className="skeleton h-8 w-28 rounded" />
                    <div className="skeleton h-2.5 w-16 rounded" />
                </div>
            ) : (
                <>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                       style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                        {label}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[1.375rem] font-medium leading-none"
                              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                            {prefix}{value !== null && value !== undefined ? Number(value).toLocaleString('es-AR') : '—'}
                        </span>
                        {unit && (
                            <span className="text-sm" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                {unit}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-auto pt-1">
                        {delta !== null && delta !== undefined ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                  style={{ background: bg, color: col, fontFamily: 'var(--font-mono)' }}>
                                {pos ? '↑' : neg ? '↓' : '→'}{' '}
                                {deltaIsAbs
                                    ? `${Math.abs(delta).toFixed(0)} ${unit || ''} ${deltaLabel || ''}`
                                    : `${Math.abs(delta).toFixed(2)}% ${deltaLabel || ''}`
                                }
                            </span>
                        ) : <span />}
                        {source && <span className="source-badge">{source}</span>}
                    </div>
                    {sublabel && (
                        <p className="text-[10px] leading-tight" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                            {sublabel}
                        </p>
                    )}
                </>
            )}
        </article>
    );
}

// ─── MarketCard — Tier 2 ────────────────────────────────────────
function MarketCard({ label, sublabel, value, unit, delta, deltaIsAbs, source, loading, children }) {
    const pos = delta > 0;
    const neg = delta < 0;
    const col = pos ? 'var(--positive)' : neg ? 'var(--negative)' : 'var(--text-tertiary)';
    const bg  = pos ? 'var(--positive-soft)' : neg ? 'var(--negative-soft)' : 'var(--bg-surface-hover)';

    return (
        <article className="flex flex-col gap-3 p-3.5 rounded-xl"
                 style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', minHeight: '130px' }}>
            {loading ? (
                <div className="space-y-2 animate-pulse">
                    <div className="skeleton h-2.5 w-24 rounded" />
                    <div className="skeleton h-10 w-36 rounded" />
                </div>
            ) : (
                <>
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                               style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                {label}
                            </p>
                            <div className="flex items-baseline gap-1.5 mt-1">
                                <span className="text-3xl font-medium leading-none"
                                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                                    {value !== null && value !== undefined ? Number(value).toLocaleString('es-AR') : '—'}
                                </span>
                                {unit && (
                                    <span className="text-sm" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                        {unit}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0 pt-1">
                            {delta !== null && delta !== undefined && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded"
                                      style={{ background: bg, color: col, fontFamily: 'var(--font-mono)' }}>
                                    {pos ? '↑' : neg ? '↓' : '→'}{' '}
                                    {deltaIsAbs ? `${Math.abs(delta).toFixed(0)} pb` : `${Math.abs(delta).toFixed(2)}%`}
                                </span>
                            )}
                            {source && <span className="source-badge">{source}</span>}
                        </div>
                    </div>
                    {sublabel && (
                        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                            {sublabel}
                        </p>
                    )}
                    {children && <div className="flex-1 mt-1">{children}</div>}
                </>
            )}
        </article>
    );
}

// ─── SectionHead — separador de sección ─────────────────────────
function SectionHead({ label, right }) {
    return (
        <div className="flex items-center gap-3 mb-3">
            <h2 className="text-[9px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
                style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                {label}
            </h2>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            {right}
        </div>
    );
}

// ─── LoadingDenseRow ────────────────────────────────────────────
function LoadingDenseRow() {
    return (
        <div className="flex items-center justify-between py-2 px-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="skeleton h-3.5 w-24 rounded" />
            <div className="flex items-center gap-2">
                <div className="skeleton h-3.5 w-12 rounded" />
                <div className="skeleton h-4 w-16 rounded" />
            </div>
        </div>
    );
}

export default function IndexClient({ 
    initialDolar, 
    initialVariables, 
    initialHistoricalMacro = null, 
    initialHistoricalDolar = null, 
    initialNews = null 
}) {
    const [theme] = useTheme();
    const [lastMacro, setLastMacro] = useState(initialHistoricalMacro || []);
    const [lastDolar, setLastDolar] = useState(initialHistoricalDolar || []);
    const [isHistoricalMacroLoading, setIsHistoricalMacroLoading] = useState(!initialHistoricalMacro || initialHistoricalMacro.length === 0);
    const [isHistoricalDolarLoading, setIsHistoricalDolarLoading] = useState(!initialHistoricalDolar || initialHistoricalDolar.length === 0);
    const { dolar, dolarStatus } = useDolar(initialDolar);
    const { variables, variablesStatus } = useMacro(initialVariables);

    const filter = (ids, arr) => arr?.filter(item => ids.includes(item.idVariable)) || [];

    const macroData    = variables || [];
    const findMacro    = (id) => macroData.find(v => String(v.idVariable) === String(id));

    const riesgoPaisVar = findMacro('riesgo-pais');
    const tasaVar       = findMacro(160) || findMacro(6);
    const baseVar       = findMacro(15);
    const inflacionVar  = findMacro(27);
    const reservasVar   = findMacro(1);

    const delta = (curr, prev, isAbs = false) => {
        if (!curr || !prev || prev === 0) return null;
        return isAbs ? curr - prev : ((curr - prev) / Math.abs(prev)) * 100;
    };

    const findLastMacro = (id) => lastMacro.find(m => String(m.idVariable) === String(id));

    const rpLast        = findLastMacro('riesgo-pais');
    const tasaLast      = findLastMacro(160) || findLastMacro(6);
    const baseLast      = findLastMacro(15);
    const inflacionLast = findLastMacro(27);
    const reservasLast  = findLastMacro(1);

    const rpDelta       = delta(riesgoPaisVar?.valor, rpLast?.valor, true);
    const tasaDelta     = delta(tasaVar?.valor, tasaLast?.valor);
    const baseDelta     = delta(baseVar?.valor, baseLast?.valor);
    const inflaDelta    = delta(inflacionVar?.valor, inflacionLast?.valor, true);
    const reservasDelta = delta(reservasVar?.valor, reservasLast?.valor);

    const dolarList = dolar?.filter(d => d.casa !== 'mayorista') || [];

    useEffect(() => {
        if (initialHistoricalMacro && initialHistoricalMacro.length > 0) return;
        if (variablesStatus === 'loading') return;
        if (variablesStatus === 'error' || !variables || variables.length === 0) {
            setIsHistoricalMacroLoading(false);
            return;
        }

        const fetchAllMacro = async () => {
            try {
                const targets = filter(indexCategories, variables);
                const promises = targets.map(async (i) => {
                    const id = i.idVariable;
                    try {
                        if (id === 'riesgo-pais') {
                            const res = await fetchData(RiesgoPaisHistoricoAPI);
                            const rp  = filtrarUltimoMes(res.data)[0];
                            return { idVariable: 'riesgo-pais', valor: rp?.valor };
                        } else {
                            const dates = getDatesRange();
                            const res   = await fetchData(variableAPI(id, dates[0], dates[1]));
                            const obj   = res.data.results?.[0];
                            if (obj?.detalle?.length > 0) {
                                return { idVariable: obj.idVariable, valor: obj.detalle[0].valor };
                            }
                        }
                    } catch (err) {
                        console.error("Error fetching macro index:", id, err);
                    }
                    return null;
                });

                const results = await Promise.all(promises);
                setLastMacro(results.filter(Boolean));
            } catch (err) {
                console.error("Error fetching macro historicals:", err);
            } finally {
                setIsHistoricalMacroLoading(false);
            }
        };

        fetchAllMacro();
    }, [variables, variablesStatus, initialHistoricalMacro]);

    useEffect(() => {
        if (initialHistoricalDolar && initialHistoricalDolar.length > 0) return;
        if (dolarStatus === 'loading') return;
        if (dolarStatus === 'error' || !dolar || dolar.length === 0) {
            setIsHistoricalDolarLoading(false);
            return;
        }

        const fetchAllDolar = async () => {
            try {
                const promises = dolar.map(async (item) => {
                    try {
                        const res = await fetchData(dolarFechaAPI(item.casa, getYesterdayDate().replace(/-/g, '/')));
                        return res.data;
                    } catch (err) {
                        console.error("Error fetching historical dollar for:", item.casa, err);
                        return null;
                    }
                });

                const results = await Promise.all(promises);
                setLastDolar(results.filter(Boolean));
            } catch (err) {
                console.error("Error fetching dollar historicals:", err);
            } finally {
                setIsHistoricalDolarLoading(false);
            }
        };

        fetchAllDolar();
    }, [dolar, dolarStatus, initialHistoricalDolar]);

    const isLoading = 
        dolarStatus === 'loading' || 
        variablesStatus === 'loading' || 
        isHistoricalDolarLoading || 
        isHistoricalMacroLoading;

    const hasError  = dolarStatus === 'error' || variablesStatus === 'error';

    return (
        <main className="min-h-screen pb-16 md:pb-12" style={{ paddingTop: '56px' }}>
            <SystemStatusBar variables={variables} lastMacro={lastMacro} isLoading={isLoading} />

            <section className="px-5 sm:px-8 pt-5 pb-3">
                <div className="max-w-[1400px] mx-auto">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] mb-0.5"
                       style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                        Economía Argentina
                    </p>
                    <h1 className="text-xl sm:text-2xl leading-tight"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        Estado del sistema financiero
                    </h1>
                </div>
            </section>

            <section className="px-5 sm:px-8 pb-4">
                <div className="max-w-[1400px] mx-auto rounded-lg overflow-hidden pointer-events-none" style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
                    <TickerTape
                        colorTheme={theme}
                        displayMode="regular"
                        locale="es"
                        showSymbolLogo={true}
                        symbols={[
                            { description: "Soja",        proName: "CAPITALCOM:SOYBEAN" },
                            { description: "Maíz",        proName: "CAPITALCOM:CORN" },
                            { description: "Trigo",       proName: "CAPITALCOM:WHEAT" },
                            { description: "Petróleo WTI",proName: "TVC:USOIL" },
                            { description: "Oro",         proName: "OANDA:XAUUSD" },
                            { description: "Plata",       proName: "OANDA:XAGUSD" },
                        ]}
                    />
                </div>
            </section>

            {hasError && (
                <div className="px-5 sm:px-8 pb-4">
                    <div className="max-w-[1400px] mx-auto">
                        <ErrorComponent message="Error al cargar el dashboard" />
                    </div>
                </div>
            )}

            <section className="px-5 sm:px-8 pb-5">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        <PrimaryMetric
                            label="Tasa Política Monetaria"
                            sublabel="BCRA · Anualizada"
                            value={tasaVar?.valor}
                            unit="%"
                            delta={tasaDelta}
                            deltaLabel="período"
                            source="BCRA"
                            loading={isLoading}
                        />
                        <PrimaryMetric
                            label="Base Monetaria"
                            sublabel="BCRA · Millones ARS"
                            value={baseVar?.valor}
                            unit=""
                            delta={baseDelta}
                            deltaLabel="período"
                            source="BCRA"
                            loading={isLoading}
                        />
                        <PrimaryMetric
                            label="Reservas Internacionales"
                            sublabel="BCRA · Millones USD"
                            value={reservasVar?.valor}
                            unit=""
                            delta={reservasDelta}
                            deltaLabel="período"
                            source="BCRA"
                            loading={isLoading}
                        />
                        <PrimaryMetric
                            label="Inflación Mensual"
                            sublabel="INDEC · Último dato"
                            value={inflacionVar?.valor}
                            unit="%"
                            delta={inflaDelta}
                            deltaLabel="pp vs. ant."
                            deltaIsAbs
                            source="INDEC"
                            loading={isLoading}
                        />
                    </div>
                </div>
            </section>

            <section className="px-5 sm:px-8 pb-5">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-3">
                    <div className="lg:col-span-4 flex flex-col gap-2">
                        <SectionHead
                            label="Tipos de Cambio"
                            right={
                                <Link href="/Cambios"
                                      className="text-[9px] font-semibold uppercase tracking-[0.1em] flex-shrink-0"
                                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                                    Ver todo →
                                </Link>
                            }
                        />
                        <div className="rounded-xl overflow-hidden flex flex-col h-full"
                             style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
                            {isLoading ? (
                                [1, 2, 3, 4, 5].map(i => <LoadingDenseRow key={i} />)
                            ) : (
                                dolarList.map((item, i) => {
                                    const lastVal = lastDolar.find(d => d.casa === item.casa)?.venta;
                                    return (
                                        <DenseRowItem
                                            key={i}
                                            titulo={item.nombre}
                                            valor={item.venta}
                                            valorAnterior={lastVal}
                                            linkTo="/Cambios"
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-2">
                        <SectionHead label="Mercado y Riesgo Local" />
                        <div className="flex flex-col gap-2 h-full">
                            <MarketCard
                                label="Riesgo País"
                                sublabel="EMBI+ · JP Morgan"
                                value={riesgoPaisVar?.valor}
                                unit="pb"
                                delta={rpDelta}
                                deltaIsAbs
                                source="ArgentinaDatos"
                                loading={isLoading}
                            />
                            
                            <div className="rounded-xl overflow-hidden flex flex-col flex-1"
                                 style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', minHeight: '120px' }}>
                                <div className="px-3 pt-2 pb-0.5 flex items-center justify-between">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em]"
                                       style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                        S&P Merval · Indice
                                    </p>
                                    <span className="source-badge">TradingView</span>
                                </div>
                                <div className="flex-1 min-h-0">
                                    <TradingViewContainer minHeight="110px" className="h-full">
                                        {(activeTheme) => (
                                            <MiniChart colorTheme={activeTheme} width="100%" height="100%"
                                                       symbol="BCBA:IMV" locale="es" isTransparent={true} />
                                        )}
                                    </TradingViewContainer>
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden flex flex-col flex-1"
                                 style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', minHeight: '120px' }}>
                                <div className="px-3 pt-2 pb-0.5 flex items-center justify-between">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em]"
                                       style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                        Bonos Soberanos · AL30
                                    </p>
                                    <span className="source-badge">TradingView</span>
                                </div>
                                <div className="flex-1 min-h-0">
                                    <TradingViewContainer minHeight="110px" className="h-full">
                                        {(activeTheme) => (
                                            <MiniChart colorTheme={activeTheme} width="100%" height="100%"
                                                       symbol="BCBA:AL30" locale="es" isTransparent={true} />
                                        )}
                                    </TradingViewContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-2">
                        <SectionHead label="Índices Globales" />
                        <div className="rounded-xl overflow-hidden flex flex-col h-full min-h-[380px]" style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
                            <TradingViewContainer height="100%" minHeight="380px" className="flex-1">
                                {(activeTheme) => (
                                    <MarketData 
                                        colorTheme={activeTheme} 
                                        width="100%" 
                                        height="100%" 
                                        locale="es" 
                                        isTransparent={true}
                                        showSymbolLogo={false}
                                        symbolsGroups={[{
                                            name: "Principales Mercados",
                                            originalName: "Indices",
                                            symbols: [
                                                { name: "AMEX:SPY", displayName: "S&P 500" },
                                                { name: "BMFBOVESPA:IBOV", displayName: "Bovespa" },
                                                { name: "OANDA:JP225USD", displayName: "Nikkei 225" },
                                                { name: "SSE:000001", displayName: "Shanghai" },
                                                { name: "BCBA:IMV", displayName: "S&P Merval" }
                                            ]
                                        }]} 
                                    />
                                )}
                            </TradingViewContainer>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-2">
                <NewsFeed initialNews={initialNews} />
            </div>
        </main>
    );
}
