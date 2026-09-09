'use client';

import { useState, useEffect } from 'react';
import { MacroListRow } from '@/components/cards/MacroListRow';
import { Loading } from '@/components/LoadingAnim';
import { ErrorComponent } from '@/components/Error';
import { categories } from '@/MacroFilters';
import { useMacro } from '@/hooks/useMacro';
import { usePBI } from '@/hooks/usePBI';

const TABS = [
    { key: 'pbi',                label: 'PBI',               chart: { type: 'line', duration: 'year' } },
    { key: 'bcra',               label: 'BCRA',              chart: { type: 'line', duration: 'month' } },
    { key: 'baseMonetaria',      label: 'Base Monetaria',    chart: { type: 'line', duration: 'month' } },
    { key: 'inflacion',          label: 'Inflación',         chart: { type: 'bars', duration: 'year'  } },
    { key: 'tasas',              label: 'Tasas',             chart: { type: 'line', duration: 'month' } },
    { key: 'prestamos',          label: 'Préstamos',         chart: { type: 'line', duration: 'month' } },
    { key: 'unidadesFinancieras',label: 'UVA / UVI',        chart: { type: 'line', duration: 'month' } },
    { key: 'otrosIndices',       label: 'Otros índices',     chart: { type: 'line', duration: 'month' } },
];

const macroBatchCache = {};

