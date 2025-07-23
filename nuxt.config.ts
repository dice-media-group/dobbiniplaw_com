// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/seo',
    '@nuxt/content', 
    '@nuxtjs/tailwindcss', 
    '@nuxt/image'
  ],

  // 🔧 ENHANCED configuration for consistent URL handling
  site: {
    url: 'https://dobbiniplaw.com',
    name: 'Dobbin IP Law P.C.',
    description: 'Utah patent attorney providing clear, strategic IP protection for inventors and businesses',
    defaultLocale: 'en',
    indexable: true,
    trailingSlash: false  // 🎯 CRITICAL: Explicitly disable trailing slashes
  },

  robots: {
    credits: false,
    sitemap: 'https://dobbiniplaw.com/sitemap.xml',
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: ['/drafts/', '/admin/']
      }
    ]
  },

  sitemap: {
    siteUrl: 'https://dobbiniplaw.com',
    autoLastmod: true,
    exclude: ['/drafts/**', '/admin/**'],
    defaults: {
      changefreq: 'monthly',
      priority: 0.8
    },
    // 🎯 CRITICAL: Ensure sitemap URLs don't have trailing slashes
    strictNuxtContentPaths: true
  },
  
  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-light'
    }
  },  

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // 🔧 ENHANCED router settings for consistent URL handling
  router: {
    options: {
      scrollBehavior: () => false,
      strict: true,  // 🎯 Enable strict routing
      trailingSlash: false  // 🎯 CRITICAL: Disable trailing slashes in router
    }
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      title: 'Dobbin IP Law P.C. | Protecting Your Work',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { name: 'description', content: 'Dobbin IP Law specializes in obtaining patents to protect your invention, copyrights to protect your authorship, and trademarks to protect your marketing.' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', href: '/favicon-192x192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/favicon-180x180.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Crimson+Text:regular,italic,600,600italic,700,700italic&subset=latin&display=swap' }
      ],
      script: [
        {
          innerHTML: `
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `,
          type: 'text/javascript',
          body: true
        },
        {
          innerHTML: `
            window.addEventListener('load', function() {
              window.scrollTo(0, 0);
            });
            
            window.forceScrollToTop = function() {
              window.scrollTo(0, 0);
            }
          `,
          type: 'text/javascript',
          body: true
        }
      ]
    }
  },

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

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  },

  ssr: true,
  
  nitro: {
    preset: 'netlify',
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/contact',
        '/services',
        '/patents',
        '/trademarks',
        '/copyright',
        '/prior-work',
        '/resources',
        '/testimonials',
        '/helpful-links',
        '/flat-fees',
        '/success',
        '/privacy-policy',
        '/terms-of-service'
      ]
    }
  },

  // 🔧 ENHANCED route rules with canonical URL enforcement
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/patents': { prerender: true },
    '/trademarks': { prerender: true },
    '/copyright': { prerender: true },
    '/services': { prerender: true },
    '/testimonials': { prerender: true },
    '/flat-fees': { prerender: true },
    '/resources': { prerender: true },
    '/helpful-links': { prerender: true },
    '/prior-work': { prerender: true },
    '/privacy-policy': { prerender: true },
    '/terms-of-service': { prerender: true },
    '/success': { prerender: true },
    
    // 🎯 CRITICAL: Add redirect rules for trailing slash URLs
    '/about/': { redirect: '/about', prerender: false },
    '/contact/': { redirect: '/contact', prerender: false },
    '/patents/': { redirect: '/patents', prerender: false },
    '/trademarks/': { redirect: '/trademarks', prerender: false },
    '/copyright/': { redirect: '/copyright', prerender: false },
    '/services/': { redirect: '/services', prerender: false },
    '/testimonials/': { redirect: '/testimonials', prerender: false },
    '/flat-fees/': { redirect: '/flat-fees', prerender: false },
    '/resources/': { redirect: '/resources', prerender: false },
    '/helpful-links/': { redirect: '/helpful-links', prerender: false },
    '/prior-work/': { redirect: '/prior-work', prerender: false },
    '/privacy-policy/': { redirect: '/privacy-policy', prerender: false },
    '/terms-of-service/': { redirect: '/terms-of-service', prerender: false },
    '/success/': { redirect: '/success', prerender: false },
    
    // Block admin areas
    '/drafts/**': { index: false, robots: 'noindex, nofollow' },
    '/admin/**': { index: false, robots: 'noindex, nofollow' }
  },

  compatibilityDate: '2025-04-08',

  runtimeConfig: {
    public: {
      gtag: process.env.NUXT_PUBLIC_GTAG,
      ahrefsKey: process.env.NUXT_PUBLIC_AHREFS_KEY
    }
  }
})
