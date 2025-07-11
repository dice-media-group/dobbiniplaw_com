<template>
  <div class="prior-work-page">
    <HeroBanner title="Prior Work">
      <p class="font-crimson text-white">
      </p>
    </HeroBanner>
    <div class="container mx-auto px-4 py-8">
      
      <p class="text-lg mb-8">
        Patents have been secured in a wide range of technical fields, including: flashlights &amp; worklights, 
        laboratory equipment, hunting &amp; fishing equipment, computer hardware/architecture, animal leashes, 
        household items, semiconductors, lasers and LEDs, dentistry, mailboxes, forensics, exercise equipment, 
        games, and especially firearms, ordinance, and firearm accessories.
      </p>
    <!-- Use the reusable hero banner component with just title -->
      
      <!-- Use our refactored patent carousel -->
      <PatentCarousel :autoplay="true" :interval="6000" />
    </div>
  </div>
</template>

<script setup>
import PatentCarousel from '~/components/PatentCarousel.vue';

// Add enhanced SEO for the prior work portfolio page
useSEO({
  title: 'Patent Portfolio & Prior Work',
  description: 'Explore our extensive patent portfolio across diverse industries including firearms, laboratory equipment, semiconductors, LEDs, dentistry, and more. 25+ years of successful patent applications.',
  path: '/prior-work/',
  keywords: 'patent portfolio, patent examples, successful patents, patent attorney work samples, firearm patents, LED patents, laboratory equipment patents, Utah patent attorney portfolio'
})

// Add structured data for the portfolio
useStructuredData({
  "@type": ["LocalBusiness", "LegalService", "WebPage"],
  "mainEntity": {
    "@type": "CreativeWork",
    "name": "Patent Portfolio",
    "description": "Comprehensive portfolio of successful patent applications across multiple industries",
    "creator": {
      "@type": "Person",
      "name": "Geoff Dobbin",
      "jobTitle": "Patent Attorney"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Patent Services Portfolio",
    "description": "Examples of successful patent applications across diverse technical fields"
  },
  "knowsAbout": [
    "Firearm Patents",
    "LED Technology Patents",
    "Laboratory Equipment Patents", 
    "Semiconductor Patents",
    "Hunting Equipment Patents",
    "Computer Hardware Patents",
    "Exercise Equipment Patents",
    "Dental Equipment Patents",
    "Forensic Equipment Patents"
  ],
  "industryExperience": [
    "Firearms & Ordinance",
    "Optics & LEDs", 
    "Laboratory Equipment",
    "Computer Hardware",
    "Semiconductors",
    "Dentistry",
    "Exercise Equipment",
    "Consumer Products"
  ]
})
</script>

<style scoped>
.prior-work-page {
  font-family: 'Crimson Text', Georgia, 'Times New Roman', serif;
}
</style>