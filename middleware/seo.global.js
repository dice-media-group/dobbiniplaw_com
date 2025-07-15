// middleware/seo.global.js
export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side to avoid SSR issues
  if (process.server) return

  // Fix trailing slash issues - redirect /about/ to /about
  if (to.path.endsWith('/') && to.path.length > 1) {
    return navigateTo(to.path.slice(0, -1), { redirectCode: 301 })
  }

  // Clean up query parameters to prevent duplicate pages
  const allowedParams = ['page', 'category'] // Add any legitimate query params
  const cleanQuery = {}
  
  for (const [key, value] of Object.entries(to.query)) {
    if (allowedParams.includes(key)) {
      cleanQuery[key] = value
    }
  }

  // If we removed any query parameters, redirect to clean URL
  if (Object.keys(to.query).length !== Object.keys(cleanQuery).length) {
    return navigateTo({
      path: to.path,
      query: cleanQuery
    }, { redirectCode: 301 })
  }
})
