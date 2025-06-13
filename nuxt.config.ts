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
      scrollBehavior: () => false
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
      gtag: process.env.NUXT_PUBLIC_GTAG || 'G-XXXXXXXXXX' // Replace with your actual GA4 ID
    }
  }
})