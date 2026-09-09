'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { TechnicalAnalysis, MiniChart, CompanyProfile, FundamentalData, Timeline, SymbolInfo } from 'react-ts-tradingview-widgets';
import { TradingViewContainer } from '@/components/TradingViewContainer';

const CATEGORIES = [
    {
        name: 'Argentina',
        companies: [
            { symbol: 'GGAL.BA',  name: 'Galicia', tvSymbol: 'BCBA:GGAL' },
            { symbol: 'YPFD.BA',  name: 'YPF', tvSymbol: 'BCBA:YPFD' },
            { symbol: 'PAMP.BA',  name: 'Pampa Energía', tvSymbol: 'BCBA:PAMP' },
            { symbol: 'BMA.BA',   name: 'Banco Macro', tvSymbol: 'BCBA:BMA' },
            { symbol: 'BBAR.BA',  name: 'BBVA', tvSymbol: 'BCBA:BBAR' },
            { symbol: 'CEPU.BA',  name: 'Central Puerto', tvSymbol: 'BCBA:CEPU' },
            { symbol: 'LOMA.BA',  name: 'Loma Negra', tvSymbol: 'BCBA:LOMA' },
            { symbol: 'CRES.BA',  name: 'Cresud', tvSymbol: 'BCBA:CRES' },
            { symbol: 'IRSA.BA',  name: 'IRSA', tvSymbol: 'BCBA:IRSA' },
            { symbol: 'TGSU2.BA', name: 'TGS', tvSymbol: 'BCBA:TGSU2' },
            { symbol: 'ALUA.BA',  name: 'Aluar', tvSymbol: 'BCBA:ALUA' },
            { symbol: 'TXAR.BA',  name: 'Ternium', tvSymbol: 'BCBA:TXAR' },
        ]
    },
    {
        name: 'Internacional',
        companies: [
            { symbol: 'MELI',     name: 'Mercado Libre', tvSymbol: 'NASDAQ:MELI' },
            { symbol: 'AAPL',     name: 'Apple', tvSymbol: 'NASDAQ:AAPL' },
            { symbol: 'MSFT',     name: 'Microsoft', tvSymbol: 'NASDAQ:MSFT' },
            { symbol: 'NVDA',     name: 'NVIDIA', tvSymbol: 'NASDAQ:NVDA' },
            { symbol: 'TSLA',     name: 'Tesla', tvSymbol: 'NASDAQ:TSLA' },
            { symbol: 'AMZN',     name: 'Amazon', tvSymbol: 'NASDAQ:AMZN' },
            { symbol: 'GOOGL',    name: 'Alphabet', tvSymbol: 'NASDAQ:GOOGL' },
            { symbol: 'META',     name: 'Meta', tvSymbol: 'NASDAQ:META' },
            { symbol: 'TSM',      name: 'TSMC', tvSymbol: 'NYSE:TSM' },
            { symbol: 'KO',       name: 'Coca-Cola', tvSymbol: 'NYSE:KO' },
            { symbol: 'WMT',      name: 'Walmart', tvSymbol: 'NYSE:WMT' },
            { symbol: 'NU',       name: 'Nubank', tvSymbol: 'NYSE:NU' },
            { symbol: 'BRK-B',    name: 'Berkshire', tvSymbol: 'NYSE:BRK.B' },
            { symbol: 'NFLX',     name: 'Netflix', tvSymbol: 'NASDAQ:NFLX' },
        ]
    }
];

