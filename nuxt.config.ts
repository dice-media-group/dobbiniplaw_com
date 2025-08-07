// nuxt.config.ts - PROPER SPA configuration for Netlify
export default defineNuxtConfig({
  devtools: { enabled: true },

  // ✅ MINIMAL modules - TEMPORARILY DISABLE SEO
  modules: [
    // '@nuxtjs/seo', // DISABLED for testing
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],

  // ✅ SINGLE source of truth for site configuration
  site: {
    url: 'https://dobbiniplaw.com',
    name: 'Dobbin IP Law P.C.',
    description: 'Utah patent attorney providing clear, strategic IP protection for inventors and businesses',
    defaultLocale: 'en',
    trailingSlash: false,
    indexable: true
  },

  // ✅ PROPER SPA MODE configuration
  ssr: false,
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      titleTemplate: '%s | Dobbin IP Law P.C.',
      title: 'Protecting Your Work',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', href: '/favicon-192x192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/favicon-180x180.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Crimson+Text:regular,italic,600,600italic,700,700italic&subset=latin&display=swap' }
      ]
    }
  },

  // ✅ Basic content configuration
  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-light'
    }
  },

  // ✅ Styling
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // ✅ Image optimization
  image: {
    formats: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
    quality: 85,
    densities: [1, 2]
  },

  // ✅ Build configuration
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  },

  // ✅ NETLIFY SPA deployment
  nitro: {
    preset: 'netlify',
    compressPublicAssets: true
  },

  // ✅ MINIMAL route rules
  routeRules: {
    '/drafts/**': { index: false, robots: false },
    '/admin/**': { index: false, robots: false }
  },

  compatibilityDate: '2025-04-08',

  runtimeConfig: {
    public: {
      gtag: process.env.NUXT_PUBLIC_GTAG,
      ahrefsKey: process.env.NUXT_PUBLIC_AHREFS_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://dobbiniplaw.com'
    }
  }
})
