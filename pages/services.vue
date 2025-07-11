<template>
  <div>
    <!-- Use the reusable hero banner component -->
    <HeroBanner title="Our Services">
      <p class="font-crimson text-white">
        At Dobbin IP Law, we offer a range of intellectual property services including patents, trademarks, and copyrights. Contact us to discuss how we can help protect your intellectual property.
      </p>
    </HeroBanner>
    
    <div class="services-page container mx-auto px-4 max-w-6xl py-8">
      <ContentDoc />
    </div>
  </div>
</template>

<script setup>
import HeroBanner from '../components/HeroBanner.vue';

// Enhanced SEO with the new composable
useSEO({
  title: 'Our IP Services',
  description: 'Comprehensive intellectual property services including patent applications, trademark registration, copyright protection, and IP strategy. 25+ years protecting Utah inventors and businesses.',
  path: '/services/',
  keywords: 'intellectual property services, patent services Utah, trademark registration, copyright protection, IP attorney services, patent lawyer Utah, trademark attorney'
})

// Add structured data for service offerings
useStructuredData({
  "@type": ["LocalBusiness", "LegalService"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Intellectual Property Legal Services",
    "description": "Comprehensive IP protection services for inventors, artists, and businesses",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Patent Services",
          "description": "Complete patent application and prosecution services for utility, design, and plant patents",
          "serviceType": "Legal Service",
          "category": "Patent Law"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Trademark Services",
          "description": "Trademark registration, prosecution, and brand protection services",
          "serviceType": "Legal Service", 
          "category": "Trademark Law"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Copyright Services",
          "description": "Copyright registration and protection for creative works and publications",
          "serviceType": "Legal Service",
          "category": "Copyright Law"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IP Strategy Consultation",
          "description": "Strategic intellectual property planning and portfolio development",
          "serviceType": "Legal Consultation"
        }
      }
    ]
  },
  "knowsAbout": [
    "Patent Law",
    "Trademark Law",
    "Copyright Law", 
    "Intellectual Property Strategy",
    "USPTO Procedures",
    "IP Portfolio Management"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "40.73315967932904",
      "longitude": "-111.9405988853505"
    },
    "geoRadius": "50000"
  }
})
</script>

<style scoped>
.services-page {
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
  }
}
</style>