export const useSEO = (options = {}) => {
  const {
    title,
    description,
    path,
    keywords = '',
    ogImage = '/img/geoff-dobbin.jpg',
    type = 'website',
    author = 'Dobbin IP Law P.C.',      // ← ADD this line
    publishedTime = null,               // ← ADD this line  
    modifiedTime = null                 // ← ADD this line
  } = options

  const baseUrl = 'https://dobbiniplaw.com'
  const fullTitle = title ? `${title} | Dobbin IP Law P.C.` : 'Dobbin IP Law P.C. | Protecting Your Work'
  const canonicalUrl = `${baseUrl}${path}`

  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
      
      // Open Graph for social media
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
      { name: 'twitter:image', content: `${baseUrl}${ogImage}` }, // ← ADD this line
      
      // 🆕 ADD: Local SEO (Utah-based law firm)
      { name: 'geo.region', content: 'US-UT' },
      { name: 'geo.placename', content: 'West Valley City' },
      { name: 'geo.position', content: '40.73315967932904;-111.9405988853505' }, // ← Complete coordinates
      
      // Additional SEO meta tags
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: author },
      { name: 'language', content: 'en-US' },
      { name: 'hreflang', content: 'en-US' },
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
      ...(type === 'article' ? [{ property: 'article:author', content: author }] : [])
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  })
}

export const useBaseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dobbin IP Law P.C.",
    "image": "https://dobbiniplaw.com/img/geoff-dobbin.jpg", // ← Fix image path
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
    "serviceType": "Legal Services",
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
    }
  }
}

export const useStructuredData = (additionalData = {}) => {
  const baseSchema = useBaseSchema()
  const schema = { ...baseSchema, ...additionalData }
  
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema)
      }
    ]
  })
}