import { useState } from 'react';
import { useNews } from '../../hooks/useNews';

const CATEGORIES = [
    { id: 'all', label: 'Todas' },
    { id: 'Tipo de Cambio', label: 'Tipo de Cambio' },
    { id: 'Inflación', label: 'Inflación' },
    { id: 'Política Monetaria', label: 'Política Monetaria' },
    { id: 'Deuda & Bonos', label: 'Deuda & Bonos' },
    { id: 'Mercado', label: 'Mercado' },
    { id: 'Regulaciones', label: 'Regulaciones' },
];

function NewsCardSkeleton() {
    return (
        <div className="p-4 rounded-xl animate-pulse" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex justify-between items-center mb-3">
                <div className="h-3 w-20 rounded" style={{ background: 'var(--bg-surface-hover)' }} />
                <div className="h-3 w-12 rounded" style={{ background: 'var(--bg-surface-hover)' }} />
            </div>
            <div className="space-y-2">
                <div className="h-4 w-full rounded" style={{ background: 'var(--bg-surface-hover)' }} />
                <div className="h-4 w-4/5 rounded" style={{ background: 'var(--bg-surface-hover)' }} />
                <div className="h-4 w-3/5 rounded" style={{ background: 'var(--bg-surface-hover)' }} />
            </div>
            <div className="mt-4 h-5 w-24 rounded-full" style={{ background: 'var(--bg-surface-hover)' }} />
        </div>
    );
}

function NewsCard({ item }) {
    return (
        <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-4 rounded-xl transition-all duration-200 active:scale-[0.99]"
            style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
                minHeight: '140px',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-surface-hover)';
                e.currentTarget.style.borderColor = item.category.color + '44';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-surface)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
        >
            {/* Header: source + time */}
            <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-medium truncate max-w-[60%]" style={{ color: 'var(--text-tertiary)' }}>
                    {item.source}
                </span>
                <span className="text-[11px] tabular-nums flex-shrink-0" style={{ color: 'var(--text-tertiary)' }}>
                    {item.timeAgo}
                </span>
            </div>

            {/* Title */}
            <h3
                className="text-sm font-semibold leading-snug mb-auto line-clamp-3"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}
            >
                {item.title}
            </h3>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
                <span
                    className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: item.category.bg, color: item.category.color }}
                >
                    {item.category.label}
                </span>
                <span
                    className="text-[11px] font-medium group-hover:translate-x-1 transition-transform duration-200"
                    style={{ color: 'var(--accent)' }}
                >
                    Leer →
                </span>
            </div>
        </a>
    );
}

export function NewsFeed({ initialNews = null }) {
    const { news, status } = useNews(initialNews);
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = activeCategory === 'all'
        ? news
        : news.filter(n => n.category.label === activeCategory);

    return (
        <section className="px-5 sm:px-8 py-8 mt-2">
            <div className="max-w-[1400px] mx-auto">

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div>
                        <p
                            className="text-xs font-semibold uppercase tracking-[0.12em] mb-1"
                            style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}
                        >
                            Google News · Últimas 72hs
                        </p>
                        <h2
                            className="text-xl sm:text-2xl font-bold tracking-tight"
                            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                        >
                            Noticias que mueven el mercado
                        </h2>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className="text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95"
                                style={{
                                    background: activeCategory === cat.id ? 'var(--accent)' : 'var(--bg-surface)',
                                    color: activeCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                                    border: activeCategory === cat.id ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading skeleton */}
                {status === 'loading' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <NewsCardSkeleton key={i} />)}
                    </div>
                )}

                {/* Error state */}
                {status === 'error' && (
                    <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                        <p className="text-2xl mb-2">⚠️</p>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>No se pudo cargar las noticias</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Revisá tu conexión o intentá más tarde</p>
                    </div>
                )}

                {/* Empty state */}
                {status === 'success' && filtered.length === 0 && (
                    <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                        <p className="text-2xl mb-2">📭</p>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            Sin noticias recientes en esta categoría
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                            Solo mostramos noticias de los últimos 3 días
                        </p>
                    </div>
                )}

                {/* News grid */}
                {status === 'success' && filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filtered.map((item, i) => (
                            <NewsCard key={item.id || i} item={item} />
                        ))}
                    </div>
                )}

                {/* Disclaimer */}
                <p className="text-[10px] text-center mt-6" style={{ color: 'var(--text-tertiary)' }}>
                    Noticias curadas automáticamente por palabras clave financieras. Solo se muestran artículos de los últimos 3 días.
                    <br />
                    Infopeso no es autor ni afiliado de ningún medio. Hacé clic en "Leer →" para ir a la fuente original.
                </p>
            </div>
        </section>
    );
}
