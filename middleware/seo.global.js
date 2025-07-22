// middleware/seo.global.js - Comprehensive SEO redirect handler
export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side to avoid SSR conflicts
  if (process.client) {
    const path = to.path
    
    // 🎯 PRIMARY FIX: Remove trailing slashes from all pages except root
    if (path.endsWith('/') && path.length > 1) {
      const cleanPath = path.slice(0, -1)
      console.log(`SEO redirect: ${path} → ${cleanPath}`)
      
      return navigateTo(cleanPath, { 
        redirectCode: 301,
        replace: true
      })
    }
    
    // 🎯 SECONDARY FIX: Normalize common query parameters
    const allowedParams = ['page', 'category', 'practice-area', 'utm_source', 'utm_medium', 'utm_campaign']
    const currentQuery = to.query
    const cleanQuery = {}
    
    // Only keep allowed parameters
    for (const key of allowedParams) {
      if (currentQuery[key]) {
        cleanQuery[key] = currentQuery[key]
      }
    }
    
    // If query params were cleaned up, redirect
    if (Object.keys(currentQuery).length !== Object.keys(cleanQuery).length) {
      return navigateTo({
        path: to.path,
        query: cleanQuery
      }, { 
        redirectCode: 301,
        replace: true
      })
    }
  }
})
