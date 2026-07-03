import EmbedCodeBox from './WidgetsClient';

export const metadata = {
    title: 'Widgets Financieros Gratuitos para tu Web — Infopeso',
    description: 'Embebe cotizaciones del dólar en tiempo real en tu blog o sitio web de forma gratuita. Personalizable y fácil de integrar.',
    alternates: {
        canonical: 'https://infopeso.com.ar/widgets',
    }
};

const EMBED_CODE = `<iframe src="https://infopeso.com.ar/widgets/dolar" width="320" height="120" style="border:none; border-radius:12px; background:#171715;"></iframe>`;

export default function Page() {
    return (
        <main className="min-h-screen pt-24 pb-16 px-5 sm:px-8">
            <article className="max-w-[800px] mx-auto p-6 sm:p-8 rounded-xl space-y-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div>
                    <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                        Widgets Financieros
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Agrega cotizaciones en tiempo real del dólar (Blue y MEP) a tu propio blog, periódico digital o sitio web con un simple bloque de código de forma gratuita.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {/* Vista Previa */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                            Vista Previa del Widget
                        </h3>
                        <div className="flex justify-center p-6 rounded-lg" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-subtle)' }}>
                            <iframe 
                                src="/widgets/dolar" 
                                width="300" 
                                height="110" 
                                style={{ border: 'none', borderRadius: '12px', background: '#171715' }}
                            />
                        </div>
                    </div>

                    {/* Código a Copiar — Client Component handles onClick */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                            Código HTML a Copiar
                        </h3>
                        <EmbedCodeBox code={EMBED_CODE} />
                    </div>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                        Ventajas de nuestro Widget
                    </h3>
                    <ul className="text-xs space-y-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        <li>✓ <strong>100% Gratuito y Limpio:</strong> Sin anuncios ni scripts rastreadores invasivos de terceros.</li>
                        <li>✓ <strong>Actualización Automática:</strong> Los datos se actualizan directamente del Banco Central y mercado informal cada 60 segundos.</li>
                        <li>✓ <strong>Diseño Premium y Oscuro:</strong> Diseñado en glassmorphism oscuro para adaptarse elegantemente a cualquier sitio web.</li>
                        <li>✓ <strong>Carga Ultrarrápida:</strong> Optimizado a nivel de servidor, consumiendo prácticamente cero recursos de ancho de banda de tu sitio.</li>
                    </ul>
                </div>
            </article>
        </main>
    );
}
