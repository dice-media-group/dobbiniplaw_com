// server/routes/robots.txt.js - CLEAN implementation
// @nuxtjs/seo handles robots.txt automatically, but we can override if needed
export default defineEventHandler((event) => {
  const robotsTxt = `
User-agent: *
Allow: /

# Block admin paths
Disallow: /drafts/
Disallow: /admin/

# Sitemap (handled automatically by @nuxtjs/seo)
Sitemap: https://dobbiniplaw.com/sitemap.xml
`.trim()

  setHeader(event, 'Content-Type', 'text/plain')
  return robotsTxt
})
