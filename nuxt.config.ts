// nuxt.config.ts - Handle trailing slash redirects via Nuxt route rules
export default defineNuxtConfig({
  devtools: { enabled: true },

  // ✅ MINIMAL modules - let @nuxtjs/seo handle SEO
  modules: [
    '@nuxtjs/seo',
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
    trailingSlash: false, // ✅ Enforce no trailing slashes
    indexable: true
  },

  // ✅ Sitemap configuration to ensure no trailing slashes
  sitemap: {
    includeAppSources: true,
    trailingSlash: false, // ✅ Critical: no trailing slashes in sitemap
    xsl: false, // Disable XSL for better compatibility
    defaults: {
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }
  },

  // ✅ CRITICAL: Disable automatic redirects to prevent conflicts
  seo: {
    redirectToCanonicalSiteUrl: false // ✅ Handle manually
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

  // ✅ STANDARD app configuration
  app: {
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

  // ✅ Deployment configuration - simplified
  nitro: {
    preset: 'netlify',
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true
    }
  },

  // ✅ Route rules - handle trailing slash redirects here
  routeRules: {
    // Admin areas
    '/drafts/**': { index: false, robots: false },
    '/admin/**': { index: false, robots: false },
    
    // ✅ CRITICAL: Redirect trailing slash URLs via route rules
    '/about/': { redirect: { to: '/about', statusCode: 301 } },
    '/contact/': { redirect: { to: '/contact', statusCode: 301 } },
    '/patents/': { redirect: { to: '/patents', statusCode: 301 } },
    '/trademarks/': { redirect: { to: '/trademarks', statusCode: 301 } },
    '/copyright/': { redirect: { to: '/copyright', statusCode: 301 } },
    '/services/': { redirect: { to: '/services', statusCode: 301 } },
    '/testimonials/': { redirect: { to: '/testimonials', statusCode: 301 } },
    '/flat-fees/': { redirect: { to: '/flat-fees', statusCode: 301 } },
    '/helpful-links/': { redirect: { to: '/helpful-links', statusCode: 301 } },
    '/prior-work/': { redirect: { to: '/prior-work', statusCode: 301 } },
    '/terms-of-service/': { redirect: { to: '/terms-of-service', statusCode: 301 } },
    '/privacy-policy/': { redirect: { to: '/privacy-policy', statusCode: 301 } },
    '/patent-browser/': { redirect: { to: '/patent-browser', statusCode: 301 } },
    '/seo-test/': { redirect: { to: '/seo-test', statusCode: 301 } },
    '/resources/': { redirect: { to: '/resources', statusCode: 301 } },
    '/success/': { redirect: { to: '/success', statusCode: 301 } },
    '/seo-diagnostic/': { redirect: { to: '/seo-diagnostic', statusCode: 301 } }
  },

  compatibilityDate: '2025-04-08',

  runtimeConfig: {
    public: {
      gtag: process.env.NUXT_PUBLIC_GTAG,
      ahrefsKey: process.env.NUXT_PUBLIC_AHREFS_KEY
    }
  }
})
