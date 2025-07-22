// middleware/seo.global.js - FIXED to prevent circular redirects
export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on server to avoid SSR conflicts
  if (process.server) return

  const originalPath = to.path

  // 🔧 CRITICAL: Only redirect FROM trailing slash TO non-trailing slash
  // Never redirect the other direction to avoid circular redirects
  if (originalPath.endsWith('/') && originalPath.length > 1) {
    const cleanPath = originalPath.slice(0, -1)
    
    console.log(`SEO Redirect: ${originalPath} → ${cleanPath}`)
    
    return navigateTo(cleanPath, { 
      redirectCode: 301,
      replace: true
    })
  }

  // Fix double slashes if they exist
  if (originalPath.includes('//')) {
    const cleanPath = originalPath.replace(/\/+/g, '/')
    return navigateTo(cleanPath, { 
      redirectCode: 301,
      replace: true
    })
  }

  // Note: Removed query parameter cleaning to avoid complexity
  // Let @nuxtjs/seo handle query normalization
})
