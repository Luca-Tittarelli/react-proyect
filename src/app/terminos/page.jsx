export const metadata = {
    title: 'Términos de Servicio — Infopeso',
    description: 'Términos y condiciones de uso de la plataforma Infopeso.',
    alternates: {
        canonical: 'https://infopeso.com.ar/terminos',
    }
};

export default function Page() {
    return (
        <main className="min-h-screen pt-24 pb-16 px-5 sm:px-8">
            <article className="max-w-[800px] mx-auto p-6 sm:p-8 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                    Términos de Servicio
                </h1>
                
                <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <p>
                        Última actualización: 22 de junio de 2026.
                    </p>
                    
                    <h2 className="text-base font-bold pt-2" style={{ color: 'var(--text-primary)' }}>1. Aceptación de los Términos</h2>
                    <p>
                        Al acceder y utilizar el sitio web <strong>https://infopeso.com.ar</strong> (en adelante, "Infopeso"), aceptas quedar vinculado por estos Términos de Servicio, todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de las leyes locales aplicables. Si no estás de acuerdo con alguno de estos términos, tienes prohibido utilizar o acceder a este sitio.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>2. Exclusión de Responsabilidad (Disclaimer)</h2>
                    <p>
                        Los materiales y la información en Infopeso se proporcionan "tal cual". Infopeso no ofrece garantías, explícitas o implícitas, y por la presente descarta y niega todas las demás garantías, incluyendo, sin limitación, las garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular o no infracción de propiedad intelectual u otra violación de derechos.
                    </p>
                    <p style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
                        IMPORTANTE: El contenido y las herramientas de Infopeso son exclusivamente informativos y educativos. No constituyen asesoramiento financiero, recomendaciones de inversión, ofertas de compra/venta de activos, ni consultoría profesional de ningún tipo. Consulta siempre con un asesor financiero matriculado antes de tomar cualquier decisión de inversión.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>3. Fuentes de Datos y Exactitud</h2>
                    <p>
                        Infopeso recopila información financiera pública en tiempo real de diversas fuentes externas (como el Banco Central de la República Argentina, DolarAPI, ArgentinaDatos, TradingView, entre otros). A pesar de nuestros mejores esfuerzos por mantener la información actualizada y libre de errores, no garantizamos la exactitud, integridad o puntualidad de los datos mostrados. Infopeso no se responsabiliza por pérdidas o daños económicos resultantes del uso de la información del sitio.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>4. Limitaciones de Responsabilidad</h2>
                    <p>
                        En ningún caso Infopeso o sus desarrolladores serán responsables de cualquier daño (incluidos, sin limitación, daños por pérdida de datos o beneficios, o debido a la interrupción de la actividad comercial) que surja del uso o de la imposibilidad de usar los materiales en Infopeso, incluso si Infopeso ha sido notificado de la posibilidad de tales daños.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>5. Modificaciones de los Términos</h2>
                    <p>
                        Infopeso puede revisar estos Términos de Servicio en cualquier momento sin previo aviso. Al utilizar este sitio web, aceptas quedar vinculado por la versión vigente de estos Términos de Servicio.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>6. Ley Aplicable</h2>
                    <p>
                        Cualquier reclamación relacionada con Infopeso se regirá por las leyes de la República Argentina, sin consideración a sus disposiciones sobre conflictos de leyes.
                    </p>
                </div>
            </article>
        </main>
    );
}
