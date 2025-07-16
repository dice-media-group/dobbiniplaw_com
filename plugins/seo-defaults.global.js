// plugins/seo-defaults.global.js
export default defineNuxtPlugin(() => {
  // Global plugin to ensure ALL pages have proper robots meta tags
  // This runs on both client and server
  
  useHead({
    meta: [
      // Multiple robots directives for maximum compatibility
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' },
      { name: 'msnbot', content: 'index, follow' },
      { name: 'slurp', content: 'index, follow' },
      { name: 'duckduckbot', content: 'index, follow' },
      { name: 'baiduspider', content: 'index, follow' },
      { name: 'yandexbot', content: 'index, follow' },
      // HTTP-EQUIV version for additional compatibility
      { 'http-equiv': 'robots', content: 'index, follow' }
    ]
  })
  
  // Also add server-side headers for maximum compatibility
  if (process.server) {
    useHead({
      meta: [
        { name: 'X-Robots-Tag', content: 'index, follow' }
      ]
    })
  }
})
