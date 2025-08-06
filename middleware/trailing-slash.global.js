// middleware/trailing-slash.global.js - SAFE client-side only implementation
export default defineNuxtRouteMiddleware((to, from) => {
  // ⚠️ CRITICAL: Only handle pure client-side navigation
  // Server handles initial requests and redirects via netlify.toml
  if (process.client && from && to.path !== from.path) {
    const path = to.path
    
    // Remove trailing slashes (except root) for client-side navigation only
    if (path.endsWith('/') && path.length > 1) {
      const cleanPath = path.slice(0, -1)
      
      // Use navigateTo with replace to avoid history pollution and external conflicts
      return navigateTo({
        path: cleanPath,
        query: to.query,
        hash: to.hash
      }, { 
        replace: true, // Don't add to history
        external: false // Keep internal to Nuxt router
      })
    }
  }
})
