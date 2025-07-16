// plugins/seo-defaults.client.js
export default defineNuxtPlugin(() => {
  // Ensure all pages have proper robots meta tags for indexability
  useHead({
    meta: [
      { name: 'robots', content: 'index, follow' }
    ]
  })
})
