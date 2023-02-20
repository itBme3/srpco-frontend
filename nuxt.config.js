import { collectionTypes } from './models/entry.model';
import 'dotenv/config'

const apiUrl = process.env.API_URL;
const captchaKey = process.env.CAPTCHA_KEY;
const ga4 = process.env.NODE_ENV === 'production' && process.env.GA_ENV !== 'dev' ? process.env.GA : process.env.GA_DEV;
const gaU = process.env.GAU;

export default {

  head: {
    title: 'SRPCO',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image', href: '/favicon.png' },
    ],
    script: [
      { src: `https://www.google.com/recaptcha/api.js?render=${captchaKey}` }
    ]
  },

  server: {
    port: '3001'
  },
  components: true,
  ssr: true,
  target: 'static',
  css: [
    '~/assets/styles/style.scss'
  ],
  tailwindCss: {
    cssPath: '~/assets/tailwind/tailwind.css',
    exposeConfig: true,
    injectPosition: 0,
    config: {

      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/typography'),
        require('tailwindcss/plugin')(function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            'text-shadow': (value) => ({
              textShadow: value
            })
          },
          { values: theme('textShadow') }
        )
      })
    ]
    }
  },
  plugins: [
    '~/plugins/check-view.js',
    '~/plugins/flickity.client.js',
    '~/plugins/scrollbar.js',
    '~/plugins/tailwind-components.js',
    '~/plugins/form-generator.js',
    '~/plugins/truncate.js',
    '~/plugins/gtag.js',
  ],
  

  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build',
    [
      '@nuxtjs/google-fonts',
      {
        display: 'swap',
        families: {
          'Source+Sans+Pro': {
            wght: [200,300,400,600,900],
            ital: [200,300,400,600,900],
          }
        },
      },
    ],
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
  ],

  modules: [
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage',
    '@nuxt/content',
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap',
    '@nuxtjs/markdownit'
  ],
  recaptcha: {
    language: 'en',   // Recaptcha language (v2)
    mode: 'base',       // Mode: 'base', 'enterprise'
    siteKey: captchaKey,    // Site key for requests
    version: 3,    // Version
    size: 'normal' // Size: 'compact', 'normal', 'invisible' (v2)
  },
  sitemap: {
    hostname: process.env.HOST_URL,
    gzip: true,
    captchaKey
  },
  markdownit: {
    runtime: true,
    html: true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config) {
      config.node = {
        fs: 'empty'
      }
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  env: {
    mapsApiKey: process.env.G_MAPS_API_KEY,
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
    apiUrl,
    captchaKey,
    GA: ga4,
    GAU: gaU
  },
  publicRuntimeConfig: {
    GA: ga4,
    GAU: gaU
  },
  router: {
    middleware: 'redirecting'
  },
  axios: {
    baseURL: apiUrl,
    proxy: true,
    proxyHeaders: false,
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      },
    },
  },
  proxy: {
    '/api/': {
      target: apiUrl,
      pathRewrite: { '^/api/': '' },
    }
  },
  content: {
    liveEdit: false,
    nestedProperties: [
      ...['supplier', ...collectionTypes].reduce((acc, c) => {
        return [...acc, `${c}.slug`, `${c}.title`, `${c}.description`, `${c}.content`]
      }, [])
    ],
    fullTextSearchFields: ['title', 'slug', 'content', 'description', 'fileContent']
  },
  generate: {
    crawler: false,
    fallback: true,
    async routes () {
      const { $content } = require('@nuxt/content')
      const routes = [
        '/',
        ...collectionTypes.filter(c => c !== 'pages').map(c => `/${c}`)
      ];
      await Promise.all(collectionTypes.map(async c => {
        const entries = await $content(c).only(['slug']).fetch();
        entries.forEach(e => routes.push(`${c === 'pages' ? `/${e.slug}` : `/${c}/${e.slug}`}`))
        return entries;
      }))
      return routes
    }
  }
}
