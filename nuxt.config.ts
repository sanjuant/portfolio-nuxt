// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import type { PluginOption } from "vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  css: ['~/assets/css/swiperjs.css', '~/assets/css/tailwind.css'],

  runtimeConfig: {
      public: {
          strapiUrl: 'https://strapi.sanjuant.fr',
      },
  },

  vite: {
      plugins: tailwindcss() as unknown as PluginOption[],
  },

  build: {
      transpile: ['@heroicons/vue'],
  },

})