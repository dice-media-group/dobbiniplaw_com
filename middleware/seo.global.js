// middleware/seo.global.js - DISABLED to stop redirect loops
export default defineNuxtRouteMiddleware((to) => {
  // TEMPORARILY DISABLED - causing redirect loops
  // Will re-enable once we identify the conflicting redirect source
  
  console.log('SEO Middleware: Disabled to prevent redirect loops')
  return
  
  /*
  // Skip middleware on server to avoid SSR conflicts
  if (process.server) return

  const originalPath = to.path

  // Only redirect FROM trailing slash TO non-trailing slash
  if (originalPath.endsWith('/') && originalPath.length > 1) {
    const cleanPath = originalPath.slice(0, -1)
    
    console.log(`SEO Redirect: ${originalPath} → ${cleanPath}`)
    
    return navigateTo(cleanPath, { 
      redirectCode: 301,
      replace: true
    })
  }
  */
})
