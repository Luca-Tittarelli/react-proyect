import { dolarAPI } from '@/apis';

async function getDolarBlue() {
    try {
        const res = await fetch(dolarAPI, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const data = await res.json();
        return data.find(item => item.casa === 'blue') || null;
    } catch {
        return null;
    }
}

export default async function DolarBlueWidgetPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const isLight = resolvedParams?.theme === 'light';
    const blue = await getDolarBlue();

    const bg = isLight ? '#FFFFFF' : '#141412';
    const cardBg = isLight ? '#F7F7F5' : '#1C1C19';
    const textPrimary = isLight ? '#111110' : '#EDEDEC';
    const textSecondary = isLight ? '#666664' : '#9E9E9C';
    const border = isLight ? '#E5E5E3' : '#2A2A26';
    const accent = '#C47B2B';

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
                    <span style={{ fontSize: '15px', fontWeight: '800', color: textPrimary }}>Dólar Blue</span>
                    <span style={{ fontSize: '10px', background: 'rgba(196,123,43,0.15)', color: accent, padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>EN VIVO</span>
                </div>
                <a 
                    href="https://infopeso.com.ar/Cambios/dolar-blue" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: '11px', color: accent, textDecoration: 'none', fontWeight: '600' }}
                >
                    Infopeso ↗
                </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: cardBg, padding: '8px 10px', borderRadius: '8px', border: `1px solid ${border}` }}>
                    <div style={{ fontSize: '10px', color: textSecondary, textTransform: 'uppercase', fontWeight: '700' }}>Compra</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: textPrimary, marginTop: '2px', fontFamily: 'monospace' }}>
                        ${blue?.compra ? blue.compra.toLocaleString('es-AR') : '—'}
                    </div>
                </div>
                <div style={{ background: cardBg, padding: '8px 10px', borderRadius: '8px', border: `1px solid ${border}` }}>
                    <div style={{ fontSize: '10px', color: textSecondary, textTransform: 'uppercase', fontWeight: '700' }}>Venta</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: accent, marginTop: '2px', fontFamily: 'monospace' }}>
                        ${blue?.venta ? blue.venta.toLocaleString('es-AR') : '—'}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '10px', color: textSecondary }}>
                <span>Actualizado hace instantes</span>
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
