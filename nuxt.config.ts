// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/seo', // 🆕 Add this first for comprehensive SEO
    '@nuxt/content', 
    '@nuxtjs/tailwindcss', 
    '@nuxt/image'
    // Removed '@nuxtjs/sitemap' - included in @nuxtjs/seo
  ],

  // 🆕 Add site configuration for @nuxtjs/seo
  site: {
    url: 'https://dobbiniplaw.com',
    name: 'Dobbin IP Law P.C.',
    description: 'Utah patent attorney providing clear, strategic IP protection for inventors and businesses',
    defaultLocale: 'en',
    indexable: true // 🔧 CRITICAL: Explicitly set site as indexable
  },

  // 🔧 More explicit robots configuration to fix indexability
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

  // 🔧 Enhanced sitemap configuration with explicit indexability
  sitemap: {
    siteUrl: 'https://dobbiniplaw.com',
    autoLastmod: true,
    exclude: ['/drafts/**', '/admin/**'],
    defaults: {
      changefreq: 'monthly',
      priority: 0.8
    }
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

  // 🔧 Fix trailing slash issues (CRITICAL for canonicals)
  router: {
    options: {
      scrollBehavior: () => false,
      trailingSlash: false
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
        // 🔧 Multiple robots directives for maximum crawler compatibility
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'bingbot', content: 'index, follow' },
        { name: 'msnbot', content: 'index, follow' },
        { name: 'slurp', content: 'index, follow' }
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

  // Image optimization for Core Web Vitals
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

  // 🔧 Simplified route rules - let default robots meta tags handle indexing
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
    // Only explicitly block drafts
    '/drafts/**': { index: false, robots: 'noindex, nofollow' },
    '/admin/**': { index: false, robots: 'noindex, nofollow' },
    '/seo-test': { prerender: true }, // 🆕 Add the test page
  },

  compatibilityDate: '2025-04-08',

  runtimeConfig: {
    public: {
      gtag: process.env.NUXT_PUBLIC_GTAG,
      ahrefsKey: process.env.NUXT_PUBLIC_AHREFS_KEY
    }
  }
})
