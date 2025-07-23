export const useSEO = (options = {}) => {
  const {
    title,
    description,
    path,
    keywords = '',
    ogImage = '/img/geoff-dobbin.jpg',
    type = 'website',
    author = 'Dobbin IP Law P.C.',
    publishedTime = null,
    modifiedTime = null,
    robots = 'index, follow'
  } = options

  const baseUrl = 'https://dobbiniplaw.com'
  const fullTitle = title ? `${title} | Dobbin IP Law P.C.` : 'Dobbin IP Law P.C. | Protecting Your Work'
  
  // 🔧 BULLETPROOF: Ensure canonical URLs never have trailing slashes
  // Handle both current path and passed path parameter
  const route = useRoute()
  const currentPath = path || route.path
  const cleanPath = currentPath === '/' ? '/' : currentPath.replace(/\/+$/, '')
  const canonicalUrl = `${baseUrl}${cleanPath}`

  // 🎯 CRITICAL: Also set canonical in useSeoMeta for @nuxtjs/seo module
  useSeoMeta({
    title: fullTitle,
    description: description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: type,
    ogUrl: canonicalUrl,
    ogImage: `${baseUrl}${ogImage}`,
    ogSiteName: 'Dobbin IP Law P.C.',
    ogLocale: 'en_US',
    
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: `${baseUrl}${ogImage}`,
    
    robots: robots,
    keywords: keywords,
    author: author,
    language: 'en-US',
    
    // Article-specific meta (conditional)
    ...(publishedTime && { articlePublishedTime: publishedTime }),
    ...(modifiedTime && { articleModifiedTime: modifiedTime }),
    ...(type === 'article' && { articleAuthor: author })
  })

  // 🎯 DUAL APPROACH: Also use useHead for backward compatibility
  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: robots },
      
      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: `${baseUrl}${ogImage}` },
      { property: 'og:site_name', content: 'Dobbin IP Law P.C.' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${baseUrl}${ogImage}` },
      
      // Additional SEO meta tags
      { name: 'author', content: author },
      { name: 'language', content: 'en-US' },
      
      // Article/Page-specific meta (conditional)
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
      ...(type === 'article' ? [{ property: 'article:author', content: author }] : [])
    ],
    link: [
      // 🔧 CANONICAL always points to clean URL (no trailing slash)
      { rel: 'canonical', href: canonicalUrl }
    ]
  })

  // 🎯 RETURN: Provide the canonical URL for debugging
  return {
    canonicalUrl,
    cleanPath,
    fullTitle
  }
}

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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Intellectual Property Legal Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Patent Services",
            "description": "Design patents, utility patents, and patent prosecution"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Trademark Services",
            "description": "Trademark registration and protection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Copyright Services",
            "description": "Copyright registration and protection"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Geoffrey Dobbin",
      "jobTitle": "Patent Attorney",
      "description": "Patent attorney with 25+ years experience and physics background",
      "alumniOf": "University of Utah College of Law"
    }
  }
}

export const useStructuredData = (additionalData = {}) => {
  const baseSchema = useBaseSchema()
  const schema = { ...baseSchema, ...additionalData }
  
  useSchemaOrg([schema])
}
