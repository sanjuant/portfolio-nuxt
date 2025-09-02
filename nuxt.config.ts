// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import type { PluginOption } from "vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  ssr: false,
  css: ['~/assets/css/swiperjs.css', '~/assets/css/tailwind.css'],

  runtimeConfig: {
      public: {
          strapiUrl: '/api',
          strapiApiToken: process.env.NUXT_PUBLIC_STRAPI_API_TOKEN,
      }
  },

    nitro: {
        devProxy: {
            '/api': { 
                target: 'http://localhost:1337/api',
                changeOrigin: true
            }
        }
    },

  vite: {
      plugins: tailwindcss() as unknown as PluginOption[],
  },

  build: {
      transpile: ['@heroicons/vue'],
  },

})