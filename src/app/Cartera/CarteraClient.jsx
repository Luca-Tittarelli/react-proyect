'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { CATEGORIES, getCompanyBySymbol, hasSector } from '@/utils/carteraData';
import { MiniChart, CompanyProfile, FundamentalData, Timeline } from 'react-ts-tradingview-widgets';

// ─── Iconos SVG inline ────────────────────────────────────────────────────────
const PATHS = {
    search:      'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    x:           'M6 18L18 6M6 6l12 12',
    check:       'M5 13l4 4L19 7',
    plus:        'M12 4v16m8-8H4',
    trash:       'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    edit:        'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    globe:       'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    mapPin:      'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    flame:       'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z',
    bank:        'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    cpu:         'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    shoppingBag: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    arrowUp:     'M5 10l7-7m0 0l7 7m-7-7v18',
    arrowDown:   'M19 14l-7 7m0 0l-7-7m7 7V3',
    barChart:    'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    newspaper:   'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    target:      'M15 12a3 3 0 11-6 0 3 3 0 016 0z M19.07 4.93A10 10 0 1121 12h-1m-7.07-7.07A10 10 0 0112 2v1',
    leaf:        'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
    bolt:        'M13 10V3L4 14h7v7l9-11h-7z',
    trendingUp:  'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    clock:       'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    alertCircle: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    chevronRight:'M9 5l7 7-7 7',
    play:        'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    tv:          'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    sparkle:     'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    megaphone:   'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
};

const Ico = ({ name, size = 14, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         className={`shrink-0 ${className}`}>
        <path d={PATHS[name] || PATHS.alertCircle} />
    </svg>
);

// Icono de sector
const SectorIcon = ({ sector, size = 14 }) => {
    const map = {
        'Energía y Commodities':   'flame',
        'Finanzas y Fintech':      'bank',
        'Tecnología y Crecimiento':'cpu',
        'Consumo y Otros':         'shoppingBag',
    };
    return <Ico name={map[sector] || 'sparkle'} size={size} />;
};

// ─── Presets ──────────────────────────────────────────────────────────────────
const PRESETS = [
    {
        id: 'beginner',
        name: 'Quiero empezar',
        icon: 'leaf',
        description: 'Tres activos sólidos y de bajo riesgo relativo. Ideal para dar el primer paso.',
        symbols: ['AAPL', 'KO', 'MELI'],
        highlight: true,
    },
    {
        id: 'energia',
        name: 'Energía Argentina',
        icon: 'flame',
        description: 'Foco en el desarrollo de Vaca Muerta, infraestructura y generación eléctrica.',
        symbols: ['YPFD.BA', 'VIST', 'PAMP.BA', 'CEPU.BA'],
    },
    {
        id: 'tech',
        name: 'Big Tech Global',
        icon: 'cpu',
        description: 'Exposición a inteligencia artificial, e-commerce y software de escala global.',
        symbols: ['MELI', 'AAPL', 'MSFT', 'NVDA', 'TSLA'],
    },
    {
        id: 'finanzas',
        name: 'Finanzas y Fintech',
        icon: 'bank',
        description: 'Banca tradicional argentina consolidada y disrupción digital fintech regional.',
        symbols: ['GGAL.BA', 'BMA.BA', 'NU', 'MELI'],
    },
];

// ─── Configuración de riesgo ──────────────────────────────────────────────────
const RISK_CONFIG = {
    bajo:     { label: 'Riesgo Bajo',     color: 'var(--positive)', bg: 'var(--positive-soft)' },
    medio:    { label: 'Riesgo Medio',    color: 'var(--accent)',   bg: 'var(--accent-soft)'   },
    alto:     { label: 'Riesgo Alto',     color: '#f59e0b',         bg: 'rgba(245,158,11,0.12)'},
    muy_alto: { label: 'Riesgo Muy Alto', color: 'var(--negative)', bg: 'var(--negative-soft)' },
};

// ─── Helper semáforo ──────────────────────────────────────────────────────────
const getSemaphoreFromTrend = (trend) => {
    if (!trend) return 'unknown';
    const bullish = (trend.strongBuy || 0) + (trend.buy || 0);
    const bearish  = (trend.sell || 0) + (trend.strongSell || 0);
    const neutral  = trend.hold || 0;
    const total    = bullish + bearish + neutral;
    if (total === 0) return 'unknown';
    if (bullish >= total * 0.5) return 'buy';
    if (bearish >= total * 0.4) return 'sell';
    return 'hold';
};

// ─── Componentes ─────────────────────────────────────────────────────────────

const CompanyLogo = ({ company, className = 'w-8 h-8' }) => {
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
            <div className={`${className} rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0`}
                 style={{ background: c.bg, color: c.color }}>
                {company.name.slice(0, 2).toUpperCase()}
            </div>
        );
    }
    return (
        <img src={company.logo} alt={company.name} loading="lazy" onError={() => setError(true)}
             className={`${className} rounded-xl object-contain p-1 shrink-0`}
             style={{ background: 'var(--bg-surface)' }} />
    );
};