export default function EconomiaClient({ initialVariables, initialPBI }) {
    const { variables, variablesStatus } = useMacro(initialVariables);
    const { pbiData, pbiStatus } = usePBI(initialPBI);
    const [activeTab, setActiveTab] = useState('pbi');
    const [batchHistory, setBatchHistory] = useState(macroBatchCache);

    const filter = (categorie) =>
        variables?.filter(item => categorie.includes(item.idVariable)) || [];

    const allCategories = Object.values(categories).flat();
    const notIncludes = variables?.filter(item => !allCategories.includes(item.idVariable)) || [];

    const currentTab = TABS.find(t => t.key === activeTab);
    const currentData = filter(categories[activeTab] || []);

    // Batch fetch historical data for active tab variables
    useEffect(() => {
        if (activeTab === 'pbi') return;

        const targetItems = activeTab === 'otros' ? notIncludes : currentData;
        const targetIds = targetItems.map(item => item.idVariable);
        if (targetIds.length === 0) return;

        const missingIds = targetIds.filter(id => !macroBatchCache[id]);
        if (missingIds.length === 0) {
            setBatchHistory(prev => ({ ...prev, ...macroBatchCache }));
            return;
        }

        const duration = currentTab?.chart?.duration || 'month';
        const fetchBatch = async () => {
            try {
                const res = await fetch(`/api/macro-history?ids=${missingIds.join(',')}&duration=${duration}`);
                if (res.ok) {
                    const data = await res.json();
                    Object.assign(macroBatchCache, data);
                    setBatchHistory(prev => ({ ...prev, ...data }));
                }
            } catch (err) {
                console.error("Error fetching batch macro history:", err);
            }
        };

        fetchBatch();
    }, [activeTab, variables]);

    return (
        <main className="min-h-screen pt-14 pb-16 md:pb-12">
            <div className="px-5 sm:px-8 py-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="max-w-[1200px] mx-auto">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-1"
                       style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                        BCRA · ArgentinaDatos
                    </p>
                    <h1 className="text-3xl sm:text-4xl leading-tight"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        Indicadores Macro
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                        Variables monetarias y económicas del Banco Central
                    </p>
                </div>
            </div>

            <div
                className="sticky top-14 z-30 px-5 sm:px-8 py-3 overflow-x-auto"
                style={{
                    background: 'var(--header-bg)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid var(--border-subtle)',
                }}
            >
                <div className="max-w-[1200px] mx-auto flex items-center gap-2 min-w-max">
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={activeTab === tab.key ? 'pill-active' : 'pill-inactive'}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <div className="w-px h-5 mx-1" style={{ background: 'var(--border-subtle)' }} />
                    <button
                        onClick={() => setActiveTab('otros')}
                        className={activeTab === 'otros' ? 'pill-active' : 'pill-inactive'}
                    >
                        Otros ({notIncludes.length})
                    </button>
                </div>
            </div>

            <section className="px-5 sm:px-8 py-8">
                <div className="max-w-[1200px] mx-auto">
                    {activeTab !== 'pbi' && variablesStatus === 'loading' && <Loading />}
                    {activeTab !== 'pbi' && variablesStatus === 'error' && <ErrorComponent message="Error al obtener los datos del BCRA" />}
                    
                    {activeTab === 'pbi' && pbiStatus === 'loading' && <Loading />}
                    {activeTab === 'pbi' && pbiStatus === 'error' && <ErrorComponent message="Error al obtener los datos del Banco Mundial" />}

                    {activeTab === 'pbi' && pbiStatus === 'success' && (
                        <div className="flex flex-col gap-2">
                            {pbiData.length === 0 ? (
                                <p className="text-sm text-center py-12" style={{ color: 'var(--text-tertiary)' }}>
                                    Sin datos disponibles de PBI.
                                </p>
                            ) : (
                                pbiData.map((element, index) => (
                                    <div
                                        key={index}
                                        className="stagger-item w-full max-w-[800px] mx-auto"
                                        style={{ animationDelay: `${index * 40}ms` }}
                                    >
                                        <MacroListRow
                                            titulo={element.descripcion.split('(')[0].trim()}
                                            valor={element.valor}
                                            desc={element.descripcion.split('(')[1]?.replace(/[()]/g, '')}
                                            fecha={element.fecha}
                                            id={element.idVariable}
                                            chart={{ type: 'line', duration: 'year' }}
                                            historyData={element.history}
                                            rawDiff={element.difference}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab !== 'pbi' && variablesStatus === 'success' && (
                        <>
                            {activeTab !== 'otros' ? (
                                <>
                                    {currentData.length === 0 ? (
                                        <p className="text-sm text-center py-12" style={{ color: 'var(--text-tertiary)' }}>
                                            Sin datos disponibles para esta categoría.
                                        </p>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            {currentData.map((element, index) => (
                                                <div
                                                    key={index}
                                                    className="stagger-item w-full max-w-[800px] mx-auto"
                                                    style={{ animationDelay: `${index * 60}ms` }}
                                                >
                                                    <MacroListRow
                                                        titulo={element.descripcion.split('(')[0].trim()}
                                                        valor={element.valor}
                                                        desc={element.descripcion.split('(')[1]?.replace(/[()]/g, '')}
                                                        fecha={element.fecha}
                                                        id={element.idVariable}
                                                        chart={currentTab?.chart || { type: 'line', duration: 'month' }}
                                                        historyData={batchHistory[element.idVariable]?.history}
                                                        rawDiff={batchHistory[element.idVariable]?.difference}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {notIncludes.map((element, index) => (
                                        <div
                                            key={`otros-${index}`}
                                            className="stagger-item w-full max-w-[800px] mx-auto"
                                            style={{ animationDelay: `${index * 40}ms` }}
                                        >
                                            <MacroListRow
                                                titulo={element.descripcion.split('(')[0].trim()}
                                                valor={element.valor}
                                                desc={element.descripcion.split('(')[1]?.replace(/[()]/g, '')}
                                                fecha={element.fecha}
                                                id={element.idVariable}
                                                chart={{ type: 'line', duration: 'month' }}
                                                historyData={batchHistory[element.idVariable]?.history}
                                                rawDiff={batchHistory[element.idVariable]?.difference}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs text-center mt-10" style={{ color: 'var(--text-tertiary)' }}>
                                Fuente:{' '}
                                {activeTab === 'pbi' ? (
                                    <a href="https://data.worldbank.org/" className="hover:underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">Banco Mundial</a>
                                ) : (
                                    <>
                                        <a href="https://bcra.gob.ar/Catalogo/apis.asp" className="hover:underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">BCRA</a>
                                        {' '}·{' '}
                                        <a href="https://argentinadatos.com/" className="hover:underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">ArgentinaDatos API</a>
                                    </>
                                )}
                            </p>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
