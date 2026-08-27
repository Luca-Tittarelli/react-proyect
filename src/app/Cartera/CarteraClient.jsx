'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import {
    CATEGORIES,
    PRESETS,
    getCompanyBySymbol,
    hasSector,
    normalizeHoldings,
    calculatePortfolioMetrics,
} from '@/utils/carteraData';
import { MiniChart, CompanyProfile, FundamentalData } from 'react-ts-tradingview-widgets';

// ─── Iconos SVG inline ────────────────────────────────────────────────────────
const PATHS = {
    search:       'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    x:            'M6 18L18 6M6 6l12 12',
    check:        'M5 13l4 4L19 7',
    plus:         'M12 4v16m8-8H4',
    trash:        'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    edit:         'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    globe:        'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    mapPin:       'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    flame:        'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z',
    bank:         'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    cpu:          'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    shoppingBag:  'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    arrowUp:      'M5 10l7-7m0 0l7 7m-7-7v18',
    arrowDown:    'M19 14l-7 7m0 0l-7-7m7 7V3',
    barChart:     'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    newspaper:    'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    target:       'M15 12a3 3 0 11-6 0 3 3 0 016 0z M19.07 4.93A10 10 0 1121 12h-1m-7.07-7.07A10 10 0 0112 2v1',
    sparkle:      'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    sliders:      'M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6',
    pieChart:     'M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z',
    layers:       'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    shield:       'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    calendar:     'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    chevronLeft:  'M15 19l-7-7 7-7',
    chevronRight: 'M9 5l7 7-7 7',
    radio:        'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm0-12a4 4 0 100 8 4 4 0 000-8z',
};

const Ico = ({ name, size = 14, className = '', strokeWidth = 2, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         style={style} className={`shrink-0 ${className}`}>
        <path d={PATHS[name] || PATHS.sparkle} />
    </svg>
);

const SectorIcon = ({ sector, size = 14 }) => {
    const map = {
        'Energía y Commodities':    'flame',
        'Finanzas y Fintech':       'bank',
        'Tecnología y Crecimiento': 'cpu',
        'Consumo y Otros':          'shoppingBag',
    };
    return <Ico name={map[sector] || 'sparkle'} size={size} />;
};

const CompanyLogo = ({ company, className = 'w-7 h-7' }) => {
    const [error, setError] = useState(false);
    useEffect(() => { setError(false); }, [company?.symbol]);
    if (!company) return null;
    const colors = {
        'Energía y Commodities':    { bg: 'rgba(232,148,43,0.12)', color: 'var(--accent)' },
        'Finanzas y Fintech':       { bg: 'rgba(46,204,113,0.12)',  color: 'var(--positive)' },
        'Tecnología y Crecimiento': { bg: 'rgba(52,152,219,0.12)',  color: '#3498db' },
        'Consumo y Otros':          { bg: 'rgba(155,89,182,0.12)',  color: '#9b59b6' },
    };
    const c = colors[company.sector] || { bg: 'var(--bg-surface-hover)', color: 'var(--text-secondary)' };
    if (error || !company.logo) {
        return (
            <div className={`${className} rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0`}
                 style={{ background: c.bg, color: c.color, border: '1px solid var(--border-subtle)' }}>
                {company.name.slice(0, 2).toUpperCase()}
            </div>
        );
    }
    return (
        <img src={company.logo} alt={company.name} loading="lazy" onError={() => setError(true)}
             className={`${className} rounded-lg object-contain p-0.5 shrink-0`}
             style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }} />
    );
};

const SemaphoreIndicator = ({ signal, size = 'sm' }) => {
    const cfg = {
        buy:     { label: 'Comprar',  icon: 'arrowUp',    color: 'var(--positive)', bg: 'var(--positive-soft)' },
        hold:    { label: 'Mantener', icon: 'sparkle',    color: 'var(--accent)',   bg: 'var(--accent-soft)'   },
        sell:    { label: 'Vender',   icon: 'arrowDown',  color: 'var(--negative)', bg: 'var(--negative-soft)' },
        unknown: { label: '—',        icon: 'sparkle',    color: 'var(--text-tertiary)', bg: 'var(--bg-surface-hover)' },
    }[signal || 'unknown'];
    const px = size === 'xs' ? 'px-1.5 py-0.5 text-[9px] gap-0.5' : 'px-2 py-0.5 text-[10px] gap-1';
    return (
        <span className={`${px} font-bold rounded inline-flex items-center`}
              style={{ color: cfg.color, background: cfg.bg, fontFamily: 'var(--font-mono)' }}>
            <Ico name={cfg.icon} size={size === 'xs' ? 8 : 10} />
            {cfg.label}
        </span>
    );
};