const SemaphoreIndicator = ({ signal, size = 'sm' }) => {
    const cfg = {
        buy:     { label: 'Comprar',  icon: 'arrowUp',   color: 'var(--positive)', bg: 'var(--positive-soft)' },
        hold:    { label: 'Mantener', icon: 'trendingUp', color: 'var(--accent)',   bg: 'var(--accent-soft)'   },
        sell:    { label: 'Vender',   icon: 'arrowDown',  color: 'var(--negative)', bg: 'var(--negative-soft)' },
        unknown: { label: '—',        icon: 'alertCircle',color: 'var(--text-tertiary)', bg: 'var(--bg-page)'  },
    }[signal || 'unknown'];
    const px = size === 'xs' ? 'px-1.5 py-0.5 text-[9px] gap-0.5' : 'px-2 py-0.5 text-[10px] gap-1';
    return (
        <span className={`${px} font-extrabold rounded-full inline-flex items-center`}
              style={{ color: cfg.color, background: cfg.bg }}>
            <Ico name={cfg.icon} size={size === 'xs' ? 9 : 10} />
            {cfg.label}
        </span>
    );
};

const RiskBadge = ({ riskLevel }) => {
    const cfg = RISK_CONFIG[riskLevel] || RISK_CONFIG.medio;
    return (
        <span title={cfg.label}
              className="px-2 py-0.5 text-[9px] font-bold rounded-full flex items-center gap-1 w-fit"
              style={{ color: cfg.color, background: cfg.bg }}>
            <svg width="5" height="5" viewBox="0 0 5 5">
                <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
            </svg>
            {cfg.label}
        </span>
    );
};

