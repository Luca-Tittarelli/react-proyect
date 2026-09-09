import { dolarAPI } from '@/apis';

async function getDolares() {
    try {
        const res = await fetch(dolarAPI, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

export default async function MultiDolarWidgetPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const isLight = resolvedParams?.theme === 'light';
    const dolares = await getDolares();

    const bg = isLight ? '#FFFFFF' : '#141412';
    const cardBg = isLight ? '#F7F7F5' : '#1C1C19';
    const textPrimary = isLight ? '#111110' : '#EDEDEC';
    const textSecondary = isLight ? '#666664' : '#9E9E9C';
    const border = isLight ? '#E5E5E3' : '#2A2A26';
    const accent = '#C47B2B';

    const list = [
        { name: 'Dólar Blue', key: 'blue' },
        { name: 'Dólar Oficial', key: 'oficial' },
        { name: 'Dólar MEP', key: 'bolsa' },
        { name: 'Dólar CCL', key: 'contadoconliqui' },
        { name: 'Dólar Tarjeta', key: 'tarjeta' },
    ];

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: textPrimary }}>Monitor de Divisas</span>
                    <span style={{ fontSize: '9px', background: 'rgba(196,123,43,0.15)', color: accent, padding: '2px 5px', borderRadius: '4px', fontWeight: '700' }}>EN VIVO</span>
                </div>
                <a 
                    href="https://infopeso.com.ar/Cambios" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: '11px', color: accent, textDecoration: 'none', fontWeight: '600' }}
                >
                    Infopeso ↗
                </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {list.map((item) => {
                    const data = dolares.find(d => d.casa === item.key);
                    return (
                        <div 
                            key={item.key} 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                background: cardBg, 
                                padding: '6px 10px', 
                                borderRadius: '8px', 
                                border: `1px solid ${border}` 
                            }}
                        >
                            <span style={{ fontSize: '12px', fontWeight: '600', color: textPrimary }}>{item.name}</span>
                            <div style={{ display: 'flex', gap: '12px', fontFamily: 'monospace', fontSize: '12px' }}>
                                <div>
                                    <span style={{ fontSize: '9px', color: textSecondary, marginRight: '3px' }}>C:</span>
                                    <span style={{ color: textSecondary, fontWeight: '700' }}>
                                        ${data?.compra ? data.compra.toLocaleString('es-AR') : '—'}
                                    </span>
                                </div>
                                <div>
                                    <span style={{ fontSize: '9px', color: textSecondary, marginRight: '3px' }}>V:</span>
                                    <span style={{ color: item.key === 'blue' ? accent : textPrimary, fontWeight: '800' }}>
                                        ${data?.venta ? data.venta.toLocaleString('es-AR') : '—'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '10px', color: textSecondary }}>
                <span>Actualización permanente</span>
                <a 
                    href="https://infopeso.com.ar" 
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
