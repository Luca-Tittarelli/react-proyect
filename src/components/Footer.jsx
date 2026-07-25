import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer
            className="mt-24"
            style={{
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
            }}
        >
            {/* ── Main footer grid ─────────────────────────── */}
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">

                {/* Col 1 — About */}
                <div>
                    <h3
                        className="text-sm font-semibold uppercase tracking-widest mb-4"
                        style={{ color: 'var(--text-tertiary)' }}
                    >
                        Acerca de
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Infopeso es una plataforma digital de datos financieros argentinos.
                        Centraliza información actualizada sobre el dólar, variables monetarias
                        del BCRA, inflación y mercados para facilitar la toma de decisiones.
                    </p>
                    <a
                        href="https://x.com/infopeso"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-medium transition-colors hover:underline"
                        style={{ color: 'var(--accent)' }}
                    >
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                        </svg>
                        Seguinos en X / Twitter
                    </a>
                </div>

                {/* Col 2 — Sources */}
                <div>
                    <h3
                        className="text-sm font-semibold uppercase tracking-widest mb-4"
                        style={{ color: 'var(--text-tertiary)' }}
                    >
                        Fuentes de datos
                    </h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { label: 'BCRA — Variables monetarias', href: 'https://bcra.gob.ar/Catalogo/apis.asp?fileName=principales-variables-v2&sectionName=Estad%EDsticas' },
                            { label: 'DolarAPI — Cotizaciones', href: 'https://dolarapi.com/' },
                            { label: 'ArgentinaDatos — Riesgo País', href: 'https://argentinadatos.com/' },
                            { label: 'TradingView — Mercados', href: 'https://tradingview.com/' },
                        ].map(({ label, href }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors hover:underline"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 3 — Support */}
                <div>
                    <h3
                        className="text-sm font-semibold uppercase tracking-widest mb-4"
                        style={{ color: 'var(--text-tertiary)' }}
                    >
                        Apoyar el proyecto
                    </h3>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Infopeso es un proyecto independiente sin fines de lucro.
                        Si te resulta útil, podés invitarnos un cafecito.
                    </p>
                    <a
                        href="https://cafecito.app/ucode-wd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                        style={{
                            background: 'var(--bg-surface-hover)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <img src="https://cdn.cafecito.app/imgs/cafecito_logo.svg" alt="Cafecito" className="h-5" />
                        Invitar un cafecito
                    </a>
                </div>
            </div>

            {/* ── SEO Links Grid — Internal Linking for Indexation ──────── */}
            <div className="border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
                    <div>
                        <h4 className="font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                            Divisas y Dólar
                        </h4>
                        <ul className="space-y-1.5">
                            <li><Link href="/Cambios/dolar-blue" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Dólar Blue Hoy</Link></li>
                            <li><Link href="/Cambios/dolar-oficial" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Dólar Oficial BNA</Link></li>
                            <li><Link href="/Cambios/dolar-mep" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Dólar MEP (Bolsa)</Link></li>
                            <li><Link href="/Cambios/dolar-ccl" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Dólar CCL (Contado con Liqui)</Link></li>
                            <li><Link href="/Cambios/dolar-tarjeta" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Dólar Tarjeta / Turista</Link></li>
                            <li><Link href="/Cambios/euro" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Euro Oficial</Link></li>
                            <li><Link href="/Cambios/real" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Real Brasileño</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                            Macroeconomía (BCRA / INDEC)
                        </h4>
                        <ul className="space-y-1.5">
                            <li><Link href="/Economia/riesgo-pais" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Riesgo País Argentina</Link></li>
                            <li><Link href="/Economia/27" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Inflación Mensual INDEC</Link></li>
                            <li><Link href="/Economia/1" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Reservas Internacionales BCRA</Link></li>
                            <li><Link href="/Economia/15" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Base Monetaria</Link></li>
                            <li><Link href="/Economia/160" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Tasa de Política Monetaria</Link></li>
                            <li><Link href="/Economia/32" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Coeficiente CER</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                            Mercados y Renta Fija
                        </h4>
                        <ul className="space-y-1.5">
                            <li><Link href="/RentaFija/al30" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Bono AL30 (Bonaar 2030)</Link></li>
                            <li><Link href="/RentaFija/gd30" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Bono GD30 (Global 2030)</Link></li>
                            <li><Link href="/Mercado" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Mercado Financiero</Link></li>
                            <li><Link href="/Empresas" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Acciones y CEDEARs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                            Calculadoras y pSEO
                        </h4>
                        <ul className="space-y-1.5">
                            <li><Link href="/Cambios/calculadora-pesos-a-dolar-blue" className="hover:underline" style={{ color: 'var(--accent)' }}>Calculadora Dólar Blue</Link></li>
                            <li><Link href="/Cambios/calculadora-dolar-tarjeta" className="hover:underline" style={{ color: 'var(--accent)' }}>Calculadora Dólar Tarjeta</Link></li>
                            <li><Link href="/" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Inicio — Dashboard</Link></li>
                            <li><Link href="/Cambios" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Hub de Divisas</Link></li>
                            <li><Link href="/Economia" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Hub de Macroeconomía</Link></li>
                            <li><Link href="/RentaFija" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Hub de Renta Fija</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── Bottom bar ───────────────────────────────── */}
            <div
                className="border-t"
                style={{ borderColor: 'var(--border-subtle)' }}
            >
                <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
                    style={{ color: 'var(--text-tertiary)' }}>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <p>© {currentYear} Infopeso. Todos los derechos reservados.</p>
                        <div className="flex gap-3">
                            <Link href="/privacidad" className="hover:underline">Privacidad</Link>
                            <span>·</span>
                            <Link href="/terminos" className="hover:underline">Términos</Link>
                            <span>·</span>
                            <Link href="/contacto" className="hover:underline">Contacto</Link>
                        </div>
                    </div>
                    <p className="text-center sm:text-right max-w-sm">
                        El contenido de esta página es exclusivamente informativo y no constituye asesoramiento financiero.
                    </p>
                </div>
            </div>
        </footer>
    );
}