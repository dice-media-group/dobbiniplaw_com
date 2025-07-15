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
    modifiedTime = null
  } = options

  const baseUrl = 'https://dobbiniplaw.com'
  const fullTitle = title ? `${title} | Dobbin IP Law P.C.` : 'Dobbin IP Law P.C. | Protecting Your Work'
  const canonicalUrl = `${baseUrl}${path}`

  // Use the new @nuxtjs/seo composables for better SEO
  useSeoMeta({
    title: fullTitle,
    description: description,
    keywords: keywords,
    
    // Open Graph for social media
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: type,
    ogUrl: canonicalUrl,
    ogImage: `${baseUrl}${ogImage}`,
    ogSiteName: 'Dobbin IP Law P.C.',
    ogLocale: 'en_US',
    
    // Twitter Cards
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: `${baseUrl}${ogImage}`,
    
    // Additional SEO meta tags
    robots: 'index, follow',
    author: author,
    language: 'en-US',
    
    // Article/Page-specific meta (conditional)
    ...(publishedTime && { 'article:published_time': publishedTime }),
    ...(modifiedTime && { 'article:modified_time': modifiedTime }),
    ...(type === 'article' && { 'article:author': author })
  })

  // Set canonical URL
  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  })
}

export const useBaseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Dobbin IP Law P.C.",
    "image": "https://dobbiniplaw.com/img/geoff-dobbin.jpg",
    "@id": "https://dobbiniplaw.com/",
    "url": "https://dobbiniplaw.com/",
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
