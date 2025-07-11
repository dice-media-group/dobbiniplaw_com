// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content', 
    '@nuxtjs/tailwindcss', 
    '@nuxt/image'
  ],
  
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

  // Router configuration
  router: {
    options: {
      // Disable Vue Router's own scroll behavior
      scrollBehavior: () => false,
      strict: true,
      // Force trailing slashes
      trailingSlash: true
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
        { name: 'description', content: 'Dobbin IP Law specializes in obtaining patents to protect your invention, copyrights to protect your authorship, and trademarks to protect your marketing.' }
      ],
      link: [
        // Favicon links
        { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', href: '/favicon-192x192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/favicon-180x180.png' },
        
        // Crimson Text font from Google Fonts
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Crimson+Text:regular,italic,600,600italic,700,700italic&subset=latin&display=swap' }
      ],
      // Add the script for form handling
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
        // Add a custom script for fixing scroll behavior
        {
          innerHTML: `
            // Force scroll to top on page load
            window.addEventListener('load', function() {
              window.scrollTo(0, 0);
            });
            
            // Helper function to force scroll to top
            window.forceScrollToTop = function() {
              window.scrollTo(0, 0);
            }
          `,
          type: 'text/javascript',
          body: true
        }
        // Remove the Ahrefs script - it's handled by the plugin now
      ]
    }
  },

  // For FontAwesome to work correctly with Nuxt 3
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  },

  // Generate static site for Netlify
  ssr: true,
  
  // Static site generation settings
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about/',           // ✅ Added trailing slash
        '/contact/',         // ✅ Added trailing slash
        '/services/',        // ✅ Added trailing slash
        '/patents/',         // ✅ Added trailing slash
        '/trademarks/',      // ✅ Added trailing slash
        '/copyright/',       // ✅ Added trailing slash
        '/prior-work/',      // ✅ Added trailing slash
        '/resources/',       // ✅ Added trailing slash
        '/testimonials/',    // ✅ Added trailing slash
        '/helpful-links/',   // ✅ Added trailing slash
        '/flat-fees/',       // ✅ Added trailing slash
        '/success/',         // ✅ Added trailing slash
        '/privacy-policy/',  // ✅ Added trailing slash
        '/terms-of-service/' // ✅ Added trailing slash
      ]
    }
  },

  // Add this section to fix 301 redirects
  routeRules: {
    // Homepage
    '/': { prerender: true },
    // Remove all these redirects:
    // '/about': { redirect: '/about/' }, 
    // '/contact': { redirect: '/contact/' },
    // '/patents': { redirect: '/patents/' },
    // '/terms-of-service': { redirect: '/terms-of-service/' },
    // '/privacy-policy': { redirect: '/privacy-policy/' },
    // '/bio-fees': { redirect: '/bio-fees/' },
    '/about': { redirect: '/about/', status: 301 },
    '/contact': { redirect: '/contact/', status: 301 },
    '/services': { redirect: '/services/', status: 301 },
    '/patents': { redirect: '/patents/', status: 301 },
    '/trademarks': { redirect: '/trademarks/', status: 301 },
    '/copyright': { redirect: '/copyright/', status: 301 },
    '/prior-work': { redirect: '/prior-work/', status: 301 },
    '/resources': { redirect: '/resources/', status: 301 },
    '/testimonials': { redirect: '/testimonials/', status: 301 },
    '/helpful-links': { redirect: '/helpful-links/', status: 301 },
    '/flat-fees': { redirect: '/flat-fees/', status: 301 },
    '/privacy-policy': { redirect: '/privacy-policy/', status: 301 },
    '/terms-of-service': { redirect: '/terms-of-service/', status: 301 }
  },

  // Generate static HTML for improved SEO and to ensure forms are detected
  generate: {
    routes: ['/success', '/flat-fees']
  },

  // Performance optimizations
  optimization: {
    splitChunks: {
      maxSize: 300000,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|vue)$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  // Improve build performance
  vite: {
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons'
      ]
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'fontawesome': [
              '@fortawesome/fontawesome-svg-core',
              '@fortawesome/free-solid-svg-icons',
              '@fortawesome/vue-fontawesome'
            ]
          }
        }
      }
    }
  },

  hooks: {
    'nitro:config': (nitroConfig) => {
      if (nitroConfig.dev) {
        return
      }
      // Improve static rendering
      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.ignore = nitroConfig.prerender.ignore || []
      nitroConfig.prerender.ignore.push(/** any route patterns to ignore **/)
    }
  },

  compatibilityDate: '2025-04-08',

  runtimeConfig: {
    public: {
      gtag: process.env.NUXT_PUBLIC_GTAG,
      ahrefsKey: process.env.NUXT_PUBLIC_AHREFS_KEY
    }
  }
})