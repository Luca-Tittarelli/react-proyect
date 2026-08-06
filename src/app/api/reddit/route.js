import { NextResponse } from 'next/server';

// Cache en memoria del access token de Reddit (válido 1h)
let tokenCache = { token: null, expiresAt: 0 };

async function getRedditToken() {
    const now = Date.now();
    // Reutilizar token si todavía es válido (con 60s de margen)
    if (tokenCache.token && tokenCache.expiresAt > now + 60_000) {
        return tokenCache.token;
    }

    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('REDDIT_CLIENT_ID y REDDIT_CLIENT_SECRET no están configuradas en .env.local');
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const res = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'infopeso-bot/1.0.0 (by /u/infopeso)'
        },
        body: 'grant_type=client_credentials'
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Error al obtener token de Reddit: HTTP ${res.status} - ${body}`);
    }

    const data = await res.json();
    tokenCache = {
        token: data.access_token,
        expiresAt: now + data.expires_in * 1000
    };

    return tokenCache.token;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const sub = searchParams.get('sub') || 'merval';

    if (!query) {
        return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    try {
        const token = await getRedditToken();

        const url = `https://oauth.reddit.com/r/${sub}/search?q=${encodeURIComponent(query)}&restrict_sr=on&sort=new&limit=8&t=month`;

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'infopeso-bot/1.0.0 (by /u/infopeso)'
            },
            next: { revalidate: 120 } // Cachear respuesta en Next.js por 2 minutos
        });

        if (!res.ok) {
            const body = await res.text();
            console.error(`Reddit OAuth API error: ${res.status}`, body);
            return NextResponse.json({ error: `Reddit API returned status ${res.status}` }, { status: res.status });
        }

        const data = await res.json();

        if (!data.data || !data.data.children) {
            return NextResponse.json({ posts: [] });
        }

        const posts = data.data.children.map(child => {
            const p = child.data;

            let timeStr = '';
            if (p.created_utc) {
                const date = new Date(p.created_utc * 1000);
                const diff = Math.floor((Date.now() - date.getTime()) / 1000);
                if (diff < 60) timeStr = 'ahora';
                else if (diff < 3600) timeStr = `hace ${Math.floor(diff / 60)}m`;
                else if (diff < 86400) timeStr = `hace ${Math.floor(diff / 3600)}h`;
                else timeStr = `hace ${Math.floor(diff / 86400)}d`;
            }

            return {
                id: p.id,
                title: p.title,
                text: p.selftext ? p.selftext.slice(0, 1000) : '',
                author: p.author || 'anónimo',
                url: `https://www.reddit.com${p.permalink}`,
                ups: p.ups || 0,
                numComments: p.num_comments || 0,
                timeAgo: timeStr,
                subreddit: p.subreddit
            };
        });

        return NextResponse.json({ posts });
    } catch (e) {
        console.error("Error en Reddit API route:", e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
