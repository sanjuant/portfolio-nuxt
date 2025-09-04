// server/api/strapi/[...path].ts
import { defineEventHandler, proxyRequest, getQuery, readBody, getRequestHeaders } from 'h3';

export default defineEventHandler(async (event) => {
    const { strapiUrl, strapiApiToken } = useRuntimeConfig();

    const segments = ([] as string[]).concat(event.context.params?.path ?? [])
    const target = new URL(
        '/api/' + segments.join('/'),
        strapiUrl.endsWith('/') ? strapiUrl : strapiUrl + '/'
    );

    // Transfert intégral de la query (pLevel, populate, filters, etc.)
    const q = getQuery(event);
    for (const [k, v] of Object.entries(q)) {
        if (Array.isArray(v)) v.forEach(val => target.searchParams.append(k, String(val)));
        else if (v != null) target.searchParams.set(k, String(v));
    }

    // Méthode
    const method = (event.node.req.method || 'GET').toUpperCase();

    // Re-construit des Headers valides (HeadersInit)
    const incoming = getRequestHeaders(event); // Record<string, string | undefined>
    const headers = new Headers();
    for (const [k, v] of Object.entries(incoming)) {
        if (!v) continue;
        // on peut filtrer certains headers si besoin (ex: cookie)
        if (k.toLowerCase() === 'cookie') continue;
        headers.set(k, v);
    }
    
    // Ajouter le token d'authentification s'il existe
    if (strapiApiToken) {
        headers.set('authorization', `Bearer ${strapiApiToken}`);
    }

    // Body si nécessaire
    let body: any = undefined;
    if (method !== 'GET' && method !== 'HEAD') {
        body = await readBody(event);
        headers.set('content-type', 'application/json');
    }
    
    // Proxy (Headers est maintenant du bon type)
    return proxyRequest(event, target.toString(), {
        headers,
        fetchOptions: body ? { method, body: JSON.stringify(body) } : { method }
    });
});
