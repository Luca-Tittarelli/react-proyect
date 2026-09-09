'use client';

import React, { useState } from 'react';

export default function WidgetsGeneratorClient() {
    const [selectedWidget, setSelectedWidget] = useState('dolar-blue');
    const [theme, setTheme] = useState('dark');
    const [copied, setCopied] = useState(false);

    const WIDGETS = [
        {
            id: 'dolar-blue',
            title: 'Dólar Blue Compacto',
            desc: 'Tarjeta mínima con precio de compra y venta del dólar paralelo.',
            path: '/widgets/dolar-blue',
            height: '170px',
            width: '320px'
        },
        {
            id: 'multi-dolar',
            title: 'Monitor Multi-Dólar',
            desc: 'Tabla comparativa con Dólar Blue, Oficial, MEP y CCL.',
            path: '/widgets/multi-dolar',
            height: '320px',
            width: '360px'
        },
        {
            id: 'mini-cartera',
            title: 'Mini-Cartera de Acciones',
            desc: 'Top 4 activos de referencia del mercado argentino con tickers y sectores.',
            path: '/widgets/mini-cartera',
            height: '300px',
            width: '360px'
        }
    ];

    const currentConfig = WIDGETS.find(w => w.id === selectedWidget) || WIDGETS[0];
    const iframeSrc = `https://infopeso.com.ar${currentConfig.path}?theme=${theme}`;
    const embedCode = `<iframe src="${iframeSrc}" width="100%" height="${currentConfig.height}" style="border:none;border-radius:12px;max-width:${currentConfig.width};display:block;" title="Cotizaciones en vivo por Infopeso"></iframe>\n<p style="font-size:11px;color:#888;margin-top:4px;">Cotizaciones provistas por <a href="https://infopeso.com.ar" target="_blank" rel="noopener noreferrer" style="color:#c47b2b;text-decoration:none;font-weight:bold;">Infopeso</a></p>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-6 p-6 sm:p-8 rounded-2xl border"
                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    1. Configurá tu Widget
                </h2>

                {/* Select widget type */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-tertiary)' }}>
                        Tipo de Cotización
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {WIDGETS.map((w) => (
                            <button
                                key={w.id}
                                type="button"
                                onClick={() => setSelectedWidget(w.id)}
                                className={`p-3.5 rounded-xl border text-left transition-all ${selectedWidget === w.id ? 'border-accent ring-2 ring-accent/20 font-bold' : 'hover:border-[var(--text-secondary)]'}`}
                                style={{
                                    background: selectedWidget === w.id ? 'var(--accent-soft)' : 'var(--bg-surface-hover)',
                                    borderColor: selectedWidget === w.id ? 'var(--accent)' : 'var(--border-subtle)',
                                    color: selectedWidget === w.id ? 'var(--accent)' : 'var(--text-primary)'
                                }}
                            >
                                <div className="text-sm font-semibold">{w.title}</div>
                                <div className="text-[11px] opacity-75 mt-1 line-clamp-2 leading-tight">{w.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme selector */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-tertiary)' }}>
                        Tema Visual
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setTheme('dark')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-accent bg-[var(--accent-soft)] text-accent' : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'}`}
                        >
                            🌙 Modo Oscuro (Dark)
                        </button>
                        <button
                            type="button"
                            onClick={() => setTheme('light')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${theme === 'light' ? 'border-accent bg-[var(--accent-soft)] text-accent' : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'}`}
                        >
                            ☀️ Modo Claro (Light)
                        </button>
                    </div>
                </div>

                {/* Embed code output */}
                <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                            Código HTML para insertar
                        </label>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                            style={{ background: copied ? 'var(--positive)' : 'var(--accent)' }}
                        >
                            {copied ? '✓ ¡Copiado al Portapapeles!' : '📋 Copiar Código'}
                        </button>
                    </div>
                    <pre className="p-4 rounded-xl text-xs font-mono overflow-x-auto border"
                         style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                        {embedCode}
                    </pre>
                </div>
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-6 space-y-4 p-6 sm:p-8 rounded-2xl border flex flex-col items-center justify-center min-h-[400px]"
                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                <div className="w-full flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-tertiary">
                        Vista Previa en Vivo
                    </span>
                    <span className="text-[11px] font-mono" style={{ color: 'var(--text-tertiary)' }}>
                        {currentConfig.width} × {currentConfig.height}
                    </span>
                </div>

                <div className="w-full flex flex-col items-center justify-center p-4 rounded-xl border border-dashed"
                     style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-card)' }}>
                    <iframe
                        src={`${currentConfig.path}?theme=${theme}`}
                        width="100%"
                        height={currentConfig.height}
                        style={{
                            maxWidth: currentConfig.width,
                            border: 'none',
                            borderRadius: '12px',
                            display: 'block'
                        }}
                        title="Preview"
                    />
                    <p className="text-[11px] mt-2" style={{ color: 'var(--text-tertiary)' }}>
                        Cotizaciones provistas por <span className="font-bold text-accent">Infopeso</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
