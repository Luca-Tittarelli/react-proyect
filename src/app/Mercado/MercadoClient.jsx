'use client';

import { TickerTape, MarketOverview } from "react-ts-tradingview-widgets";
import { useTheme } from '@/hooks/useTheme';
import { TradingViewContainer } from '@/components/TradingViewContainer';

export default function MercadoClient() {
    const [theme] = useTheme();

    return (
        <main className="min-h-screen pt-16">
            <div className="px-5 sm:px-8 py-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="max-w-[1200px] mx-auto">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-1"
                        style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                        TradingView · Tiempo real
                    </p>
                    <h1 className="text-3xl sm:text-4xl leading-tight"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                        Mercados financieros
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                        Merval, acciones, internacionales, cripto y commodities estratégicos
                    </p>
                </div>
            </div>

            <section className="px-5 sm:px-8 py-8">
                <div className="max-w-[1200px] mx-auto space-y-8">
                    <div
                        className="rounded-[12px] overflow-hidden pointer-events-none"
                        style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                    >
                        <TradingViewContainer minHeight="46px">
                            {(activeTheme) => (
                                <TickerTape
                                    colorTheme={activeTheme}
                                    isTransparent={true}
                                    displayMode="regular"
                                    locale="es"
                                    showSymbolLogo={true}
                                    symbols={[
                                        { description: "S&P 500", proName: "SP:SPX" },
                                        { description: "MERVAL", proName: "BCBA:IMV" },
                                        { description: "Bitcoin", proName: "BINANCE:BTCUSDT" },
                                        { description: "Soja", proName: "CAPITALCOM:SOYBEAN" },
                                        { description: "Maíz", proName: "CAPITALCOM:CORN" },
                                        { description: "Petróleo WTI", proName: "TVC:USOIL" },
                                        { description: "Oro", proName: "OANDA:XAUUSD" },
                                        { description: "Cobre", proName: "OANDA:XCUUSD" },
                                    ]}
                                />
                            )}
                        </TradingViewContainer>
                    </div>

                    <div
                        className="rounded-[12px] overflow-hidden"
                        style={{
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-surface)',
                            height: '720px',
                        }}
                    >
                        <TradingViewContainer height="720px">
                            {(activeTheme) => (
                                <MarketOverview
                                    colorTheme={activeTheme}
                                    isTransparent={true}
                                    height="100%"
                                    width="100%"
                                    showFloatingTooltip
                                    dateRange="12M"
                                    locale="es"
                            tabs={[
                                {
                                    title: "Mercado Argentino",
                                    symbols: [
                                        { s: "BCBA:IMV", d: "S&P Merval" },
                                        { s: "BCBA:GGAL", d: "Grupo Financiero Galicia" },
                                        { s: "BCBA:YPFD", d: "YPF S.A." },
                                        { s: "BCBA:PAMP", d: "Pampa Energía" },
                                        { s: "BCBA:BMA", d: "Banco Macro" },
                                        { s: "BCBA:CEPU", d: "Central Puerto" },
                                        { s: "BCBA:TXAR", d: "Ternium Argentina" },
                                        { s: "BCBA:ALUA", d: "Aluar" },
                                        { s: "BCBA:COME", d: "Soc. Comercial del Plata" },
                                        { s: "BCBA:TECO2", d: "Telecom Argentina" },
                                    ],
                                },
                                {
                                    title: "Internacional",
                                    symbols: [
                                        { s: "AMEX:SPY", d: "SPDR S&P 500 ETF" },
                                        { s: "NASDAQ:QQQ", d: "Invesco QQQ Trust" },
                                        { s: "NASDAQ:AAPL", d: "Apple Inc." },
                                        { s: "NASDAQ:MSFT", d: "Microsoft Corp." },
                                        { s: "NASDAQ:NVDA", d: "NVIDIA Corp." },
                                        { s: "NASDAQ:TSLA", d: "Tesla Inc." },
                                        { s: "NASDAQ:AMZN", d: "Amazon.com" },
                                        { s: "NASDAQ:META", d: "Meta Platforms" },
                                        { s: "NASDAQ:GOOGL", d: "Alphabet Inc." },
                                        { s: "NYSE:BRK.B", d: "Berkshire Hathaway" },
                                    ],
                                },
                                {
                                    title: "Commodities",
                                    symbols: [
                                        { s: "CAPITALCOM:SOYBEAN", d: "🌱 Soja" },
                                        { s: "CAPITALCOM:CORN", d: "🌽 Maíz" },
                                        { s: "CAPITALCOM:WHEAT", d: "🌾 Trigo" },
                                        { s: "TVC:USOIL", d: "🛢 Petróleo WTI" },
                                        { s: "TVC:UKOIL", d: "🛢 Petróleo Brent" },
                                        { s: "CAPITALCOM:NATURALGAS", d: "⚡ Gas Natural" },
                                        { s: "OANDA:XAUUSD", d: "🥇 Oro" },
                                        { s: "OANDA:XAGUSD", d: "🥈 Plata" },
                                        { s: "OANDA:XCUUSD", d: "🔶 Cobre" },
                                    ],
                                },
                                {
                                    title: "Criptomonedas",
                                    symbols: [
                                        { s: "BINANCE:BTCUSDT", d: "Bitcoin" },
                                        { s: "BINANCE:ETHUSDT", d: "Ethereum" },
                                        { s: "BINANCE:SOLUSDT", d: "Solana" },
                                        { s: "BINANCE:BNBUSDT", d: "BNB" },
                                        { s: "BINANCE:ADAUSDT", d: "Cardano" },
                                        { s: "BINANCE:XRPUSDT", d: "Ripple" },
                                        { s: "BINANCE:DOGEUSDT", d: "Dogecoin" },
                                        { s: "BINANCE:AVAXUSDT", d: "Avalanche" },
                                        { s: "BINANCE:LINKUSDT", d: "Chainlink" },
                                        { s: "BINANCE:DOTUSDT", d: "Polkadot" },
                                    ],
                                },
                            ]}
                        />
                    )}
                        </TradingViewContainer>
                    </div>

                    <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
                        Datos de mercado provistos en tiempo real vía{' '}
                        <a
                            href="https://tradingview.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            style={{ color: 'var(--accent)' }}
                        >
                            TradingView
                        </a>
                        . El contenido es exclusivamente informativo.
                    </p>
                </div>
            </section>
        </main>
    );
}
