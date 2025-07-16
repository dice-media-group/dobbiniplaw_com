// server/routes/robots.txt.js
export default defineEventHandler((event) => {
  const robotsTxt = `
User-agent: *
Allow: /

# Only block truly unnecessary paths
Disallow: /drafts/
Disallow: /admin/
Disallow: /.well-known/

# Allow all important content
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

# Be crawler-friendly
Crawl-delay: 1

# Sitemap location
Sitemap: https://dobbiniplaw.com/sitemap.xml
`.trim()

  setHeader(event, 'Content-Type', 'text/plain')
  return robotsTxt
})
