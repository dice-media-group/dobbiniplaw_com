// plugins/seo-defaults.global.js - TEMPORARILY SIMPLIFIED
export default defineNuxtPlugin(() => {
  // Simplified global plugin - only basic robots meta tags
  
  useHead({
    meta: [
      // Basic robots directive only
      { name: 'robots', content: 'index, follow' }
    ]
  })
})
