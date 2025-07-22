// middleware/seo.global.js - SAFE trailing slash redirects
export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side to avoid SSR issues
  if (process.client) {
    const path = to.path
    
    // Redirect trailing slash URLs to clean URLs (except root)
    if (path.endsWith('/') && path.length > 1) {
      const cleanPath = path.slice(0, -1)
      console.log(`Trailing slash redirect: ${path} → ${cleanPath}`)
      
      return navigateTo(cleanPath, { 
        redirectCode: 301,
        replace: true
      })
    }
  }
})
