import { dolarAPI } from '@/apis';

async function getDolarData() {
    try {
        const res = await fetch(dolarAPI, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'Widget Dólar Hoy — Infopeso',
    robots: { index: false, follow: false } // No index, it's just for embed
};

export default async function Page() {
    const data = await getDolarData();
    const blue = data.find(item => item.casa === 'blue');
    const mep = data.find(item => item.casa === 'mep');

    return (
        <html lang="es">
            <head>
                <style>{`
                    :root {
                        --bg: #171715;
                        --border: #262623;
                        --text: #F5F4F0;
                        --text-sec: #9C9A94;
                        --accent: #E8942B;
                        --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    body {
                        margin: 0;
                        padding: 12px;
                        background: var(--bg);
                        color: var(--text);
                        font-family: var(--font);
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: calc(100vh - 24px);
                        box-sizing: border-box;
                        border: 1px solid var(--border);
                        border-radius: 12px;
                        overflow: hidden;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid var(--border);
                        padding-bottom: 6px;
                        margin-bottom: 8px;
                    }
                    .title {
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing: 0.1em;
                        color: var(--text-sec);
                        font-weight: 700;
                    }
                    .logo {
                        font-size: 11px;
                        font-weight: bold;
                        color: var(--accent);
                        text-decoration: none;
                    }
                    .row {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        flex-grow: 1;
                    }
                    .item {
                        text-align: center;
                    }
                    .label {
                        font-size: 10px;
                        color: var(--text-sec);
                        margin-bottom: 2px;
                    }
                    .value {
                        font-size: 18px;
                        font-weight: bold;
                        font-family: monospace;
                    }
                `}</style>
            </head>
            <body>
                <div className="header">
                    <span className="title">Cotizaciones Hoy</span>
                    <a href="https://infopeso.com.ar" target="_blank" rel="noopener noreferrer" className="logo">
                        Infopeso
                    </a>
                </div>
                <div className="row">
                    <div className="item">
                        <div className="label">Dólar Blue</div>
                        <div className="value">${blue ? blue.venta : '—'}</div>
                    </div>
                    <div className="item">
                        <div className="label">Dólar MEP</div>
                        <div className="value">${mep ? mep.venta : '—'}</div>
                    </div>
                </div>
            </body>
        </html>
    );
}
