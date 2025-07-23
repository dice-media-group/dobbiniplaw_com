// middleware/seo.global.js - MINIMAL and SAFE redirect handler
export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side to avoid SSR conflicts
  if (process.client) {
    const path = to.path
    
    // 🎯 ONLY fix trailing slash issue - nothing else
    if (path.endsWith('/') && path.length > 1) {
      const cleanPath = path.slice(0, -1)
      console.log(`SEO redirect: ${path} → ${cleanPath}`)
      
      return navigateTo(cleanPath, { 
        redirectCode: 301,
        replace: true
      })
    }
    
    // 🚨 REMOVED: Query parameter filtering that might interfere with navigation
    // Let @nuxtjs/seo handle this automatically
  }
})
