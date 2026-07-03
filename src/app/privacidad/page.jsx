export const metadata = {
    title: 'Política de Privacidad — Infopeso',
    description: 'Conoce cómo recopilamos, utilizamos y protegemos tu información en Infopeso.',
    alternates: {
        canonical: 'https://infopeso.com.ar/privacidad',
    }
};

export default function Page() {
    return (
        <main className="min-h-screen pt-24 pb-16 px-5 sm:px-8">
            <article className="max-w-[800px] mx-auto p-6 sm:p-8 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                    Política de Privacidad
                </h1>
                
                <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <p>
                        Última actualización: 22 de junio de 2026.
                    </p>
                    
                    <p>
                        En Infopeso, accesible desde <strong>https://infopeso.com.ar</strong>, una de nuestras prioridades principales es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene tipos de información que son recopilados y registrados por Infopeso y cómo los utilizamos.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>1. Archivos de Registro (Log Files)</h2>
                    <p>
                        Infopeso sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. La información recopilada por los archivos de registro incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), marca de fecha y hora, páginas de referencia/salida y posiblemente el número de clics. Estos datos no están vinculados a ninguna información que sea personalmente identificable. El propósito de la información es analizar tendencias, administrar el sitio, rastrear el movimiento de los usuarios en el sitio web y recopilar información demográfica.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>2. Cookies y Web Beacons</h2>
                    <p>
                        Como cualquier otro sitio web, Infopeso utiliza "cookies". Estas cookies se utilizan para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web a las que el visitante accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios al personalizar el contenido de nuestra página web en función del tipo de navegador de los visitantes y/u otra información.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>3. Cookie DoubleClick de Google DART</h2>
                    <p>
                        Google es uno de los proveedores externos en nuestro sitio. También utiliza cookies, conocidas como cookies de DART, para publicar anuncios a los visitantes de nuestro sitio en función de su visita a www.website.com y otros sitios en Internet. Sin embargo, los visitantes pueden optar por rechazar el uso de cookies de DART visitando la Política de Privacidad de la red de contenido y anuncios de Google en la siguiente URL: <a href="https://policies.google.com/technologies/ads" className="underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>4. Nuestros Socios Publicitarios</h2>
                    <p>
                        Algunos de los anunciantes en nuestro sitio pueden utilizar cookies y web beacons. Nuestro socio publicitario principal es <strong>Google AdSense</strong>. Cada uno de nuestros socios publicitarios tiene su propia Política de Privacidad para sus políticas sobre datos de usuarios.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>5. Enlaces de Terceros</h2>
                    <p>
                        Las políticas de privacidad de Infopeso no se aplican a otros anunciantes o sitios web. Por lo tanto, te aconsejamos que consultes las respectivas Políticas de Privacidad de estos servidores de anuncios de terceros para obtener información más detallada. Puede incluir sus prácticas e instrucciones sobre cómo optar por no participar en ciertas opciones.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>6. Consentimiento</h2>
                    <p>
                        Al utilizar nuestro sitio web, aceptas nuestra Política de Privacidad y estás de acuerdo con sus Términos y Condiciones.
                    </p>

                    <h2 className="text-base font-bold pt-4" style={{ color: 'var(--text-primary)' }}>7. Contacto</h2>
                    <p>
                        Si tenés preguntas adicionales o requerís más información sobre nuestra Política de Privacidad, no dudes en ponerte en contacto con nosotros a través de nuestra cuenta de X en <a href="https://x.com/infopeso" className="underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">@infopeso</a>.
                    </p>
                </div>
            </article>
        </main>
    );
}
