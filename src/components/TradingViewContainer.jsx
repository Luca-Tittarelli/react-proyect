'use client';

import { useTheme } from '@/hooks/useTheme';

/**
 * Wrapper component for TradingView widgets that ensures:
 * 1. Synchronous matching with the site's active theme (dark / light).
 * 2. Widgets only mount after client hydration to prevent race conditions or loading wrong themes.
 * 3. Fresh recreation on theme toggle via key={theme}, tearing down any previous iframes cleanly.
 * 4. Proper background styling (var(--bg-surface)) for seamless transparency.
 * 5. Elegant loading skeleton during theme transitions and initial render.
 */
export function TradingViewContainer({ children, height, minHeight, className = '', style = {} }) {
    const [theme, , mounted] = useTheme();

    return (
        <div
            className={`w-full relative overflow-hidden transition-colors duration-200 ${className}`}
            style={{
                height,
                minHeight: minHeight || height,
                background: 'var(--bg-surface)',
                ...style,
            }}
        >
            {mounted ? (
                <div key={theme} className="w-full h-full">
                    {typeof children === 'function' ? children(theme) : children}
                </div>
            ) : (
                <div
                    className="w-full h-full flex items-center justify-center animate-pulse"
                    style={{ minHeight: minHeight || height || '120px', background: 'var(--bg-surface)' }}
                >
                    <div
                        className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin opacity-40"
                        style={{ borderColor: 'var(--border-strong)', borderTopColor: 'var(--accent)' }}
                    />
                </div>
            )}
        </div>
    );
}

export default TradingViewContainer;
