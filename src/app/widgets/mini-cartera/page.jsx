import { CATEGORIES } from '@/utils/carteraData';

export default async function MiniCarteraWidgetPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const isLight = resolvedParams?.theme === 'light';

    const bg = isLight ? '#FFFFFF' : '#141412';
    const cardBg = isLight ? '#F7F7F5' : '#1C1C19';
    const textPrimary = isLight ? '#111110' : '#EDEDEC';
    const textSecondary = isLight ? '#666664' : '#9E9E9C';
    const border = isLight ? '#E5E5E3' : '#2A2A26';
    const accent = '#C47B2B';

    // Featured assets for the mini portfolio widget
    const featuredSymbols = ['YPFD.BA', 'GGAL.BA', 'VIST', 'AAPL'];
    const allCompanies = CATEGORIES.flatMap(c => c.companies);
    const featured = featuredSymbols.map(sym => allCompanies.find(c => c.symbol === sym)).filter(Boolean);

    return (
        <div 
            style={{
                background: bg,
                color: textPrimary,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                padding: '14px',
                borderRadius: '12px',
                border: `1px solid ${border}`,
                boxSizing: 'border-box',
                userSelect: 'none'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: textPrimary }}>Tracker de Cartera</span>
                    <span style={{ fontSize: '9px', background: 'rgba(196,123,43,0.15)', color: accent, padding: '2px 5px', borderRadius: '4px', fontWeight: '700' }}>GRATIS</span>
                </div>
                <a 
                    href="https://infopeso.com.ar/Cartera" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: '11px', color: accent, textDecoration: 'none', fontWeight: '600' }}
                >
                    Armar Cartera ↗
                </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {featured.map((item) => (
                    <a
                        key={item.symbol}
                        href={`https://infopeso.com.ar/Empresas/${encodeURIComponent(item.symbol)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            background: cardBg, 
                            padding: '6px 10px', 
                            borderRadius: '8px', 
                            border: `1px solid ${border}`,
                            textDecoration: 'none'
                        }}
                    >
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: textPrimary }}>{item.name}</div>
                            <div style={{ fontSize: '10px', color: textSecondary }}>{item.sector}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11px', fontWeight: '800', color: accent, fontFamily: 'monospace' }}>
                                {item.symbol}
                            </div>
                            <div style={{ fontSize: '9px', color: textSecondary }}>Ver análisis →</div>
                        </div>
                    </a>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '10px', color: textSecondary }}>
                <span>Diagnósticos sin registro</span>
                <a 
                    href="https://infopeso.com.ar/Cartera" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: textSecondary, textDecoration: 'none' }}
                >
                    Por <strong style={{ color: textPrimary }}>Infopeso</strong>
                </a>
            </div>
        </div>
    );
}
