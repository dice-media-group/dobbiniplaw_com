// plugins/seo-defaults.server.js
export default defineNuxtPlugin(() => {
  // Server-side plugin to ensure proper robots meta tags
  useHead({
    meta: [
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' }
    ]
  })
})
