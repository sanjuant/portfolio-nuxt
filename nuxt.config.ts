// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import type { PluginOption } from "vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  ssr: true,
  css: ['~/assets/css/swiperjs.css', '~/assets/css/tailwind.css'],

  runtimeConfig: {
      strapiUrl: process.env.NUXT_STRAPI_URL || 'http://localhost:1337',
      strapiApiToken: process.env.NUXT_STRAPI_API_TOKEN || '',
      public: {
          strapiUrl: 'https://strapi-new.sanjuant.fr',
          strapiApiToken: '00c24e5f8aa37e25105630bdd119d25065b9c62d4b56a3c5eace6d03a12fc74da74b9606dc3342a413f973369834a84324f063a3458d6b13bc3f11e64eef1c0c0eae63e6732842c6739f517313549c5571b9f7aec38f839f61d81eb13c24f9e84592d64a9eeaa0afce647b5dfa734c6b7dbcbf7f1236db8e2368d967df4cd111'
      }
  },

  vite: {
      plugins: tailwindcss() as unknown as PluginOption[],
  },

  build: {
      transpile: ['@heroicons/vue'],
  },

})