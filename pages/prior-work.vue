<template>
  <div>
    <!-- Header Section -->
    <HeroBanner title="Prior Work" />
    
    <!-- Intro Section -->
    <section class="py-8 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <p class="text-base leading-relaxed text-gray-700">
            Below, are some actual examples of past work. To view click the patent number.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Patent Carousel Section with full-width background -->
    <PatentCarousel />
    
    <!-- Call to Action Button - styled exactly as shown in screenshot -->
    <section class="py-12 bg-white text-center">
      <div class="container mx-auto px-4">
        <a 
          href="#" 
          class="inline-block bg-dobbin-dark-green hover:bg-dobbin-green text-white font-bold py-3 px-6"
        >
          To see more, please click here.
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import PatentCarousel from '~/components/PatentCarousel.vue';

// Attempt to fetch content from markdown if available
const { data: pageContent } = await useAsyncData('prior-work', () => 
  queryContent('/prior-work').find()
);

// Fallback text if content module fails or content is not available
const introText = computed(() => {
  if (pageContent.value && pageContent.value.length > 0) {
    return pageContent.value[0].body;
  }
  return "Below, are some actual examples of past work. To view click the patent number.";
});

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