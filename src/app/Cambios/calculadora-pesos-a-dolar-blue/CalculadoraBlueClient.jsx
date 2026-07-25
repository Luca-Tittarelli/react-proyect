'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRESET_AMOUNTS = [10, 50, 100, 200, 500, 1000];

export default function CalculadoraBlueClient({ initialDolar }) {
    const compra = initialDolar?.compra || 0;
    const venta = initialDolar?.venta || 0;

    const [amountUSD, setAmountUSD] = useState('100');
    const [amountARS, setAmountARS] = useState(venta ? (100 * venta).toString() : '');

    const handleUSDChange = (val) => {
        setAmountUSD(val);
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0 && venta > 0) {
            setAmountARS((num * venta).toFixed(0));
        } else {
            setAmountARS('');
        }
    };

    const handleARSChange = (val) => {
        setAmountARS(val);
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0 && compra > 0) {
            setAmountUSD((num / compra).toFixed(2));
        } else {
            setAmountUSD('');
        }
    };

    const selectPreset = (usd) => {
        setAmountUSD(usd.toString());
        if (venta > 0) {
            setAmountARS((usd * venta).toFixed(0));
        }
    };

    return (
        <section className="space-y-8 animate-fade-in">
            {/* Header: Cotización Actual */}
            <div className="p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider mb-1 inline-block" style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                        Herramienta de Conversión Online
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        Calculadora de Pesos a Dólar Blue Hoy
                    </h1>
                </div>
                <div className="flex gap-8">
                    <div className="text-center">
                        <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-tertiary)' }}>Compra (Cuevas te pagan)</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            ${compra ? Number(compra).toLocaleString('es-AR') : '—'}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-tertiary)' }}>Venta (Vos compás)</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                            ${venta ? Number(venta).toLocaleString('es-AR') : '—'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Calculadora Interactiva Principal */}
            <div className="p-6 sm:p-8 rounded-xl space-y-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    Convertidor Bidireccional
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                            Dólares Estadounidenses (USD)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold" style={{ color: 'var(--text-secondary)' }}>U$S</span>
                            <input
                                type="number"
                                value={amountUSD}
                                onChange={(e) => handleUSDChange(e.target.value)}
                                placeholder="100"
                                className="w-full rounded-xl pl-12 pr-4 py-3 text-lg font-bold outline-none transition-all"
                                style={{
                                    background: 'var(--bg-page)',
                                    border: '1px solid var(--border-subtle)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-mono)'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                            Pesos Argentinos (ARS)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold" style={{ color: 'var(--text-secondary)' }}>$</span>
                            <input
                                type="number"
                                value={amountARS}
                                onChange={(e) => handleARSChange(e.target.value)}
                                placeholder="128000"
                                className="w-full rounded-xl pl-8 pr-4 py-3 text-lg font-bold outline-none transition-all"
                                style={{
                                    background: 'var(--bg-page)',
                                    border: '1px solid var(--border-subtle)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-mono)'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Accesos Rápidos por Monto */}
                <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Montos Frecuentes:</p>
                    <div className="flex flex-wrap gap-2">
                        {PRESET_AMOUNTS.map((usd) => (
                            <button
                                key={usd}
                                onClick={() => selectPreset(usd)}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                style={{
                                    background: amountUSD === usd.toString() ? 'var(--accent)' : 'var(--bg-surface-hover)',
                                    color: amountUSD === usd.toString() ? '#000' : 'var(--text-primary)',
                                    border: '1px solid var(--border-subtle)'
                                }}
                            >
                                U$S {usd}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabla pSEO de Montos Rápidos (100% indexable) */}
            <div className="p-6 rounded-xl space-y-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    Tabla de Equivalencias Rápidas (Dólar Blue a Pesos)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)' }}>
                                <th className="py-2.5 px-3 font-semibold">Monto Dólares (USD)</th>
                                <th className="py-2.5 px-3 font-semibold">Precio de Venta (ARS)</th>
                                <th className="py-2.5 px-3 font-semibold">Precio de Compra (ARS)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[10, 50, 100, 200, 500, 1000, 5000].map((usd) => (
                                <tr key={usd} style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                                    <td className="py-2.5 px-3 font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>U$S {usd}</td>
                                    <td className="py-2.5 px-3 font-semibold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>${venta ? (usd * venta).toLocaleString('es-AR') : '—'}</td>
                                    <td className="py-2.5 px-3" style={{ fontFamily: 'var(--font-mono)' }}>${compra ? (usd * compra).toLocaleString('es-AR') : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