// ─── Slider de Noticias Estilo Bloomberg Terminal ─────────────────────────────
const BloombergNewsSlider = ({ holdings }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('ALL');

    useEffect(() => {
        if (!holdings || holdings.length === 0) return;
        let alive = true;

        const fetchPortfolioNews = async () => {
            setLoading(true);
            try {
                // Generar query combinada de las empresas en cartera
                const queries = holdings.map(h => {
                    const comp = getCompanyBySymbol(h.symbol);
                    return comp?.newsQuery || h.symbol;
                });
                
                // Buscar noticias de los últimos 7 días
                const queryStr = queries.slice(0, 8).join(' OR ');
                const q = encodeURIComponent(`(${queryStr}) when:7d`);
                const res = await fetch(`/gnews-rss/rss/search?q=${q}&hl=es-419&gl=AR&ceid=AR%3Aes-419`);
                if (!res.ok) throw new Error('Error en RSS');
                const xml = await res.text();
                const doc = new DOMParser().parseFromString(xml, 'application/xml');
                const items = Array.from(doc.querySelectorAll('item')).slice(0, 15).map(item => {
                    const title = (item.querySelector('title')?.textContent || '').replace(/\s+-\s+[^-\n]+$/, '');
                    const link = item.querySelector('link')?.textContent || '#';
                    const pubDate = item.querySelector('pubDate')?.textContent || '';
                    const source = item.querySelector('source')?.textContent || 'Bloomberg';

                    let timeStr = '';
                    if (pubDate) {
                        const diff = Math.floor((Date.now() - new Date(pubDate)) / 1000);
                        if (diff < 60) timeStr = 'ahora';
                        else if (diff < 3600) timeStr = `${Math.floor(diff / 60)}m`;
                        else if (diff < 86400) timeStr = `${Math.floor(diff / 3600)}h`;
                        else timeStr = `${Math.floor(diff / 86400)}d`;
                    }

                    // Identificar qué empresa de la cartera coincide mejor con la noticia
                    let matchedSymbol = holdings[0]?.symbol;
                    for (const h of holdings) {
                        const comp = getCompanyBySymbol(h.symbol);
                        const lowerTitle = title.toLowerCase();
                        if (
                            lowerTitle.includes(h.symbol.toLowerCase().replace('.ba', '')) ||
                            (comp && lowerTitle.includes(comp.name.toLowerCase()))
                        ) {
                            matchedSymbol = h.symbol;
                            break;
                        }
                    }

                    return {
                        title,
                        link,
                        timeAgo: timeStr,
                        source,
                        symbol: matchedSymbol,
                    };
                });

                if (alive) {
                    setNews(items);
                    setLoading(false);
                }
            } catch {
                if (alive) setLoading(false);
            }
        };

        fetchPortfolioNews();
        return () => { alive = false; };
    }, [holdings]);

    // Filtrar noticias
    const filteredNews = useMemo(() => {
        if (selectedFilter === 'ALL') return news;
        return news.filter(n => n.symbol === selectedFilter);
    }, [news, selectedFilter]);

    // Auto-advance slider cada 5 segundos si no está pausado
    useEffect(() => {
        if (isPaused || filteredNews.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % filteredNews.length);
        }, 4800);
        return () => clearInterval(timer);
    }, [isPaused, filteredNews.length]);

    const handlePrev = () => {
        if (filteredNews.length === 0) return;
        setCurrentIndex(prev => (prev - 1 + filteredNews.length) % filteredNews.length);
    };

    const handleNext = () => {
        if (filteredNews.length === 0) return;
        setCurrentIndex(prev => (prev + 1) % filteredNews.length);
    };

    const currentItem = filteredNews[currentIndex] || filteredNews[0];
    const comp = currentItem ? getCompanyBySymbol(currentItem.symbol) : null;

    if (loading) {
        return (
            <div className="rounded-xl border p-2.5 flex items-center gap-3 animate-pulse"
                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                <div className="w-20 h-5 bg-[var(--bg-surface-hover)] rounded" />
                <div className="flex-1 h-5 bg-[var(--bg-surface-hover)] rounded" />
            </div>
        );
    }

    if (news.length === 0) return null;

    return (
        <div className="rounded-xl border overflow-hidden transition-all shadow-sm"
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}
             style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            
            {/* Barra Bloomberg Ticker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 sm:px-4">
                
                {/* Badge Terminal Feed */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.14em]" style={{ fontFamily: 'var(--font-mono)' }}>
                            TERMINAL FEED
                        </span>
                    </div>

                    {/* Quick filter chips */}
                    <div className="hidden md:flex items-center gap-1 overflow-x-auto">
                        <button onClick={() => { setSelectedFilter('ALL'); setCurrentIndex(0); }}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                    selectedFilter === 'ALL'
                                        ? 'bg-[var(--accent)] text-white'
                                        : 'bg-[var(--bg-page)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                                }`}>
                            Todas
                        </button>
                        {holdings.slice(0, 5).map(h => (
                            <button key={h.symbol}
                                    onClick={() => { setSelectedFilter(h.symbol); setCurrentIndex(0); }}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                        selectedFilter === h.symbol
                                            ? 'bg-[var(--accent)] text-white'
                                            : 'bg-[var(--bg-page)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                                    }`}>
                                {h.symbol}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Noticia Activa en el Slider */}
                {currentItem && (
                    <div className="flex-1 min-w-0 flex items-center gap-2 sm:mx-3">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase shrink-0"
                              style={{ background: 'var(--bg-page)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            {currentItem.symbol}
                        </span>

                        <a href={currentItem.link} target="_blank" rel="noopener noreferrer"
                           className="text-xs font-semibold truncate hover:text-[var(--accent)] transition-colors flex-1"
                           style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}
                           title={currentItem.title}>
                            {currentItem.title}
                        </a>

                        <div className="flex items-center gap-1.5 shrink-0 text-[10px] opacity-70"
                             style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                            <span className="hidden sm:inline font-medium">{currentItem.source}</span>
                            <span>·</span>
                            <span>{currentItem.timeAgo}</span>
                        </div>
                    </div>
                )}

                {/* Controles de Navegación */}
                <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                    <span className="text-[10px] font-mono opacity-50 mr-1" style={{ color: 'var(--text-tertiary)' }}>
                        {currentIndex + 1}/{filteredNews.length}
                    </span>
                    <button onClick={handlePrev}
                            title="Noticia anterior"
                            className="w-6 h-6 rounded flex items-center justify-center border cursor-pointer hover:bg-[var(--bg-surface-hover)] transition-colors"
                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                        <Ico name="chevronLeft" size={11} />
                    </button>
                    <button onClick={handleNext}
                            title="Siguiente noticia"
                            className="w-6 h-6 rounded flex items-center justify-center border cursor-pointer hover:bg-[var(--bg-surface-hover)] transition-colors"
                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                        <Ico name="chevronRight" size={11} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Modal de Configuración y Ponderaciones ────────────────────────────────────
const WeightsModal = ({ holdings, onSave, onClose }) => {
    const [localHoldings, setLocalHoldings] = useState(() => normalizeHoldings(holdings));
    const [searchQuery, setSearchQuery] = useState('');

    const totalWeight = useMemo(() => {
        return localHoldings.reduce((sum, h) => sum + (Number(h.weight) || 0), 0);
    }, [localHoldings]);

    const handleWeightChange = (symbol, val) => {
        const num = Math.max(0, Math.min(100, Number(val) || 0));
        setLocalHoldings(prev => prev.map(h => h.symbol === symbol ? { ...h, weight: num } : h));
    };

    const handleEquiponderar = () => {
        if (localHoldings.length === 0) return;
        const eq = Number((100 / localHoldings.length).toFixed(1));
        setLocalHoldings(prev => prev.map(h => ({ ...h, weight: eq })));
    };

    const handleToggleCompany = (sym) => {
        setLocalHoldings(prev => {
            const exists = prev.some(h => h.symbol === sym);
            if (exists) {
                return normalizeHoldings(prev.filter(h => h.symbol !== sym));
            } else {
                return normalizeHoldings([...prev, { symbol: sym, weight: 10 }]);
            }
        });
    };

    const handleApplyPreset = (preset) => {
        setLocalHoldings(preset.holdings);
    };

    const q = searchQuery.toLowerCase();
    const availableCategories = CATEGORIES.map(cat => ({
        ...cat,
        companies: cat.companies.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.symbol.toLowerCase().includes(q) ||
            c.sector.toLowerCase().includes(q)
        )
    })).filter(cat => cat.companies.length > 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            <div className="w-full max-w-2xl rounded-2xl border overflow-hidden shadow-2xl flex flex-col max-h-[88vh]"
                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>

                {/* Header */}
                <div className="px-5 py-4 border-b flex items-center justify-between"
                     style={{ borderColor: 'var(--border-subtle)' }}>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                           style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                            Personalizar Cartera
                        </p>
                        <h2 className="text-lg font-bold"
                            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                            Elegí tus acciones y porcentajes
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-lg hover:opacity-70 cursor-pointer"
                            style={{ color: 'var(--text-tertiary)' }}>
                        <Ico name="x" size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">

                    {/* Presets rápidos */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2"
                           style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                            Carteras Sugeridas (1 Clic)
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {PRESETS.map(p => (
                                <button key={p.id} onClick={() => handleApplyPreset(p)}
                                        className="p-2.5 rounded-xl border text-left cursor-pointer transition-all hover:bg-[var(--bg-surface-hover)]"
                                        style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                    <p className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                                        {p.name.split('(')[0]}
                                    </p>
                                    <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                                        {p.holdings.map(h => h.symbol).join(' · ')}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tus acciones seleccionadas */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em]"
                               style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                Tus Acciones ({localHoldings.length})
                            </p>
                            <button onClick={handleEquiponderar}
                                    className="text-[11px] font-medium px-2 py-0.5 rounded border cursor-pointer hover:opacity-80"
                                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)', background: 'var(--bg-page)' }}>
                                ⚖️ Repartir en partes iguales
                            </button>
                        </div>

                        {localHoldings.length === 0 ? (
                            <div className="p-6 text-center rounded-xl border border-dashed text-xs" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-tertiary)' }}>
                                No hay acciones seleccionadas. Elegí una cartera sugerida o buscá abajo.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {localHoldings.map(h => {
                                    const comp = getCompanyBySymbol(h.symbol);
                                    return (
                                        <div key={h.symbol}
                                             className="p-2.5 rounded-xl border flex items-center gap-3"
                                             style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                            <CompanyLogo company={comp} className="w-7 h-7" />
                                            <div className="w-28 min-w-0">
                                                <p className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                                                    {comp?.name || h.symbol}
                                                </p>
                                                <p className="text-[9px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                                    {h.symbol}
                                                </p>
                                            </div>

                                            <div className="flex-1 flex items-center gap-3">
                                                <input type="range" min="1" max="100" value={h.weight}
                                                       onChange={e => handleWeightChange(h.symbol, e.target.value)}
                                                       className="flex-1 cursor-pointer accent-[var(--accent)]" />
                                                <div className="flex items-center gap-0.5">
                                                    <input type="number" min="1" max="100" value={h.weight}
                                                           onChange={e => handleWeightChange(h.symbol, e.target.value)}
                                                           className="w-12 py-0.5 px-1 rounded text-xs font-medium text-center border outline-none"
                                                           style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }} />
                                                    <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>%</span>
                                                </div>
                                            </div>

                                            <button onClick={() => handleToggleCompany(h.symbol)}
                                                    className="opacity-40 hover:opacity-100 hover:text-red-500 cursor-pointer p-1">
                                                <Ico name="trash" size={13} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Catálogo de acciones */}
                    <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em]"
                           style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                            Agregar otras acciones al portafolio
                        </p>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }}>
                                <Ico name="search" size={13} />
                            </span>
                            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                   placeholder="Buscar por nombre o ticker… (ej: YPF, Apple, bancos)"
                                   className="w-full pl-8 pr-7 py-1.5 rounded-lg text-xs outline-none border"
                                   style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }} />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100">
                                    <Ico name="x" size={12} />
                                </button>
                            )}
                        </div>

                        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                            {availableCategories.map(cat => (
                                <div key={cat.name} className="space-y-1.5">
                                    <p className="text-[10px] font-medium opacity-60" style={{ color: 'var(--text-tertiary)' }}>
                                        {cat.name}
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                                        {cat.companies.map(c => {
                                            const isSelected = localHoldings.some(h => h.symbol === c.symbol);
                                            return (
                                                <button key={c.symbol} onClick={() => handleToggleCompany(c.symbol)}
                                                        className="p-1.5 rounded-lg border text-left cursor-pointer transition-all flex items-center gap-2 hover:bg-[var(--bg-surface-hover)]"
                                                        style={{
                                                            background: isSelected ? 'var(--accent-soft)' : 'var(--bg-page)',
                                                            borderColor: isSelected ? 'var(--accent)' : 'var(--border-subtle)',
                                                        }}>
                                                    <CompanyLogo company={c} className="w-5 h-5 text-[8px]" />
                                                    <span className="text-[11px] font-medium truncate flex-1" style={{ color: 'var(--text-primary)' }}>
                                                        {c.name}
                                                    </span>
                                                    <Ico name={isSelected ? 'check' : 'plus'} size={11}
                                                         style={{ color: isSelected ? 'var(--accent)' : 'var(--text-tertiary)' }} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t flex items-center justify-between"
                     style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-page)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Total: <strong style={{ color: totalWeight === 100 ? 'var(--positive)' : 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{totalWeight.toFixed(0)}%</strong>
                    </span>
                    <div className="flex gap-2">
                        <button onClick={onClose}
                                className="px-3 py-1.5 rounded-lg text-xs border cursor-pointer hover:opacity-70"
                                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                            Cancelar
                        </button>
                        <button onClick={() => onSave(localHoldings)} disabled={localHoldings.length === 0}
                                className="px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all disabled:opacity-40"
                                style={{ background: 'var(--accent)', color: 'white' }}>
                            Guardar Cartera
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════
export default function CarteraClient() {
    const [theme] = useTheme();
    const [holdings, setHoldings] = useState([]);
    const [detailSymbol, setDetailSymbol] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [showWeightsModal, setShowWeightsModal] = useState(false);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'table' | 'detail'

    // Fundamentals Data Engine
    const [fundamentalsMap, setFundamentalsMap] = useState({});
    const [loadingFundamentals, setLoadingFundamentals] = useState(false);

    // Deep Dive News
    const [googleNews, setGoogleNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(false);

    // ── Mount & LocalStorage ──────────────────────────────────────────────────
    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem('infopeso_portfolio');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    const normalized = normalizeHoldings(parsed);
                    setHoldings(normalized);
                    setDetailSymbol(normalized[0].symbol);
                    return;
                }
            } catch {
                // fall through
            }
        }
        const defaultPreset = PRESETS[0].holdings;
        setHoldings(defaultPreset);
        setDetailSymbol(defaultPreset[0].symbol);
    }, []);

    const saveHoldings = (nextHoldings) => {
        const normalized = normalizeHoldings(nextHoldings);
        setHoldings(normalized);
        localStorage.setItem('infopeso_portfolio', JSON.stringify(normalized));
        if (normalized.length > 0 && !normalized.some(h => h.symbol === detailSymbol)) {
            setDetailSymbol(normalized[0].symbol);
        }
    };

    const clearPortfolio = () => {
        if (window.confirm('¿Deseas reiniciar tu cartera a la sugerencia inicial?')) {
            saveHoldings(PRESETS[0].holdings);
        }
    };

    // ── Fetch Fundamentals ────────────────────────────────────────────────────
    useEffect(() => {
        if (!isMounted || holdings.length === 0) return;
        let alive = true;

        const fetchFundamentals = async () => {
            setLoadingFundamentals(true);
            try {
                const symbols = holdings.map(h => h.symbol).join(',');
                const res = await fetch(`/api/portfolio-fundamentals?symbols=${encodeURIComponent(symbols)}`);
                if (!res.ok) throw new Error('Error en API');
                const data = await res.json();
                if (alive && data.fundamentals) {
                    setFundamentalsMap(data.fundamentals);
                }
            } catch (err) {
                console.warn('Error cargando fundamentals:', err.message);
            } finally {
                if (alive) setLoadingFundamentals(false);
            }
        };

        fetchFundamentals();
        return () => { alive = false; };
    }, [holdings, isMounted]);

    // ── Métricas Consolidadas ────────────────────────────────────────────────
    const metrics = useMemo(() => {
        return calculatePortfolioMetrics(holdings, fundamentalsMap);
    }, [holdings, fundamentalsMap]);

    const activeCompany = getCompanyBySymbol(detailSymbol) ||
        (holdings.length > 0 ? getCompanyBySymbol(holdings[0].symbol) : null);
    const activeFundamentals = activeCompany ? fundamentalsMap[activeCompany.symbol] || {} : {};

    // ── Google News para Deep Dive ────────────────────────────────────────────
    useEffect(() => {
        if (!activeCompany) return;
        let alive = true;
        const fetchNews = async () => {
            setNewsLoading(true); setGoogleNews([]);
            try {
                const q = encodeURIComponent(`${activeCompany.newsQuery} when:7d`);
                const res = await fetch(`/gnews-rss/rss/search?q=${q}&hl=es-419&gl=AR&ceid=AR%3Aes-419`);
                if (!res.ok) throw new Error();
                const xml = await res.text();
                const doc = new DOMParser().parseFromString(xml, 'application/xml');
                const parsed = Array.from(doc.querySelectorAll('item')).slice(0, 5).map(item => {
                    const pubDate = item.querySelector('pubDate')?.textContent || '';
                    let timeStr = '';
                    if (pubDate) {
                        const diff = Math.floor((Date.now() - new Date(pubDate)) / 1000);
                        if (diff < 60) timeStr = 'ahora';
                        else if (diff < 3600) timeStr = `hace ${Math.floor(diff / 60)}m`;
                        else if (diff < 86400) timeStr = `hace ${Math.floor(diff / 3600)}h`;
                        else timeStr = `hace ${Math.floor(diff / 86400)}d`;
                    }
                    return {
                        title: (item.querySelector('title')?.textContent || '').replace(/\s+-\s+[^-\n]+$/, ''),
                        link: item.querySelector('link')?.textContent || '#',
                        timeAgo: timeStr,
                        source: item.querySelector('source')?.textContent || 'Prensa',
                    };
                });
                if (alive) setGoogleNews(parsed);
            } catch {
                // Ignore news error
            } finally {
                if (alive) setNewsLoading(false);
            }
        };
        fetchNews();
        return () => { alive = false; };
    }, [activeCompany]);

    if (!isMounted) return null;

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <main className="min-h-screen pt-14 pb-16 md:pb-12">

            {/* Modal de Ponderaciones */}
            {showWeightsModal && (
                <WeightsModal
                    holdings={holdings}
                    onSave={(newHoldings) => {
                        saveHoldings(newHoldings);
                        setShowWeightsModal(false);
                    }}
                    onClose={() => setShowWeightsModal(false)}
                />
            )}

            {/* ── Encabezado Infopeso Standard ── */}
            <div className="px-5 sm:px-8 py-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-1"
                           style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                            Centro de Monitoreo · Inversión Personal
                        </p>
                        <h1 className="text-3xl sm:text-4xl leading-tight"
                            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                            Mi Cartera de Acciones
                        </h1>
                        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                            Métricas clave, rentabilidad y diagnóstico consolidado de tus inversiones en tiempo real.
                        </p>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowWeightsModal(true)}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border"
                                style={{ background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)' }}>
                            <Ico name="sliders" size={13} />
                            Ajustar Cartera ({holdings.length})
                        </button>
                        <button onClick={clearPortfolio}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border hover:bg-[var(--bg-surface-hover)]"
                                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}>
                            Reiniciar
                        </button>
                    </div>
                </div>
            </div>

            <section className="px-5 sm:px-8 py-8">
                <div className="max-w-[1200px] mx-auto space-y-7">

                    {/* ── BLOOMBERG STYLE TOP NEWS TICKER / SLIDER ── */}
                    <BloombergNewsSlider holdings={holdings} />

                    {/* ── 4 Tarjetas Clave de la Cartera (Lenguaje Simple) ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* 1. Rentabilidad del Negocio (ROE) */}
                        <article className="flex flex-col gap-1.5 p-4 rounded-xl"
                                 style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                                   style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                    Rentabilidad de las Empresas
                                </p>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                      style={{
                                          background: (metrics.weightedROE || 0) >= 15 ? 'var(--positive-soft)' : 'var(--bg-surface-hover)',
                                          color: (metrics.weightedROE || 0) >= 15 ? 'var(--positive)' : 'var(--text-secondary)',
                                      }}>
                                    {(metrics.weightedROE || 0) >= 18 ? 'Excelente' : (metrics.weightedROE || 0) >= 10 ? 'Buena' : 'Moderada'}
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-2xl font-medium leading-none"
                                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                                    {metrics.weightedROE ? `${metrics.weightedROE.toFixed(1)}%` : '—'}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                    ROE promedio
                                </span>
                            </div>
                            <p className="text-[11px] mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                                Ganancia generada por cada $100 de patrimonio de las empresas.
                            </p>
                        </article>

                        {/* 2. Valuación (P/E) */}
                        <article className="flex flex-col gap-1.5 p-4 rounded-xl"
                                 style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                                   style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                    Valuación (Precio / Ganancia)
                                </p>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                      style={{
                                          background: (metrics.weightedPE || 0) < 18 ? 'var(--positive-soft)' : 'var(--accent-soft)',
                                          color: (metrics.weightedPE || 0) < 18 ? 'var(--positive)' : 'var(--accent)',
                                      }}>
                                    {(metrics.weightedPE || 0) < 16 ? 'Barata (Value)' : (metrics.weightedPE || 0) < 30 ? 'Razonable' : 'Exigente'}
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-2xl font-medium leading-none"
                                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                                    {metrics.weightedPE ? `${metrics.weightedPE.toFixed(1)}x` : '—'}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                    P/E ratio
                                </span>
                            </div>
                            <p className="text-[11px] mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                                Años de ganancias que cuesta comprar el portafolio hoy.
                            </p>
                        </article>

                        {/* 3. Dividendos Anuales */}
                        <article className="flex flex-col gap-1.5 p-4 rounded-xl"
                                 style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                                   style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                    Cobro de Dividendos
                                </p>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                      style={{ background: 'var(--positive-soft)', color: 'var(--positive)' }}>
                                    Flujo pasivo
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-2xl font-medium leading-none"
                                      style={{ color: 'var(--positive)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                                    {metrics.weightedDividendYield ? `${metrics.weightedDividendYield.toFixed(1)}%` : '0.0%'}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                    anual estimado
                                </span>
                            </div>
                            <p className="text-[11px] mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                                Renta en efectivo estimada que pagan tus acciones por año.
                            </p>
                        </article>

                        {/* 4. Proyección de Analistas */}
                        <article className="flex flex-col gap-1.5 p-4 rounded-xl"
                                 style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                                   style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                    Objetivo Wall Street
                                </p>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                      style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                    Consenso
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-2xl font-medium leading-none"
                                      style={{ color: (metrics.weightedUpside || 0) >= 0 ? 'var(--positive)' : 'var(--negative)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                                    {metrics.weightedUpside ? `+${metrics.weightedUpside.toFixed(1)}%` : '—'}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                    potencial suba
                                </span>
                            </div>
                            <p className="text-[11px] mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                                Suba promedio estimada por analistas para los próximos 12 meses.
                            </p>
                        </article>
                    </div>

                    {/* ── Navegación de Vistas Simples ── */}
                    <div className="flex items-center gap-2 border-b pb-1" style={{ borderColor: 'var(--border-subtle)' }}>
                        {[
                            { id: 'overview', label: '📊 Resumen & Diagnóstico' },
                            { id: 'table',    label: '📋 Lista de Acciones' },
                            { id: 'detail',   label: '🔍 Ficha por Acción' },
                        ].map(t => (
                            <button key={t.id} onClick={() => setActiveTab(t.id)}
                                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                                        activeTab === t.id
                                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                                            : 'bg-transparent border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
                                    }`}>
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* ── VISTA 1: RESUMEN Y DIAGNÓSTICO EN LENGUAJE SIMPLE ── */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">

                            {/* Diagnóstico sencillo */}
                            <div className="p-5 rounded-2xl border space-y-3"
                                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.1em]"
                                        style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                        ¿Cómo está balanceada tu cartera?
                                    </h3>
                                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                                        Salud General: <strong style={{ color: 'var(--positive)', fontFamily: 'var(--font-mono)' }}>{metrics.healthScore}/100</strong>
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {metrics.diagnostics.map((d, i) => (
                                        <div key={i} className="p-3 rounded-xl border flex items-start gap-2.5"
                                             style={{
                                                 background: 'var(--bg-page)',
                                                 borderColor: d.type === 'positive' ? 'var(--positive)' : 'var(--accent)',
                                             }}>
                                            <span className="text-sm shrink-0">
                                                {d.type === 'positive' ? '✅' : '⚠️'}
                                            </span>
                                            <div>
                                                <p className="text-xs font-bold"
                                                   style={{ color: d.type === 'positive' ? 'var(--positive)' : 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                                                    {d.title}
                                                </p>
                                                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                                                    {d.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Distribución por Sector & País */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Sectores */}
                                <div className="p-5 rounded-2xl border space-y-3"
                                     style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.1em]"
                                        style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                        Rubros y Sectores
                                    </h3>
                                    <div className="space-y-2.5">
                                        {Object.entries(metrics.sectorBreakdown).map(([sector, pct]) => (
                                            <div key={sector} className="space-y-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="font-medium flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                                                        <SectorIcon sector={sector} size={12} /> {sector}
                                                    </span>
                                                    <span className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                                                        {pct.toFixed(0)}%
                                                    </span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-[var(--bg-page)] overflow-hidden">
                                                    <div className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                                                         style={{ width: `${pct}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Países & Próximos Balances */}
                                <div className="p-5 rounded-2xl border space-y-4 flex flex-col justify-between"
                                     style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-[0.1em] mb-2.5"
                                            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                            Mercados (País)
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(metrics.geoBreakdown).map(([geo, pct]) => (
                                                <div key={geo} className="p-2.5 rounded-xl border text-center"
                                                     style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                                    <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{geo}</p>
                                                    <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                                                        {pct.toFixed(0)}%
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Próximos Balances */}
                                    <div className="border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-2"
                                           style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                            Próximos Reportes de Ganancias
                                        </p>
                                        {metrics.upcomingEarnings.length === 0 ? (
                                            <p className="text-xs opacity-60" style={{ color: 'var(--text-tertiary)' }}>
                                                Sin fechas confirmadas en el corto plazo.
                                            </p>
                                        ) : (
                                            <div className="flex flex-wrap gap-1.5">
                                                {metrics.upcomingEarnings.slice(0, 3).map(e => (
                                                    <span key={e.symbol} className="px-2 py-1 rounded text-[11px] border"
                                                          style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>
                                                        <strong>{e.symbol}</strong>: {new Date(e.date).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── VISTA 2: TABLA DE ACCIONES SIMPLE ── */}
                    {activeTab === 'table' && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl border flex items-center justify-between"
                                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                                    Hacé clic en cualquier fila para ver el análisis detallado y noticias de esa empresa.
                                </p>
                                <button onClick={() => setShowWeightsModal(true)}
                                        className="text-xs font-semibold px-2.5 py-1 rounded border cursor-pointer hover:opacity-80"
                                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent)', background: 'var(--bg-page)' }}>
                                    Editar porcentajes
                                </button>
                            </div>

                            <div className="rounded-2xl border overflow-hidden"
                                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b text-[10px] font-semibold uppercase tracking-[0.1em]"
                                                style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-page)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                                <th className="py-3 px-4">Empresa</th>
                                                <th className="py-3 px-3 text-right">Peso en Cartera</th>
                                                <th className="py-3 px-3 text-right">Precio Actual</th>
                                                <th className="py-3 px-3 text-right">Valuación (P/E)</th>
                                                <th className="py-3 px-3 text-right">Rentabilidad (ROE)</th>
                                                <th className="py-3 px-3 text-right">Dividendos</th>
                                                <th className="py-3 px-3 text-right">Upside Est.</th>
                                                <th className="py-3 px-4 text-center">Consenso</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {holdings.map(h => {
                                                const comp = getCompanyBySymbol(h.symbol);
                                                const f = fundamentalsMap[h.symbol] || {};
                                                return (
                                                    <tr key={h.symbol}
                                                        onClick={() => {
                                                            setDetailSymbol(h.symbol);
                                                            setActiveTab('detail');
                                                        }}
                                                        className="border-b transition-colors cursor-pointer hover:bg-[var(--bg-surface-hover)] text-xs"
                                                        style={{ borderColor: 'var(--border-subtle)' }}>
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center gap-2.5">
                                                                <CompanyLogo company={comp} className="w-7 h-7" />
                                                                <div>
                                                                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{comp?.name || h.symbol}</p>
                                                                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{h.symbol}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-3 text-right font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                                                            {h.weight}%
                                                        </td>
                                                        <td className="py-3 px-3 text-right font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                                                            {f.price ? `${f.currency === 'ARS' ? '$' : 'US$'}${f.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : '—'}
                                                        </td>
                                                        <td className="py-3 px-3 text-right font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                                                            {f.pe ? `${f.pe.toFixed(1)}x` : '—'}
                                                        </td>
                                                        <td className="py-3 px-3 text-right font-medium" style={{ color: (f.roe || 0) >= 15 ? 'var(--positive)' : 'inherit', fontFamily: 'var(--font-mono)' }}>
                                                            {f.roe ? `${f.roe.toFixed(1)}%` : '—'}
                                                        </td>
                                                        <td className="py-3 px-3 text-right font-medium text-[var(--positive)]" style={{ fontFamily: 'var(--font-mono)' }}>
                                                            {f.dividendYield ? `${f.dividendYield.toFixed(1)}%` : '0%'}
                                                        </td>
                                                        <td className="py-3 px-3 text-right font-bold" style={{ color: (f.upsidePotential || 0) >= 0 ? 'var(--positive)' : 'inherit', fontFamily: 'var(--font-mono)' }}>
                                                            {f.upsidePotential ? `+${f.upsidePotential.toFixed(1)}%` : '—'}
                                                        </td>
                                                        <td className="py-3 px-4 text-center">
                                                            <SemaphoreIndicator signal={f.recommendationKey === 'hold' ? 'hold' : ['buy','strong_buy','strongBuy'].includes(f.recommendationKey) ? 'buy' : 'unknown'} size="xs" />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── VISTA 3: FICHA INDIVIDUAL POR ACCIÓN (DEEP DIVE) ── */}
                    {activeTab === 'detail' && (
                        <div className="space-y-6">

                            {/* Selector horizontal de acciones de tu cartera */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                                {holdings.map(h => {
                                    const comp = getCompanyBySymbol(h.symbol);
                                    const isSel = (activeCompany?.symbol === h.symbol);
                                    return (
                                        <button key={h.symbol} onClick={() => setDetailSymbol(h.symbol)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border flex items-center gap-2 shrink-0 ${
                                                    isSel
                                                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm'
                                                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
                                                }`}>
                                            <CompanyLogo company={comp} className="w-5 h-5 text-[8px]" />
                                            <span>{comp?.name || h.symbol}</span>
                                            <span className="opacity-70 text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>({h.weight}%)</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {activeCompany && (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                    {/* Gráfico y Widget */}
                                    <div className="lg:col-span-2 space-y-4">
                                        <div className="p-4 rounded-xl border"
                                             style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                                        {activeCompany.name} ({activeCompany.symbol})
                                                    </h2>
                                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                        {activeCompany.sector} · {activeCompany.category}
                                                    </p>
                                                </div>
                                                {activeFundamentals.price && (
                                                    <div className="text-right">
                                                        <p className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                                                            {activeFundamentals.currency === 'ARS' ? '$' : 'US$'}{activeFundamentals.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                                                        </p>
                                                        <p className={`text-xs font-semibold ${(activeFundamentals.changePercent || 0) >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}`}
                                                           style={{ fontFamily: 'var(--font-mono)' }}>
                                                            {(activeFundamentals.changePercent || 0) >= 0 ? '+' : ''}{(activeFundamentals.changePercent || 0).toFixed(2)}% hoy
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* TradingView MiniChart */}
                                        <div className="rounded-xl border overflow-hidden"
                                             style={{ borderColor: 'var(--border-subtle)', height: '360px' }}>
                                            <MiniChart symbol={activeCompany.tvSymbol} colorTheme={theme}
                                                       width="100%" height="100%" locale="es" isTransparent autosize />
                                        </div>

                                        {/* TradingView Fundamentals */}
                                        <div className="rounded-xl border overflow-hidden"
                                             style={{ borderColor: 'var(--border-subtle)', height: '240px' }}>
                                            <FundamentalData symbol={activeCompany.tvSymbol} colorTheme={theme}
                                                             width="100%" height="100%" locale="es" isTransparent displayMode="compact" />
                                        </div>
                                    </div>

                                    {/* Tesis en lenguaje simple & Noticias */}
                                    <div className="space-y-4">

                                        {/* Tesis */}
                                        <div className="p-4 rounded-xl border space-y-3"
                                             style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                                               style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                                                Tesis de Inversión
                                            </p>
                                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                {activeCompany.description}
                                            </p>

                                            <div className="border-t pt-2 space-y-1" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--text-tertiary)' }}>
                                                    ¿Cómo gana dinero?
                                                </p>
                                                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                    {activeCompany.planDeNegocios}
                                                </p>
                                            </div>

                                            <div className="border-t pt-2 space-y-1" style={{ borderColor: 'var(--border-subtle)' }}>
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--text-tertiary)' }}>
                                                    Qué mirar de cerca
                                                </p>
                                                <ul className="text-xs space-y-1 pl-3.5 list-disc" style={{ color: 'var(--text-secondary)' }}>
                                                    {activeCompany.fundamentosClave.slice(0, 3).map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Noticias de Prensa */}
                                        <div className="p-4 rounded-xl border space-y-2.5"
                                             style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                                               style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)' }}>
                                                Últimas Noticias
                                            </p>
                                            {newsLoading ? (
                                                <div className="space-y-2 animate-pulse">
                                                    <div className="h-3 w-1/2 bg-[var(--bg-surface-hover)] rounded" />
                                                    <div className="h-4 w-full bg-[var(--bg-surface-hover)] rounded" />
                                                </div>
                                            ) : googleNews.length === 0 ? (
                                                <p className="text-xs opacity-50" style={{ color: 'var(--text-tertiary)' }}>
                                                    Sin noticias recientes.
                                                </p>
                                            ) : (
                                                <div className="space-y-2">
                                                    {googleNews.slice(0, 3).map((n, i) => (
                                                        <a key={i} href={n.link} target="_blank" rel="noopener noreferrer"
                                                           className="block p-2 rounded-lg border text-xs hover:bg-[var(--bg-surface-hover)] transition-colors"
                                                           style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                                            <div className="flex items-center justify-between text-[9px] mb-0.5" style={{ color: 'var(--text-tertiary)' }}>
                                                                <span>{n.source}</span>
                                                                <span>{n.timeAgo}</span>
                                                            </div>
                                                            <p className="font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                                                                {n.title}
                                                            </p>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
