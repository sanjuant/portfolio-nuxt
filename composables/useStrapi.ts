export function useStrapiApi<T = any>(path: string, opts: any = {}) {
  const config = useRuntimeConfig();
  const url = `${config.strapiUrl}/api${path.startsWith('/') ? '' : '/'}${path}`;

  return useFetch<T>(url, {
    key: `strapi-${path}`,
    headers: {
      ...(config.strapiApiToken && {
        Authorization: `Bearer ${config.strapiApiToken}`
      })
    },
    server: true,
    lazy: false, // Force l'attente côté serveur
    ...opts
  });
}