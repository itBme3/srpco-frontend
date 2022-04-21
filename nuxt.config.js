import { collectionTypes } from './models/entry.model';

const apiUrl = process.env.NODE_ENV === 'production' && typeof process.env.API_URL === 'string' && process.env.API_URL.length > 0
  ? process.env.API_URL
      : typeof process.env.NGROK === 'string' && process.env.NGROK.length > 0
  ? `https://${process.env.NGROK}.ngrok.io` 
    : 'http://localhost:1337';

const gaId = process.env.NODE_ENV === 'production' && process.env.GA_ENV !== 'dev' ? process.env.GA : process.env.GA_DEV;

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
      { rel: 'stylesheet', href: 'https://use.typekit.net/jot7ezc.css' },
      { rel: 'stylesheet', defer: true, href: 'https://d1azc1qln24ryf.cloudfront.net/99224/SRPMicrosites/style-cf.css?vcqm1a' },
    ]
  },

  server: {
    port: '3001'
  },
  ssr: true,
  target: 'static',
  css: [
    '~/assets/styles/style.scss'
  ],
  tailwindCss: {
    cssPath: '~/assets/tailwind/tailwind.css',
    exposeConfig: false,
    config: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/typography')
      ]
    },
    injectPosition: 0
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/check-view.js',
    '~/plugins/flickity.client.js',
    '~/plugins/scrollbar.js',
    '~/plugins/chat-box.client.js',
    '~/plugins/tailwind-components.js',
    '~/plugins/form-generator.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
    '@nuxtjs/google-analytics'
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage',
    '@nuxt/content',
    '@nuxtjs/proxy'
  ],

  googleAnalytics: {
    id: gaId,
    layer: 'dataLayer',
    pageTracking: true,
    debug: {
      enabled: false,
      trace: false,
      sendHitTask: true
    }
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
    mapsApiKey: 'AIzaSyAKlNQvaXSHG-CQietQjo0RRtvVNJie30U',
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
    apiUrl
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
    },
  },
  content: {
    liveEdit: false,
    nestedProperties: true
  },
  generate: {
    async routes () {
      const { $content } = require('@nuxt/content')
      const routes = [
        '/',
        ...collectionTypes.map(c => `/${c}`)
      ];
      await Promise.all(['pages',...collectionTypes].map(async c => {
        const entries = await $content(c).only(['slug']).fetch();
        entries.forEach(e => routes.push(`${c === 'pages' ? `/${e.slug}` : `/${c}/${e.slug}`}`))
        
      }))
      console.log({routes})
      return routes
    }
  }
}
