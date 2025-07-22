// middleware/seo.global.js
export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side to avoid SSR issues
  if (process.server) return

  const originalPath = to.path
  let redirectNeeded = false
  let newPath = originalPath
  let newQuery = { ...to.query }

  // 1. Fix trailing slash issues - redirect /about/ to /about (but NOT root)
  if (originalPath.endsWith('/') && originalPath.length > 1) {
    newPath = originalPath.slice(0, -1)
    redirectNeeded = true
  }

  // 2. Fix double slashes
  if (originalPath.includes('//')) {
    newPath = originalPath.replace(/\/+/g, '/')
    redirectNeeded = true
  }

  // 3. Clean up query parameters to prevent duplicate pages
  const allowedParams = ['page', 'category', 'search', 'filter'] // Add any legitimate query params
  const cleanQuery = {}
  
  for (const [key, value] of Object.entries(to.query)) {
    if (allowedParams.includes(key) && value) {
      cleanQuery[key] = value
    }
  }

  // 4. Check if query parameters were cleaned
  if (Object.keys(to.query).length !== Object.keys(cleanQuery).length) {
    newQuery = cleanQuery
    redirectNeeded = true
  }

  // Perform redirect if needed
  if (redirectNeeded) {
    console.log(`SEO Redirect: ${originalPath} → ${newPath}`)
    
    return navigateTo({
      path: newPath,
      query: newQuery
    }, { 
      redirectCode: 301,
      replace: true // Use replace to avoid back button issues
    })
  }
})
