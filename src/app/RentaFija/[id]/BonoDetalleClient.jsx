'use client';

import { useState, useEffect } from 'react';
import { calculateBondMetrics } from '@/utils/bondCalculator';
import { MiniChart } from 'react-ts-tradingview-widgets';
import { useTheme } from '@/hooks/useTheme';
import { TradingViewContainer } from '@/components/TradingViewContainer';

export default function BonoDetalleClient({ ticker, bond }) {
    const [theme] = useTheme();
    const [price, setPrice] = useState('');
    const [metrics, setMetrics] = useState({ tir: 0, paridad: 0 });

    useEffect(() => {
        const p = parseFloat(price);
        if (!isNaN(p) && p > 0) {
            setMetrics(calculateBondMetrics(ticker, p));
        } else {
            setMetrics({ tir: 0, paridad: 0 });
        }
    }, [price, ticker]);

    return (
        <section className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calculadora */}
                <div className="lg:col-span-1 p-6 rounded-xl space-y-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                    <div>
                        <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                            Calculadora {ticker}
                        </h1>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            Ingresa el precio de cotización en USD para calcular el rendimiento.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                                Precio actual (USD por 100 VNO)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-secondary)' }}>$</span>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Ej. 55.40"
                                    className="w-full rounded-lg pl-7 pr-3 py-2.5 text-sm outline-none transition-colors"
                                    style={{
                                        background: 'var(--bg-page)',
                                        border: '1px solid var(--border-subtle)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="rounded-xl p-4 text-center" style={{ background: 'var(--bg-page)' }}>
                            <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>TIR (Rendimiento)</p>
                            <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: metrics.tir > 0 ? 'var(--positive)' : 'var(--text-primary)' }}>
                                {price ? `${metrics.tir}%` : '--'}
                            </p>
                        </div>
                        <div className="rounded-xl p-4 text-center" style={{ background: 'var(--bg-page)' }}>
                            <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Paridad</p>
                            <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                                {price ? `${metrics.paridad}%` : '--'}
                            </p>
                        </div>
                    </div>

                    <p className="text-[10px] text-center" style={{ color: 'var(--text-tertiary)' }}>
                        * Cálculo estimado usando flujos de fondos desde 2026 en adelante.
                    </p>
                </div>

                {/* Gráfico y Cronograma */}
                <div className="lg:col-span-2 space-y-6">
                    {/* TradingView MiniChart */}
                    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', height: '180px' }}>
                        <div className="px-4 py-2.5 flex items-center justify-between border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                                Gráfico en Tiempo Real
                            </h3>
                            <span className="source-badge">TradingView</span>
                        </div>
                        <div style={{ height: '135px' }}>
                            <TradingViewContainer height="135px">
                                {(activeTheme) => (
                                    <MiniChart key={`bono-${ticker}-${activeTheme}`} colorTheme={activeTheme} width="100%" height="100%" symbol={`BCBA:${ticker}`} locale="es" isTransparent={true} />
                                )}
                            </TradingViewContainer>
                        </div>
                    </div>

                    {/* Flujo de Fondos */}
                    <div className="p-6 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
                            Calendario de Pagos Pendientes (por 100 VNO)
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                                <thead style={{ color: 'var(--text-tertiary)' }}>
                                    <tr className="border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <th className="pb-2">Fecha de Pago</th>
                                        <th className="pb-2 text-right">Monto (USD)</th>
                                    </tr>
                                </thead>
                                <tbody style={{ color: 'var(--text-secondary)' }}>
                                    {bond.flows.map((flow, index) => {
                                        const isPast = new Date(flow.date) < new Date();
                                        return (
                                            <tr key={index} className="border-b" style={{ borderColor: 'var(--border-subtle)', opacity: isPast ? 0.4 : 1 }}>
                                                <td className="py-2.5">
                                                    {new Date(flow.date + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    {isPast && <span className="ml-2 text-[10px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>(Pagado)</span>}
                                                </td>
                                                <td className="py-2.5 text-right font-mono font-medium">${flow.amount.toFixed(3)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
