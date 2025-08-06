// composables/useSEO.js - FIXED to use actual deployment URL
import { withoutTrailingSlash } from 'ufo'

export const useSEO = (options = {}) => {
  const {
    title,
    description,
    path,
    keywords = '',
    ogImage = '/img/geoff-dobbin.jpg',
    type = 'website'
  } = options

  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const currentPath = path || route.path
  
  // 🎯 CRITICAL FIX: Use actual site URL from config, not hardcoded
  // This works for both staging and production
  const siteUrl = runtimeConfig.public.siteUrl || runtimeConfig.app.baseURL || 'https://dobbiniplaw.com'
  const cleanPath = withoutTrailingSlash(currentPath, true)
  const canonicalUrl = `${siteUrl}${cleanPath}`

  // ✅ Use @nuxtjs/seo but force clean canonical URL
  useSeoMeta({
    title: title || 'Protecting Your Work',
    description,
    keywords,
    robots: 'index, follow',
    author: 'Dobbin IP Law P.C.',
    
    // Open Graph
    ogTitle: title || 'Protecting Your Work',
    ogDescription: description,
    ogType: type,
    ogUrl: canonicalUrl, // 🎯 Force clean URL
    ogImage: `${siteUrl}${ogImage}`,
    ogSiteName: 'Dobbin IP Law P.C.',
    ogLocale: 'en_US',
    
    // Twitter Cards
    twitterCard: 'summary_large_image',
    twitterTitle: title || 'Protecting Your Work',
    twitterDescription: description,
    twitterImage: `${siteUrl}${ogImage}`
  })

  // 🎯 CRITICAL: Also manually set canonical link to override @nuxtjs/seo
  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  })

  return { canonicalUrl }
}

// ✅ CLEAN structured data helper
export const useBaseSchema = () => {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || runtimeConfig.app.baseURL || 'https://dobbiniplaw.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Dobbin IP Law P.C.",
    "image": `${siteUrl}/img/geoff-dobbin.jpg`,
    "@id": siteUrl,
    "url": siteUrl, // No trailing slash
    "telephone": "+18019696609",
    "email": "getinfo@dobbiniplaw.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2250 S Redwood Rd, Suite 5",
      "addressLocality": "West Valley City",
      "addressRegion": "UT",
      "postalCode": "84119",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.73315967932904,
      "longitude": -111.9405988853505
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:30",
      "closes": "17:30"
    },
    "sameAs": [
      "https://www.facebook.com/DobbinIPLaw/",
      "https://x.com/dobbiniplaw"
    ],
    "priceRange": "$$",
    "areaServed": "Utah",
    "serviceType": "Intellectual Property Law",
    "founder": {
      "@type": "Person",
      "name": "Geoffrey Dobbin",
      "jobTitle": "Patent Attorney",
      "description": "Patent attorney with 25+ years experience and physics background"
    }
  }
}

// ✅ SIMPLE structured data helper
export const useStructuredData = (additionalData = {}) => {
  const baseSchema = useBaseSchema()
  const schema = { ...baseSchema, ...additionalData }
  
  useSchemaOrg([schema])
}
