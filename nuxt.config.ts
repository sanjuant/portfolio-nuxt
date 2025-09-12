// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import type {PluginOption} from "vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    ssr: true,
    css: ['~/assets/css/swiperjs.css', '~/assets/css/tailwind.css'],

    runtimeConfig: {
        strapiUrl: process.env.NUXT_STRAPI_URL || 'http://portfolio-strapi:1337',
        strapiApiToken: process.env.NUXT_STRAPI_API_TOKEN || '',
        public: {
            strapiUrl: '/api',
        }
    },

    vite: {
        plugins: tailwindcss() as unknown as PluginOption[],
    },

    build: {
        transpile: ['@heroicons/vue'],
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Thibaut SANJUAN',
            meta: [
                {
                    name: 'description',
                    content:
                        'Je suis ingénieur en Cybersécurité avec une forte expérience en développement.',
                },
                {
                    name: 'apple-mobile-web-app-title',
                    content: 'Thibaut SANJUAN - Portfolio',
                },
                {name: 'application-name', content: 'Thibaut SANJUAN - Portfolio'},
                {name: 'msapplication-TileColor', content: '#da532c'},
                {name: 'theme-color', content: '#ffffff'},
            ],
            link: [
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-touch-icon.png',
                },
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico'
                },
                {rel: 'manifest', href: '/site.webmanifest'},
                {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
            ],
        },
    },
})