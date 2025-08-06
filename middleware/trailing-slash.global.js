// middleware/trailing-slash.global.js - DISABLED for SSG compatibility
export default defineNuxtRouteMiddleware((to, from) => {
  // ⚠️ CRITICAL: Completely disable during SSG build process
  // Let server-side redirects in netlify.toml handle everything
  
  // Only run for actual user navigation in browser (not during build)
  if (process.client && from && to.path !== from.path && window.location) {
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
