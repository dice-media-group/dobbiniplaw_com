<template>
  <HelpfulLinks />
</template>

<script setup>
import HelpfulLinks from '../components/HelpfulLinks.vue';

// Add enhanced SEO for the helpful links page
useSEO({
  title: 'Helpful Links & Resources',
  description: 'Save time with our curated guide to essential IP resources. Find direct links to the USPTO, U.S. Copyright Office & other key sites for inventors & creators.',
  path: '/helpful-links/',
  keywords: 'IP resources, patent search tools, trademark databases, USPTO links, intellectual property resources, patent office links, inventor resources'
})
// ✅ ADD: Import the structured data function
const { useStructuredData } = await import('~/composables/useSEO.js')


// Add structured data for the resource page
useStructuredData({
  "@type": ["LocalBusiness", "LegalService", "WebPage"],
  "mainEntity": {
    "@type": "ItemList",
    "name": "Intellectual Property Resources",
    "description": "Curated list of helpful IP resources and tools",
    "itemListElement": [
      {
        "@type": "WebSite",
        "name": "USPTO Patent Database",
        "description": "Official patent search and database"
      },
      {
        "@type": "WebSite", 
        "name": "USPTO Trademark Database",
        "description": "Official trademark search and registration"
      },
      {
        "@type": "WebSite",
        "name": "Copyright Office",
        "description": "Official copyright registration and information"
      }
    ]
  },
  "knowsAbout": [
    "Patent Resources",
    "Trademark Resources", 
    "Copyright Resources",
    "IP Research Tools",
    "Government Resources"
  ]
})
</script>
