// server/routes/robots.txt.js
export default defineEventHandler((event) => {
  const robotsTxt = `
User-agent: *
Allow: /

# Block unnecessary paths
Disallow: /drafts/
Disallow: /admin/
Disallow: /.well-known/
Disallow: /api/
Disallow: /*?*

# Important pages for crawling
Allow: /patents
Allow: /trademarks  
Allow: /copyright
Allow: /about
Allow: /contact
Allow: /services
Allow: /testimonials
Allow: /resources

# Crawl delay for bots
Crawl-delay: 1

# Sitemaps
Sitemap: https://dobbiniplaw.com/sitemap.xml
`.trim()

  setHeader(event, 'Content-Type', 'text/plain')
  return robotsTxt
})
