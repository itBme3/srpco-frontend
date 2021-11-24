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
      { rel: 'stylesheet', href: 'https://d1azc1qln24ryf.cloudfront.net/99224/SRPMicrosites/style-cf.css?sjun1e' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/style.scss'
  ],
  tailwindCss: {
    cssPath: '~/assets/tailwind.css'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/check-view.js',
    '~/plugins/graphql-accessor.ts',
    '~/plugins/debounce.js',
    '~/plugins/youtube-embed.client.js',
    '~/plugins/pdf-embed.client.js',
    '~/plugins/scrollbar.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    'nuxt-graphql-request'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],
  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        /**
         * The client endpoint url
         */
        endpoint: process.env.BACKEND_URL || 'http://localhost:1339/graphql',
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
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:1339'
  }
}
