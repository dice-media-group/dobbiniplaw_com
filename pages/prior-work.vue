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
</script>

<style scoped>
.prior-work-page {
  font-family: 'Crimson Text', Georgia, 'Times New Roman', serif;
}
</style>