export default function EmpresasClient() {
    const [theme] = useTheme();
    const [selectedSymbol, setSelectedSymbol] = useState(CATEGORIES[0].companies[0].symbol);
    
    const selectedCompany = [...CATEGORIES[0].companies, ...CATEGORIES[1].companies].find(c => c.symbol === selectedSymbol);
    const tvSymbol = selectedCompany?.tvSymbol;

    useEffect(() => {
        if (selectedSymbol) {
            localStorage.setItem('lastViewedCompany', selectedSymbol);
        }
    }, [selectedSymbol]);

    return (
        <main className="min-h-screen pt-14 pb-16 md:pb-12">
            <div className="px-5 sm:px-8 py-8 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="max-w-[1200px] mx-auto">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-1"
                       style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                        Análisis Fundamental
                    </p>
                    <h1 className="text-3xl sm:text-4xl leading-tight"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        Terminal de Empresas
                    </h1>
                </div>
            </div>

            <section className="px-5 sm:px-8 py-8">
                <div className="max-w-[1200px] mx-auto space-y-8">
                    
                    <div className="p-5 rounded-[24px]" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                        <div className="flex flex-col md:flex-row gap-6">
                            {CATEGORIES.map((category) => (
                                <div key={category.name} className="flex-1 space-y-3">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-tertiary)' }}>
                                        {category.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.companies.map((company) => (
                                            <button
                                                key={company.symbol}
                                                onClick={() => setSelectedSymbol(company.symbol)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 border ${
                                                    selectedSymbol === company.symbol 
                                                    ? 'bg-[var(--accent)] text-[white] shadow-md shadow-[var(--accent)]/20 scale-105 border-[var(--accent)]' 
                                                    : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
                                                }`}
                                            >
                                                {company.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                        <div className="col-span-1 lg:col-span-12 rounded-[24px] overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                            <TradingViewContainer minHeight="160px">
                                {(activeTheme) => (
                                    <SymbolInfo key={`sym-${tvSymbol}-${activeTheme}`} symbol={tvSymbol} colorTheme={activeTheme} width="100%" locale="es" isTransparent />
                                )}
                            </TradingViewContainer>
                        </div>

                        <div className="col-span-1 lg:col-span-8 flex flex-col gap-5">
                            <div className="rounded-[24px] overflow-hidden p-2 transition-all hover:shadow-md" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                                <div className="h-[300px] w-full">
                                    <TradingViewContainer height="300px">
                                        {(activeTheme) => (
                                            <CompanyProfile key={`profile-${tvSymbol}-${activeTheme}`} symbol={tvSymbol} colorTheme={activeTheme} width="100%" height="100%" locale="es" isTransparent />
                                        )}
                                    </TradingViewContainer>
                                </div>
                            </div>

                            <div className="rounded-[24px] overflow-hidden p-2 transition-all hover:shadow-md" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                                <div className="h-[450px] w-full">
                                    <TradingViewContainer height="450px">
                                        {(activeTheme) => (
                                            <FundamentalData key={`fund-${tvSymbol}-${activeTheme}`} symbol={tvSymbol} colorTheme={activeTheme} width="100%" height="100%" locale="es" isTransparent displayMode="compact" />
                                        )}
                                    </TradingViewContainer>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 lg:col-span-4 flex flex-col gap-5">
                            <div className="rounded-[24px] overflow-hidden p-2" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2 ml-3 mt-2 opacity-50" style={{ color: 'var(--text-primary)' }}>Sentimiento Técnico</h4>
                                <div className="h-[380px] w-full">
                                    <TradingViewContainer height="380px">
                                        {(activeTheme) => (
                                            <TechnicalAnalysis key={`ta-${tvSymbol}-${activeTheme}`} symbol={tvSymbol} colorTheme={activeTheme} width="100%" height="100%" locale="es" isTransparent />
                                        )}
                                    </TradingViewContainer>
                                </div>
                            </div>

                            <div className="rounded-[24px] overflow-hidden p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider mb-3 opacity-50" style={{ color: 'var(--text-primary)' }}>Rendimiento Reciente</h4>
                                <div className="h-[150px] w-full">
                                    <TradingViewContainer height="150px">
                                        {(activeTheme) => (
                                            <MiniChart key={`mini-${tvSymbol}-${activeTheme}`} symbol={tvSymbol} colorTheme={activeTheme} width="100%" height="100%" locale="es" isTransparent />
                                        )}
                                    </TradingViewContainer>
                                </div>
                            </div>

                            <div className="rounded-[24px] overflow-hidden flex-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', minHeight: '350px' }}>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider mb-0 p-4 pb-0 opacity-50" style={{ color: 'var(--text-primary)' }}>Noticias de la Empresa</h4>
                                <TradingViewContainer height="350px">
                                    {(activeTheme) => (
                                        <Timeline key={`timeline-${tvSymbol}-${activeTheme}`} feedMode="symbol" symbol={tvSymbol} colorTheme={activeTheme} width="100%" height="100%" locale="es" isTransparent />
                                    )}
                                </TradingViewContainer>
                            </div>
                        </div>
                    </div>

                    <p className="text-[10px] text-center pt-8 opacity-50" style={{ color: 'var(--text-tertiary)' }}>
                        Datos en tiempo real y gratuitos provistos exclusivamente por la tecnología de TradingView.
                        Infopeso no brinda asesoría financiera. Todo análisis es meramente educativo.
                    </p>
                </div>
            </section>
        </main>
    );
}
