// composables/useSEO.js - CLEAN and PROPER implementation
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
  const currentPath = path || route.path
  const fullUrl = `https://dobbiniplaw.com${currentPath}`

  // ✅ ONLY use @nuxtjs/seo - clean and simple
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
    ogUrl: fullUrl,
    ogImage: `https://dobbiniplaw.com${ogImage}`,
    ogSiteName: 'Dobbin IP Law P.C.',
    ogLocale: 'en_US',
    
    // Twitter Cards
    twitterCard: 'summary_large_image',
    twitterTitle: title || 'Protecting Your Work',
    twitterDescription: description,
    twitterImage: `https://dobbiniplaw.com${ogImage}`
  })

  // ✅ @nuxtjs/seo handles canonical URLs automatically
  // ✅ No manual URL manipulation needed
}

// ✅ CLEAN structured data helper
export const useBaseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Dobbin IP Law P.C.",
    "image": "https://dobbiniplaw.com/img/geoff-dobbin.jpg",
    "@id": "https://dobbiniplaw.com",
    "url": "https://dobbiniplaw.com",
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
