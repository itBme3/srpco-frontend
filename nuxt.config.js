const apiUrl = typeof process.env.API_URL === 'string' && process.env.API_URL.length > 0
  ? process.env.API_URL 
    : typeof process.env.NGROK === 'string' && process.env.NGROK.length > 0
  ? `https://${process.env.NGROK}.ngrok.io`
    : 'http://localhost:1337';

console.log({ apiUrl })

const gaId = process.env.NODE_ENV === 'production' && process.env.GA_ENV !== 'dev' ? process.env.GA : process.env.GA_DEV;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
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
    '~/plugins/graphql-accessor.ts',
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
    'nuxt-graphql-request',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage'
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
  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        /**
         * The client endpoint url
         */
        endpoint: process.env.BACKEND_URL || `${apiUrl}/graphql`,
        /**
         * Per-client options overrides
         * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
         */
        options: {}
      }
      // ...your other clients
    },
    options: {},
    useFetchPolyfill: true,
    includeNodeModules: true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
   postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  env: {
    mapsApiKey: 'AIzaSyAKlNQvaXSHG-CQietQjo0RRtvVNJie30U',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    // apiUrl: process.env.API_URL || 'http://localhost:1337'
    apiUrl
    // apiUrl: 'https://0602e58a0d03.ngrok.io'

  }
}
