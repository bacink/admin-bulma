/*
 ** This is for GitHub pages
 */
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
      router: {
        base: '/jafung/',
      },
    }
    : {}

export default {
  static: {
    prefix: false
  },
  /*
   ** Concat router base setting
   */
  ...routerBase,
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Nunito',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/after-each.js', mode: 'client' },
    '~plugins/mixins/user.js',
    '~plugins/mixins/print.js',
    '~plugins/buefyComponents.js',
  ],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  // components: false,
  components: [
    {
      path: '~/components/Form/Draft/Template', prefix: 'draft'
    },
    { path: '~/components/Form/Paraf', prefix: 'paraf' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', {
      fix: true
    }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { materialDesignIcons: false }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://api.jafung.test/api',
    proxyHeaders: false,
    credentials: false,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: 'access_token',
          },
          user: { url: 'auth/user-profile', method: 'get', propertyName: 'data' },
          logout: { url: 'auth/logout', method: 'post' },
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/',
    },
  },
  router: {
    middleware: ['auth'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (!config.externals) {
        config.externals = {}
      }

      // Remove moment.js from chart.js
      // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
      config.externals.moment = 'moment'
    },
  },
}
