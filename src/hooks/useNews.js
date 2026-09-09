import { useState, useEffect } from 'react';
import { fetchFinancialNews } from '../utils/newsFetcher';

export function useNews(initialNews = null) {
    const [news, setNews] = useState(initialNews || []);
    const [status, setStatus] = useState(initialNews?.length > 0 ? 'success' : 'loading');

    useEffect(() => {
        if (initialNews && initialNews.length > 0) return;
        let cancelled = false;
        
        setStatus('loading');
        fetchFinancialNews()
            .then(items => {
                if (!cancelled) {
                    setNews(items);
                    setStatus('success');
                }
            })
            .catch(() => {
                if (!cancelled) setStatus('error');
            });

        return () => { cancelled = true; };
    }, [initialNews]);

    return { news, status };
}

