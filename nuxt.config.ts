// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/seo',
    '@nuxt/content', 
    '@nuxtjs/tailwindcss', 
    '@nuxt/image'
  ],

  // 🔧 MINIMAL configuration to avoid conflicts
  site: {
    url: 'https://dobbiniplaw.com',
    name: 'Dobbin IP Law P.C.',
    description: 'Utah patent attorney providing clear, strategic IP protection for inventors and businesses',
    defaultLocale: 'en',
    indexable: true
    // Removed trailingSlash setting to let Nuxt handle naturally
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

  // 🔧 DEFAULT router settings to avoid conflicts
  router: {
    options: {
      scrollBehavior: () => false
      // Removed trailingSlash and strict settings that might cause conflicts
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
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Crimson+Text:regular,italic,600,600iconic,700,700italic&subset=latin&display=swap' }
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

  // 🔧 MINIMAL route rules
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
    
    // Only block admin areas
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
