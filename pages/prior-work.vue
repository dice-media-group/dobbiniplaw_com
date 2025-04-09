<template>
  <div>
    <!-- Header Section -->
    <HeroBanner title="Prior Work" />
    
    <!-- Intro Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <p class="mb-6 text-base leading-relaxed text-gray-700">
            Patents have been secured in a wide range of technical fields, including: flashlights & worklights, laboratory equipment, hunting & fishing equipment, 
            computer hardware/architecture, animal leashes, household items, semiconductors, lasers and LEDs, dentistry, mailboxes, forensics, exercise equipment, 
            games, and especially firearms, ordinance, and firearm accessories. Many trademarks and copyrights have also been registered.
          </p>
          
          <p class="mb-10 text-base leading-relaxed text-gray-700">
            Below, are some actual examples of past work. To view click the patent number.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Patent Carousel Section with full-width background -->
    <PatentCarousel />
    
    <!-- Call to Action Button -->
    <section class="py-12 bg-white text-center">
      <div class="container mx-auto px-4">
        <a href="#" class="inline-block bg-dobbin-dark-green hover:bg-dobbin-green text-white font-bold py-3 px-8 transition-colors duration-300">
          To see more, please click here.
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import PatentCarousel from '~/components/PatentCarousel.vue';

useHead({
  title: 'Prior Work | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Examples of our past work in patents, trademarks, and copyrights across various technical fields.' }
  ]
})
</script>

<style scoped>
/* Add custom styling here if needed */
</style>