// middleware/trailing-slash.global.js - PROPER implementation for trailing slash redirects
import { withoutTrailingSlash } from 'ufo'

export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side to avoid SSR conflicts
  if (process.client) {
    const path = to.path
    
    // 🎯 SIMPLE: Remove trailing slashes (except root) and redirect
    if (path.endsWith('/') && path.length > 1) {
      const cleanPath = withoutTrailingSlash(path, true)
      
      // Preserve query parameters and hash
      const fullCleanUrl = cleanPath + (to.search || '') + (to.hash || '')
      
      return navigateTo(fullCleanUrl, { 
        redirectCode: 301,
        replace: true
      })
    }
  }
})
