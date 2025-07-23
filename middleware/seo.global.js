// middleware/seo.global.js - REMOVED
// @nuxtjs/seo handles all URL normalization automatically
// No manual middleware needed for trailing slashes or redirects

export default defineNuxtRouteMiddleware(() => {
  // ✅ Let @nuxtjs/seo handle everything
  // This file exists only to prevent 404s if referenced elsewhere
})
