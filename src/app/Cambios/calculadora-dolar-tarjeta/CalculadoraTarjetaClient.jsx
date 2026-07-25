'use client';

import { useState } from 'react';
import Link from 'next/link';

const STREAMING_SERVICES = [
    { name: 'Netflix Estándar', usd: 9.99 },
    { name: 'Spotify Individual', usd: 4.99 },
    { name: 'YouTube Premium', usd: 3.99 },
    { name: 'Steam Juego ($10 USD)', usd: 10.00 },
    { name: 'Amazon Prime', usd: 5.99 },
    { name: 'iCloud 200GB', usd: 2.99 }
];

export default function CalculadoraTarjetaClient({ initialDolar }) {
    const oficialVenta = initialDolar?.venta || 0;
    
    // Tax breakdown estimates (Impuesto PAIS + Percepción Ganancias/Bienes Personales)
    // Note: Official BNA rate + taxes
    const taxRatePct = 60; // 60% total surcharge (Impuesto PAIS 30% + Percepción 30%)
    const dolarTarjetaVal = oficialVenta ? oficialVenta * (1 + taxRatePct / 100) : 0;

    const [amountUSD, setAmountUSD] = useState('10');
    const [amountARS, setAmountARS] = useState(dolarTarjetaVal ? (10 * dolarTarjetaVal).toFixed(0) : '');

    const handleUSDChange = (val) => {
        setAmountUSD(val);
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0 && dolarTarjetaVal > 0) {
            setAmountARS((num * dolarTarjetaVal).toFixed(0));
        } else {
            setAmountARS('');
        }
    };

    const selectService = (usd) => {
        setAmountUSD(usd.toString());
        if (dolarTarjetaVal > 0) {
            setAmountARS((usd * dolarTarjetaVal).toFixed(0));
        }
    };

    const baseUSD = parseFloat(amountUSD) || 0;
    const baseARS = baseUSD * oficialVenta;
    const taxARS = baseARS * (taxRatePct / 100);
    const totalARS = baseARS + taxARS;

    return (
        <section className="space-y-8 animate-fade-in">
            {/* Header: Cotización Actual */}
            <div className="p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider mb-1 inline-block" style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                        Calculadora Impositiva de Servicios Digitales
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        Calculadora Dólar Tarjeta e Impuestos Hoy
                    </h1>
                </div>
                <div className="flex gap-8">
                    <div className="text-center">
                        <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-tertiary)' }}>Oficial BNA</p>
                        <p className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            ${oficialVenta ? oficialVenta.toLocaleString('es-AR') : '—'}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-tertiary)' }}>Dólar Tarjeta Total</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                            ${dolarTarjetaVal ? dolarTarjetaVal.toLocaleString('es-AR', { maximumFractionDigits: 1 }) : '—'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Calculadora Interactiva Principal */}
            <div className="p-6 sm:p-8 rounded-xl space-y-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    Calculador de Consumos con Tarjeta en el Exterior
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                            Monto en Dólares (USD)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold" style={{ color: 'var(--text-secondary)' }}>U$S</span>
                            <input
                                type="number"
                                value={amountUSD}
                                onChange={(e) => handleUSDChange(e.target.value)}
                                placeholder="10"
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

                    {/* Desglose de Impuestos */}
                    <div className="p-4 rounded-xl space-y-2 text-xs" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-subtle)' }}>
                        <div className="flex justify-between">
                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal Oficial:</span>
                            <span className="font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>${baseARS.toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: 'var(--text-secondary)' }}>Recargos e Impuestos (+60%):</span>
                            <span className="font-bold" style={{ color: 'var(--negative)', fontFamily: 'var(--font-mono)' }}>+${taxARS.toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t text-sm font-bold" style={{ borderColor: 'var(--border-subtle)' }}>
                            <span style={{ color: 'var(--text-primary)' }}>Total Final Resumen:</span>
                            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>${totalARS.toLocaleString('es-AR', { maximumFractionDigits: 0 })} ARS</span>
                        </div>
                    </div>
                </div>

                {/* Accesos Rápidos por Servicios de Streaming */}
                <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Servicios y Suscripciones Frecuentes:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {STREAMING_SERVICES.map((srv) => (
                            <button
                                key={srv.name}
                                onClick={() => selectService(srv.usd)}
                                className="p-2.5 rounded-lg text-left text-xs font-medium transition-all"
                                style={{
                                    background: amountUSD === srv.usd.toString() ? 'var(--accent-soft)' : 'var(--bg-page)',
                                    border: amountUSD === srv.usd.toString() ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <p className="font-semibold">{srv.name}</p>
                                <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>U$S {srv.usd}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
