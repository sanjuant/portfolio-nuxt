export const useStrapiApi = (endpoint: string, options = {}) => {
  const config = useRuntimeConfig()

  return useFetch(endpoint, {
    baseURL: config.public.strapiUrl,
    headers: {
      ...(config.public.strapiApiToken && {
        Authorization: `Bearer ${config.public.strapiApiToken}`
      })
    },
    server: false,
    ...options
  })
}