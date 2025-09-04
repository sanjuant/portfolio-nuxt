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
      strapiApiToken: process.env.NUXT_STRAPI_API_TOKEN,
      public: {
          strapiUrl: '/api'
      }
  },

  vite: {
      plugins: tailwindcss() as unknown as PluginOption[],
  },

  build: {
      transpile: ['@heroicons/vue'],
  },

})