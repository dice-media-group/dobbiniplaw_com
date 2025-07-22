// server/routes/robots.txt.js
export default defineEventHandler((event) => {
  const robotsTxt = `
User-agent: *
Allow: /

# Block unnecessary paths
Disallow: /drafts/
Disallow: /admin/
Disallow: /.well-known/

# Allow all important content (NO trailing slashes)
Allow: /patents
Allow: /trademarks  
Allow: /copyright
Allow: /about
Allow: /contact
Allow: /services
Allow: /testimonials
Allow: /resources
Allow: /helpful-links
Allow: /flat-fees
Allow: /prior-work
Allow: /privacy-policy
Allow: /terms-of-service

# Crawler settings
Crawl-delay: 1

# Sitemap location (NO trailing slash)
Sitemap: https://dobbiniplaw.com/sitemap.xml
`.trim()

  setHeader(event, 'Content-Type', 'text/plain')
  return robotsTxt
})
