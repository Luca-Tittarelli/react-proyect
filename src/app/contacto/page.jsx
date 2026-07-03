export const metadata = {
    title: 'Contacto — Infopeso',
    description: 'Ponte en contacto con el equipo de Infopeso.',
    alternates: {
        canonical: 'https://infopeso.com.ar/contacto',
    }
};

export default function Page() {
    return (
        <main className="min-h-screen pt-24 pb-16 px-5 sm:px-8">
            <article className="max-w-[600px] mx-auto p-6 sm:p-8 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                    Contacto
                </h1>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    ¿Tenés sugerencias, consultas comerciales, feedback técnico o encontraste algún error en los datos? Nos encantaría escucharte. Podés ponerte en contacto con nosotros a través de nuestro canal oficial:
                </p>

                <div className="space-y-4">
                    <div className="p-4 rounded-lg" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-subtle)' }}>
                        <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>X / Twitter Oficial</h2>
                        <a href="https://x.com/infopeso" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                            @infopeso
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                        * Intentamos responder a todos los mensajes en un plazo de 24 a 48 horas hábiles. Infopeso es mantenido de forma voluntaria, por lo que agradecemos tu paciencia.
                    </p>
                </div>
            </article>
        </main>
    );
}