// ─── Wizard de Onboarding ─────────────────────────────────────────────────────
const OnboardingWizard = ({ onComplete, onSkip }) => {
    const [step, setStep] = useState(1);
    const [region, setRegion] = useState(null);
    const [sectors, setSectors] = useState([]);
    const [suggestedSymbols, setSuggestedSymbols] = useState([]);
    const [selected, setSelected] = useState([]);

    const sectorOptions = [
        { id: 'Energía y Commodities',    label: 'Petróleo y Energía',   icon: 'flame',       desc: 'YPF, Vista Energy, Pampa...' },
        { id: 'Finanzas y Fintech',       label: 'Bancos y Fintech',      icon: 'bank',        desc: 'Galicia, Nubank, BBVA...' },
        { id: 'Tecnología y Crecimiento', label: 'Tecnología Global',     icon: 'cpu',         desc: 'Apple, NVIDIA, Google...' },
        { id: 'Consumo y Otros',          label: 'Consumo e Industria',   icon: 'shoppingBag', desc: 'Coca-Cola, Loma Negra...' },
    ];

    const handleRegion = (r) => { setRegion(r); setStep(2); };
    const toggleSector = (s) => setSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

    const handleSectorNext = () => {
        const cats = region === 'Argentina' ? ['Argentina'] : region === 'Internacional' ? ['Internacional'] : ['Argentina', 'Internacional'];
        const all = CATEGORIES.filter(c => cats.includes(c.name)).flatMap(c => c.companies);
        const filtered = sectors.length > 0 ? all.filter(c => sectors.includes(c.sector)) : all;
        const order = { bajo: 0, medio: 1, alto: 2, muy_alto: 3 };
        const sorted = [...filtered].sort((a, b) => (order[a.riskLevel] || 1) - (order[b.riskLevel] || 1));
        const top6 = sorted.slice(0, 6).map(c => c.symbol);
        setSuggestedSymbols(top6);
        setSelected(sorted.slice(0, 3).map(c => c.symbol));
        setStep(3);
    };

    const regionOptions = [
        { val: 'Argentina',     label: 'Mercado Argentino',    icon: 'mapPin' },
        { val: 'Internacional', label: 'Mercado Internacional', icon: 'globe'  },
        { val: 'Ambos',         label: 'Ambos mercados',       icon: 'sparkle' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }}>
            <div className="w-full max-w-md rounded-[28px] border overflow-hidden shadow-2xl"
                 style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>

                <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)', background: 'var(--accent-soft)' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                                Paso {step} de 3
                            </p>
                            <h2 className="text-xl font-extrabold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                                {step === 1 ? '¿Dónde querés invertir?' : step === 2 ? '¿Qué sector te interesa?' : 'Tu cartera sugerida'}
                            </h2>
                        </div>
                        <button onClick={onSkip} className="flex items-center gap-1 text-[10px] font-bold cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                                style={{ color: 'var(--text-secondary)' }}>
                            Saltear <Ico name="chevronRight" size={10} />
                        </button>
                    </div>
                    <div className="mt-4 h-1.5 w-full rounded-full" style={{ background: 'var(--bg-page)' }}>
                        <div className="h-full rounded-full transition-all duration-500"
                             style={{ width: `${(step / 3) * 100}%`, background: 'var(--accent)' }} />
                    </div>
                </div>

                <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
                    {step === 1 && regionOptions.map(opt => (
                        <button key={opt.val} onClick={() => handleRegion(opt.val)}
                                className="w-full p-4 rounded-2xl border-2 text-left cursor-pointer transition-all hover:scale-[1.02] flex items-center gap-3"
                                style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-page)' }}>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                 style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                <Ico name={opt.icon} size={18} />
                            </div>
                            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{opt.label}</span>
                            <Ico name="chevronRight" size={14} className="ml-auto opacity-40" />
                        </button>
                    ))}

                    {step === 2 && (
                        <>
                            {sectorOptions.map(s => (
                                <button key={s.id} onClick={() => toggleSector(s.id)}
                                        className="w-full p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all hover:scale-[1.02] flex items-center gap-3"
                                        style={{
                                            borderColor: sectors.includes(s.id) ? 'var(--accent)' : 'var(--border-subtle)',
                                            background:  sectors.includes(s.id) ? 'var(--accent-soft)' : 'var(--bg-page)',
                                        }}>
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                         style={{ background: sectors.includes(s.id) ? 'var(--accent)' : 'var(--bg-surface)', color: sectors.includes(s.id) ? 'white' : 'var(--text-secondary)' }}>
                                        <Ico name={s.icon} size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{s.label}</p>
                                        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{s.desc}</p>
                                    </div>
                                    {sectors.includes(s.id) && <Ico name="check" size={16} style={{ color: 'var(--accent)' }} />}
                                </button>
                            ))}
                            <button onClick={handleSectorNext}
                                    className="w-full py-3 rounded-2xl font-bold text-sm cursor-pointer transition-all hover:opacity-90 flex items-center justify-center gap-2"
                                    style={{ background: 'var(--accent)', color: 'white' }}>
                                Ver sugerencias <Ico name="chevronRight" size={14} />
                            </button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            {suggestedSymbols.map(sym => {
                                const company = getCompanyBySymbol(sym);
                                if (!company) return null;
                                const isSel = selected.includes(sym);
                                return (
                                    <button key={sym} onClick={() => setSelected(p => p.includes(sym) ? p.filter(s => s !== sym) : [...p, sym])}
                                            className="w-full p-3 rounded-2xl border-2 text-left cursor-pointer transition-all hover:scale-[1.02] flex items-center gap-3"
                                            style={{ borderColor: isSel ? 'var(--accent)' : 'var(--border-subtle)', background: isSel ? 'var(--accent-soft)' : 'var(--bg-page)' }}>
                                        <CompanyLogo company={company} className="w-9 h-9" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{company.name}</p>
                                            <p className="text-[10px] truncate" style={{ color: 'var(--text-secondary)' }}>{company.description?.slice(0, 60)}…</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <RiskBadge riskLevel={company.riskLevel} />
                                            {isSel && <Ico name="check" size={14} style={{ color: 'var(--accent)' }} />}
                                        </div>
                                    </button>
                                );
                            })}
                            <button onClick={() => onComplete(selected)} disabled={selected.length === 0}
                                    className="w-full py-3.5 rounded-2xl font-extrabold text-sm cursor-pointer transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2 mt-2"
                                    style={{ background: 'var(--accent)', color: 'white' }}>
                                <Ico name="check" size={14} />
                                Crear cartera con {selected.length} activo{selected.length !== 1 ? 's' : ''}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Tarjeta de empresa (en el selector) ─────────────────────────────────────
const CompanyCard = ({ company, isSelected, onToggle, semaphoreSignal }) => (
    <button onClick={() => onToggle(company.symbol)}
            className="w-full text-left p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-md"
            style={{
                borderColor: isSelected ? 'var(--accent)' : 'var(--border-subtle)',
                background:  isSelected ? 'var(--accent-soft)' : 'var(--bg-surface)',
            }}>
        <div className="flex items-center gap-2.5">
            <CompanyLogo company={company} className="w-9 h-9" />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-extrabold truncate" style={{ color: 'var(--text-primary)' }}>{company.name}</span>
                    {isSelected && semaphoreSignal && semaphoreSignal !== 'unknown' &&
                        <SemaphoreIndicator signal={semaphoreSignal} size="xs" />}
                </div>
                <p className="text-[10px] font-semibold" style={{ color: 'var(--text-tertiary)' }}>{company.symbol}</p>
            </div>
            <div className="text-right shrink-0 flex items-center gap-1" style={{ color: isSelected ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                <Ico name={isSelected ? 'check' : 'plus'} size={12} />
                <span className="text-[10px] font-bold">{isSelected ? 'En cartera' : 'Agregar'}</span>
            </div>
        </div>
        <div className="mt-1.5">
            <RiskBadge riskLevel={company.riskLevel} />
        </div>
    </button>
);

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════
export default function CarteraClient() {
    const [theme] = useTheme();
    const [portfolio, setPortfolio] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [detailSymbol, setDetailSymbol] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showOnboarding, setShowOnboarding] = useState(false);

    // Noticias
    const [googleNews, setGoogleNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(false);
    const [newsError, setNewsError] = useState(false);
    const [newsTab, setNewsTab] = useState('google');

    // Analistas
    const [analystData, setAnalystData] = useState(null);
    const [analystsLoading, setAnalystsLoading] = useState(false);
    const [analystsError, setAnalystsError] = useState(false);

    // Cache semáforos cartera
    const [semaphoreCache, setSemaphoreCache] = useState({});

    // ── Mount ─────────────────────────────────────────────────────────────────
    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem('infopeso_portfolio');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setPortfolio(parsed);
                    setDetailSymbol(parsed[0]);
                } else {
                    setShowOnboarding(true);
                }
            } catch { setShowOnboarding(true); }
        } else {
            setShowOnboarding(true);
        }
    }, []);

    const savePortfolio = (next) => {
        setPortfolio(next);
        localStorage.setItem('infopeso_portfolio', JSON.stringify(next));
        if (next.length > 0 && !next.includes(detailSymbol)) setDetailSymbol(next[0]);
    };

    const toggleCompany = (sym) => savePortfolio(portfolio.includes(sym) ? portfolio.filter(s => s !== sym) : [...portfolio, sym]);
    const applyPreset   = (syms) => { savePortfolio(syms); setDetailSymbol(syms[0]); setIsEditing(false); };
    const clearPortfolio = () => {
        if (window.confirm('¿Borrar todos los activos de tu cartera?')) {
            savePortfolio([]); setDetailSymbol(''); setShowOnboarding(true);
        }
    };

    const activeCompany = getCompanyBySymbol(detailSymbol) ||
        (portfolio.length > 0 ? getCompanyBySymbol(portfolio[0]) : null);

    // ── Semáforos de toda la cartera ──────────────────────────────────────────
    useEffect(() => {
        if (!isMounted || portfolio.length === 0) return;
        const toFetch = portfolio.filter(sym => !semaphoreCache[sym]);
        if (toFetch.length === 0) return;
        const run = async () => {
            const results = {};
            await Promise.allSettled(toFetch.map(async (sym) => {
                const comp = getCompanyBySymbol(sym);
                if (!comp) { results[sym] = 'unknown'; return; }
                const clean = comp.tvSymbol.includes(':') ? comp.tvSymbol.split(':')[1] : comp.tvSymbol;
                try {
                    const res = await fetch(`/api/analysts?symbol=${encodeURIComponent(clean)}`);
                    const data = await res.json();
                    results[sym] = getSemaphoreFromTrend(data.trend);
                } catch { results[sym] = 'unknown'; }
            }));
            setSemaphoreCache(p => ({ ...p, ...results }));
        };
        run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portfolio, isMounted]);

    // ── Google News ───────────────────────────────────────────────────────────
    useEffect(() => {
        if (!activeCompany) return;
        let alive = true;
        const run = async () => {
            setNewsLoading(true); setNewsError(false); setGoogleNews([]);
            try {
                const q = encodeURIComponent(`${activeCompany.newsQuery} when:7d`);
                const res = await fetch(`/gnews-rss/rss/search?q=${q}&hl=es-419&gl=AR&ceid=AR%3Aes-419`);
                if (!res.ok) throw new Error();
                const xml = await res.text();
                const doc = new DOMParser().parseFromString(xml, 'application/xml');
                if (doc.querySelector('parsererror')) throw new Error();
                const parsed = Array.from(doc.querySelectorAll('item')).slice(0, 8).map(item => {
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
                        title:   (item.querySelector('title')?.textContent || '').replace(/\s+-\s+[^-\n]+$/, ''),
                        link:    item.querySelector('link')?.textContent || '#',
                        timeAgo: timeStr,
                        source:  item.querySelector('source')?.textContent || 'Google News',
                    };
                });
                if (alive) setGoogleNews(parsed);
            } catch { if (alive) setNewsError(true); }
            finally  { if (alive) setNewsLoading(false); }
        };
        run();
        return () => { alive = false; };
    }, [detailSymbol, activeCompany]);

    // ── Analistas Yahoo Finance ───────────────────────────────────────────────
    useEffect(() => {
        if (!activeCompany) return;
        let alive = true;
        const run = async () => {
            setAnalystsLoading(true); setAnalystsError(false); setAnalystData(null);
            try {
                const clean = activeCompany.tvSymbol.includes(':') ? activeCompany.tvSymbol.split(':')[1] : activeCompany.tvSymbol;
                const res = await fetch(`/api/analysts?symbol=${encodeURIComponent(clean)}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                if (alive) setAnalystData(data);
            } catch { if (alive) setAnalystsError(true); }
            finally  { if (alive) setAnalystsLoading(false); }
        };
        run();
        return () => { alive = false; };
    }, [detailSymbol, activeCompany]);

    // ── Filtro de búsqueda ────────────────────────────────────────────────────
    const q = searchQuery.toLowerCase();
    const filteredCategories = CATEGORIES.map(cat => ({
        ...cat,
        companies: cat.companies.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.symbol.toLowerCase().includes(q)
        )
    })).filter(cat => cat.companies.length > 0);

    if (!isMounted) return null;

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <main className="min-h-screen pt-24 pb-16 px-4 md:px-8" style={{ background: 'var(--bg-page)' }}>

            {showOnboarding && (
                <OnboardingWizard
                    onComplete={(syms) => { savePortfolio(syms); setDetailSymbol(syms[0]); setShowOnboarding(false); }}
                    onSkip={() => setShowOnboarding(false)}
                />
            )}

            <div className="max-w-7xl mx-auto space-y-8">

                {/* ── Encabezado ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                            Dashboard Personal
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold mt-1" style={{ color: 'var(--text-primary)' }}>
                            Seguí tu Cartera
                        </h1>
                        <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                            Monitoreá tus activos con datos reales de mercado y análisis de Wall Street.
                        </p>
                    </div>
                    {portfolio.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={() => setIsEditing(!isEditing)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer border transition-all"
                                    style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}>
                                <Ico name={isEditing ? 'x' : 'edit'} size={12} />
                                {isEditing ? 'Cerrar editor' : 'Editar cartera'}
                            </button>
                            <button onClick={clearPortfolio}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer border transition-all hover:scale-105"
                                    style={{ background: 'var(--negative-soft)', color: 'var(--negative)', borderColor: 'var(--negative)' }}>
                                <Ico name="trash" size={12} />
                                Vaciar
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Estado vacío ── */}
                {portfolio.length === 0 && !isEditing && (
                    <div className="text-center py-20 space-y-5">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                             style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                            <Ico name="barChart" size={32} />
                        </div>
                        <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Tu cartera está vacía</h2>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Usá el asistente guiado o elegí activos manualmente para comenzar.
                        </p>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <button onClick={() => setShowOnboarding(true)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold cursor-pointer transition-all hover:scale-105"
                                    style={{ background: 'var(--accent)', color: 'white' }}>
                                <Ico name="sparkle" size={14} />
                                Guiarme paso a paso
                            </button>
                            <button onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold cursor-pointer border transition-all"
                                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}>
                                <Ico name="edit" size={14} />
                                Armar manualmente
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Selector / Editor ── */}
                {(isEditing || (portfolio.length === 0 && isEditing)) && (
                    <div className="space-y-6">
                        {/* Buscador */}
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }}>
                                <Ico name="search" size={16} />
                            </span>
                            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                   placeholder="Buscar por nombre o ticker… ej: Apple, AAPL, YPF, petróleo"
                                   className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm font-semibold outline-none border"
                                   style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }} />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
                                        style={{ color: 'var(--text-tertiary)' }}>
                                    <Ico name="x" size={14} />
                                </button>
                            )}
                        </div>

                        {/* Presets */}
                        {!searchQuery && (
                            <div>
                                <h3 className="text-xs font-extrabold uppercase tracking-widest mb-3 flex items-center gap-2"
                                    style={{ color: 'var(--text-tertiary)' }}>
                                    <Ico name="sparkle" size={12} /> Carteras prearmadas
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {PRESETS.map(preset => (
                                        <button key={preset.id} onClick={() => applyPreset(preset.symbols)}
                                                className="p-4 rounded-2xl border-2 text-left cursor-pointer transition-all hover:scale-[1.03] hover:shadow-lg space-y-2"
                                                style={{
                                                    borderColor: preset.highlight ? 'var(--positive)' : 'var(--border-subtle)',
                                                    background:  preset.highlight ? 'var(--positive-soft)' : 'var(--bg-surface)',
                                                }}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                                     style={{ background: preset.highlight ? 'var(--positive)' : 'var(--accent-soft)', color: preset.highlight ? 'white' : 'var(--accent)' }}>
                                                    <Ico name={preset.icon} size={14} />
                                                </div>
                                                <p className="font-extrabold text-sm" style={{ color: preset.highlight ? 'var(--positive)' : 'var(--text-primary)' }}>
                                                    {preset.name}
                                                </p>
                                            </div>
                                            <p className="text-[10px] leading-snug" style={{ color: 'var(--text-secondary)' }}>{preset.description}</p>
                                            <p className="text-[10px] font-bold" style={{ color: 'var(--text-tertiary)' }}>
                                                {preset.symbols.join(' · ')}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Lista de empresas */}
                        {filteredCategories.map(cat => (
                            <div key={cat.name}>
                                <h3 className="text-xs font-extrabold uppercase tracking-widest mb-3 flex items-center gap-2"
                                    style={{ color: 'var(--text-tertiary)' }}>
                                    <Ico name={cat.name === 'Argentina' ? 'mapPin' : 'globe'} size={12} />
                                    {cat.name === 'Argentina' ? 'Mercado Argentino' : 'Mercado Internacional'}
                                    <span className="font-normal opacity-50">({cat.companies.length})</span>
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                    {cat.companies.map(company => (
                                        <CompanyCard key={company.symbol} company={company}
                                                     isSelected={portfolio.includes(company.symbol)}
                                                     onToggle={toggleCompany}
                                                     semaphoreSignal={semaphoreCache[company.symbol]} />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {filteredCategories.length === 0 && (
                            <div className="text-center py-12 space-y-2">
                                <Ico name="search" size={28} className="mx-auto opacity-30" />
                                <p className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
                                    Sin resultados para "{searchQuery}"
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Dashboard principal ── */}
                {portfolio.length > 0 && !isEditing && (
                    <div className="space-y-6">

                        {/* Tarjetas de la cartera */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {portfolio.map(sym => {
                                const comp = getCompanyBySymbol(sym);
                                if (!comp) return null;
                                const signal = semaphoreCache[sym];
                                const isActive = detailSymbol === sym || (detailSymbol === '' && sym === portfolio[0]);
                                return (
                                    <button key={sym} onClick={() => setDetailSymbol(sym)}
                                            className="p-3 rounded-2xl border-2 text-left cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg space-y-2"
                                            style={{
                                                borderColor: isActive ? 'var(--accent)' : 'var(--border-subtle)',
                                                background:  isActive ? 'var(--accent-soft)' : 'var(--bg-surface)',
                                            }}>
                                        <div className="flex items-center gap-2">
                                            <CompanyLogo company={comp} className="w-8 h-8" />
                                            <div className="min-w-0">
                                                <p className="text-xs font-extrabold truncate" style={{ color: 'var(--text-primary)' }}>{comp.name}</p>
                                                <p className="text-[9px] font-semibold" style={{ color: 'var(--text-tertiary)' }}>{comp.symbol}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {signal && signal !== 'unknown' && <SemaphoreIndicator signal={signal} size="xs" />}
                                            <RiskBadge riskLevel={comp.riskLevel} />
                                        </div>
                                    </button>
                                );
                            })}
                            <button onClick={() => setIsEditing(true)}
                                    className="p-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all hover:opacity-80 flex flex-col items-center justify-center gap-2"
                                    style={{ borderColor: 'var(--border-subtle)' }}>
                                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                                     style={{ background: 'var(--bg-surface)', color: 'var(--text-tertiary)' }}>
                                    <Ico name="plus" size={14} />
                                </div>
                                <span className="text-[9px] font-bold" style={{ color: 'var(--text-tertiary)' }}>Agregar</span>
                            </button>
                        </div>

                        {/* Detalle de empresa activa */}
                        {activeCompany && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                                {/* Columna izquierda: charts + widgets */}
                                <div className="col-span-1 lg:col-span-7 space-y-5">

                                    {/* Header empresa activa */}
                                    <div className="p-5 rounded-[24px] border space-y-3"
                                         style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                        <div className="flex items-start gap-4">
                                            <CompanyLogo company={activeCompany} className="w-12 h-12" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                                                        {activeCompany.name}
                                                    </h2>
                                                    <RiskBadge riskLevel={activeCompany.riskLevel} />
                                                    {semaphoreCache[activeCompany.symbol] && (
                                                        <SemaphoreIndicator signal={semaphoreCache[activeCompany.symbol]} />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                                                    <SectorIcon sector={activeCompany.sector} size={12} />
                                                    <span className="text-xs font-semibold">{activeCompany.symbol} · {activeCompany.sector}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                            {activeCompany.description}
                                        </p>
                                    </div>

                                    {/* MiniChart */}
                                    <div className="rounded-[24px] border overflow-hidden"
                                         style={{ borderColor: 'var(--border-subtle)', height: '400px' }}>
                                        <MiniChart symbol={activeCompany.tvSymbol} colorTheme={theme}
                                                   width="100%" height="100%" locale="es" isTransparent autosize />
                                    </div>

                                    {/* Profile + Fundamentals */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="rounded-[24px] border overflow-hidden"
                                             style={{ borderColor: 'var(--border-subtle)', height: '280px' }}>
                                            <CompanyProfile symbol={activeCompany.tvSymbol} colorTheme={theme}
                                                            width="100%" height="100%" locale="es" isTransparent />
                                        </div>
                                        <div className="rounded-[24px] border overflow-hidden"
                                             style={{ borderColor: 'var(--border-subtle)', height: '280px' }}>
                                            <FundamentalData symbol={activeCompany.tvSymbol} colorTheme={theme}
                                                             width="100%" height="100%" locale="es" isTransparent displayMode="compact" />
                                        </div>
                                    </div>

                                    {/* Monitor sectorial – Energía */}
                                    {hasSector(portfolio, 'Energía y Commodities') && (
                                        <div className="p-5 rounded-[24px] border space-y-3"
                                             style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                            <h4 className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-2"
                                                style={{ color: 'var(--accent)' }}>
                                                <Ico name="flame" size={12} /> Monitor de Energía y Commodities
                                            </h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['NYMEX:CL1!', 'NYMEX:NG1!', 'CAPITALCOM:NATURAL_GAS', 'ECONOMICS:ARGINTR'].map(sym => (
                                                    <div key={sym} className="rounded-2xl overflow-hidden border"
                                                         style={{ height: '130px', borderColor: 'var(--border-subtle)' }}>
                                                        <MiniChart symbol={sym} colorTheme={theme}
                                                                   width="100%" height="100%" locale="es" isTransparent autosize />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Columna derecha: análisis + noticias */}
                                <div className="col-span-1 lg:col-span-5 space-y-5">

                                    {/* Ficha fundamental */}
                                    <div className="p-5 rounded-[24px] border space-y-4"
                                         style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                                        <h3 className="text-sm font-extrabold flex items-center gap-2"
                                            style={{ color: 'var(--text-primary)' }}>
                                            <Ico name="barChart" size={14} /> Análisis Fundamental
                                        </h3>

                                        <div className="space-y-1.5 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest"
                                                style={{ color: 'var(--text-secondary)' }}>Plan de Negocios</h4>
                                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                {activeCompany.planDeNegocios}
                                            </p>
                                        </div>

                                        <div className="space-y-2 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest"
                                                style={{ color: 'var(--text-secondary)' }}>Fundamentales Clave</h4>
                                            <ul className="space-y-1.5 pl-4 list-disc text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                {activeCompany.fundamentosClave.map((item, i) => (
                                                    <li key={i} className="leading-snug">{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5"
                                                style={{ color: 'var(--text-secondary)' }}>Análisis Sectorial</h4>
                                            <p className="text-xs leading-relaxed p-3 rounded-xl border"
                                               style={{ color: 'var(--text-secondary)', background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                                {activeCompany.analisisProfesional}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Panel noticias + analistas */}
                                    <div className="rounded-[24px] border flex flex-col overflow-hidden"
                                         style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', minHeight: '480px' }}>

                                        {/* Pestañas */}
                                        <div className="flex border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                                            {[
                                                { id: 'google',      label: 'Prensa',         icon: 'newspaper' },
                                                { id: 'analysts',    label: 'Analistas (YF)', icon: 'barChart'  },
                                                { id: 'tradingview', label: 'Mercado (TV)',   icon: 'tv'        },
                                            ].map(tab => (
                                                <button key={tab.id} onClick={() => setNewsTab(tab.id)}
                                                        className="flex-1 py-3 text-[10px] font-extrabold tracking-wider uppercase border-b-2 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1"
                                                        style={{
                                                            color: newsTab === tab.id ? 'var(--accent)' : 'var(--text-tertiary)',
                                                            borderBottomColor: newsTab === tab.id ? 'var(--accent)' : 'transparent',
                                                            background: newsTab === tab.id ? 'var(--accent-soft)' : 'transparent',
                                                        }}>
                                                    <Ico name={tab.icon} size={11} />
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex-1 overflow-y-auto max-h-[520px]">

                                            {/* TAB: Google News */}
                                            {newsTab === 'google' && (
                                                <div className="p-4 space-y-3">
                                                    {/* Titular destacado */}
                                                    {!newsLoading && googleNews.length > 0 && (
                                                        <div className="p-3.5 rounded-xl border-l-4"
                                                             style={{ background: 'var(--accent-soft)', borderLeftColor: 'var(--accent)' }}>
                                                            <p className="text-[9px] font-extrabold uppercase tracking-widest flex items-center gap-1 mb-1"
                                                               style={{ color: 'var(--accent)' }}>
                                                                <Ico name="bolt" size={9} /> Último titular
                                                            </p>
                                                            <p className="text-xs font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                                                                {googleNews[0].title}
                                                            </p>
                                                            <p className="text-[9px] mt-0.5 flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                                                                <Ico name="clock" size={9} /> {googleNews[0].source} · {googleNews[0].timeAgo}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {newsLoading
                                                        ? Array.from({ length: 4 }).map((_, i) => (
                                                            <div key={i} className="animate-pulse p-4 rounded-xl border space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
                                                                <div className="skeleton h-3 w-1/4 rounded" />
                                                                <div className="skeleton h-4 w-full rounded" />
                                                            </div>
                                                        ))
                                                        : newsError
                                                        ? <div className="flex flex-col items-center py-10 gap-2">
                                                            <Ico name="alertCircle" size={24} style={{ color: 'var(--negative)' }} />
                                                            <p className="text-xs" style={{ color: 'var(--negative)' }}>Error al cargar noticias.</p>
                                                          </div>
                                                        : googleNews.map((news, i) => (
                                                            <a key={i} href={news.link} target="_blank" rel="noopener noreferrer"
                                                               className="block p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01] hover:shadow-md group"
                                                               style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                                                                          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                                                        {news.source}
                                                                    </span>
                                                                    <span className="text-[9px] flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                                                                        <Ico name="clock" size={9} /> {news.timeAgo}
                                                                    </span>
                                                                </div>
                                                                <h5 className="text-xs font-bold leading-snug group-hover:text-[var(--accent)] transition-colors"
                                                                    style={{ color: 'var(--text-primary)' }}>
                                                                    {news.title}
                                                                </h5>
                                                            </a>
                                                        ))
                                                    }
                                                </div>
                                            )}

                                            {/* TAB: Analistas Yahoo Finance */}
                                            {newsTab === 'analysts' && (
                                                <div className="p-4 space-y-4">
                                                    {analystsLoading
                                                        ? <div className="space-y-3 animate-pulse">
                                                            <div className="skeleton h-24 w-full rounded-xl" />
                                                            <div className="skeleton h-32 w-full rounded-xl" />
                                                            <div className="skeleton h-16 w-full rounded-xl" />
                                                          </div>
                                                        : analystsError || !analystData
                                                        ? <div className="flex flex-col items-center py-10 gap-2">
                                                            <Ico name="alertCircle" size={24} style={{ color: 'var(--negative)' }} />
                                                            <p className="text-xs font-bold" style={{ color: 'var(--negative)' }}>Sin datos de analistas</p>
                                                            <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
                                                                Yahoo Finance no reporta cobertura de analistas para este activo.
                                                            </p>
                                                          </div>
                                                        : <>
                                                            {/* Precio objetivo */}
                                                            {analystData.financialData?.targetMeanPrice && (
                                                                <div className="p-4 rounded-xl border space-y-3"
                                                                     style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                                                    <div className="flex items-center justify-between">
                                                                        <h5 className="text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5"
                                                                            style={{ color: 'var(--text-secondary)' }}>
                                                                            <Ico name="target" size={11} /> Consenso de Wall Street
                                                                        </h5>
                                                                        {analystData.financialData.numberOfAnalystOpinions && (
                                                                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                                                                                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                                                                {analystData.financialData.numberOfAnalystOpinions} analistas
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="grid grid-cols-3 gap-2 text-center">
                                                                        <div className="p-2 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                                                                            <p className="text-[9px] font-semibold uppercase" style={{ color: 'var(--text-tertiary)' }}>Precio Bajo</p>
                                                                            <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--negative)' }}>
                                                                                ${analystData.financialData.targetLowPrice?.toFixed(2)}
                                                                            </p>
                                                                        </div>
                                                                        <div className="p-2 rounded-lg border-2"
                                                                             style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}>
                                                                            <p className="text-[9px] font-bold uppercase" style={{ color: 'var(--accent)' }}>Objetivo Prom.</p>
                                                                            <p className="text-sm font-extrabold mt-0.5" style={{ color: 'var(--accent)' }}>
                                                                                ${analystData.financialData.targetMeanPrice?.toFixed(2)}
                                                                            </p>
                                                                        </div>
                                                                        <div className="p-2 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                                                                            <p className="text-[9px] font-semibold uppercase" style={{ color: 'var(--text-tertiary)' }}>Precio Alto</p>
                                                                            <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--positive)' }}>
                                                                                ${analystData.financialData.targetHighPrice?.toFixed(2)}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    {analystData.financialData.recommendationKey && (
                                                                        <div className="flex items-center justify-center gap-2">
                                                                            <span className="text-[10px] font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                                                                                Recomendación:
                                                                            </span>
                                                                            <SemaphoreIndicator
                                                                                signal={
                                                                                    ['buy','strong_buy','strongBuy'].includes(analystData.financialData.recommendationKey) ? 'buy'
                                                                                    : analystData.financialData.recommendationKey === 'hold' ? 'hold'
                                                                                    : 'sell'
                                                                                }
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Distribución */}
                                                            {analystData.trend && (() => {
                                                                const t = analystData.trend;
                                                                const total = t.strongBuy + t.buy + t.hold + t.sell + t.strongSell || 1;
                                                                const bars = [
                                                                    { label: 'Compra fuerte', value: t.strongBuy,  color: '#10b981' },
                                                                    { label: 'Comprar',       value: t.buy,         color: '#34d399' },
                                                                    { label: 'Mantener',      value: t.hold,        color: 'var(--accent)' },
                                                                    { label: 'Vender',        value: t.sell,        color: '#f87171' },
                                                                    { label: 'Venta fuerte',  value: t.strongSell,  color: '#ef4444' },
                                                                ];
                                                                return (
                                                                    <div className="p-4 rounded-xl border space-y-2.5"
                                                                         style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                                                        <h5 className="text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5"
                                                                            style={{ color: 'var(--text-secondary)' }}>
                                                                            <Ico name="megaphone" size={11} /> Distribución de Opiniones
                                                                        </h5>
                                                                        {bars.map(bar => (
                                                                            <div key={bar.label} className="flex items-center gap-2 text-[10px]">
                                                                                <span className="w-20 text-right font-semibold shrink-0" style={{ color: 'var(--text-tertiary)' }}>
                                                                                    {bar.label}
                                                                                </span>
                                                                                <div className="flex-1 rounded-full h-2 overflow-hidden"
                                                                                     style={{ background: 'var(--bg-surface)' }}>
                                                                                    <div className="h-full rounded-full transition-all duration-700"
                                                                                         style={{ width: `${(bar.value / total) * 100}%`, background: bar.color }} />
                                                                                </div>
                                                                                <span className="w-5 font-bold" style={{ color: 'var(--text-primary)' }}>{bar.value}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                );
                                                            })()}

                                                            {/* Upgrades / Downgrades */}
                                                            {analystData.history?.length > 0 && (
                                                                <div className="space-y-2">
                                                                    <h5 className="text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5"
                                                                        style={{ color: 'var(--text-secondary)' }}>
                                                                        <Ico name="trendingUp" size={11} /> Upgrades / Downgrades
                                                                    </h5>
                                                                    {analystData.history.map((item, i) => {
                                                                        const isUp = item.action === 'up';
                                                                        const isDn = item.action === 'down';
                                                                        return (
                                                                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border"
                                                                                 style={{ background: 'var(--bg-page)', borderColor: 'var(--border-subtle)' }}>
                                                                                <Ico name={isUp ? 'arrowUp' : isDn ? 'arrowDown' : 'bolt'} size={14}
                                                                                     style={{ color: isUp ? 'var(--positive)' : isDn ? 'var(--negative)' : 'var(--accent)', flexShrink: 0 }} />
                                                                                <div className="flex-1 min-w-0">
                                                                                    <p className="text-[11px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                                                                                        {item.firm}
                                                                                    </p>
                                                                                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                                                                                        {item.fromGrade && <span>{item.fromGrade} → </span>}
                                                                                        <span className="font-semibold"
                                                                                              style={{ color: isUp ? 'var(--positive)' : isDn ? 'var(--negative)' : 'var(--accent)' }}>
                                                                                            {item.toGrade}
                                                                                        </span>
                                                                                    </p>
                                                                                </div>
                                                                                <div className="text-right shrink-0">
                                                                                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                                                                                          style={{
                                                                                              background: isUp ? 'var(--positive-soft)' : isDn ? 'var(--negative-soft)' : 'var(--accent-soft)',
                                                                                              color: isUp ? 'var(--positive)' : isDn ? 'var(--negative)' : 'var(--accent)',
                                                                                          }}>
                                                                                        {isUp ? 'Upgrade' : isDn ? 'Downgrade' : 'Iniciado'}
                                                                                    </span>
                                                                                    <p className="text-[9px] mt-0.5 flex items-center justify-end gap-0.5"
                                                                                       style={{ color: 'var(--text-tertiary)' }}>
                                                                                        <Ico name="clock" size={8} /> {item.timeAgo}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            )}
                                                          </>
                                                    }
                                                </div>
                                            )}

                                            {/* TAB: TradingView */}
                                            {newsTab === 'tradingview' && (
                                                <div className="h-[520px] w-full">
                                                    <Timeline feedMode="symbol" symbol={activeCompany.tvSymbol}
                                                              colorTheme={theme} width="100%" height="100%"
                                                              locale="es" isTransparent />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <p className="text-[10px] text-center opacity-40 pt-4" style={{ color: 'var(--text-tertiary)' }}>
                    Datos provistos por TradingView, Google News RSS y Yahoo Finance. Infopeso no brinda asesoría financiera.
                </p>
            </div>
        </main>
    );
}
