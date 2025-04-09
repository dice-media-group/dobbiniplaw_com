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
    <PatentCarousel ref="carousel" />
    
    <!-- Call to Action Button -->
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
    
    <!-- Debug Info - remove in production -->
    <DebugInfo 
      v-if="debug"
      :patent-count="patentCount" 
      :source="contentSource" 
      :current-patent="currentPatentTitle"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PatentCarousel from '~/components/PatentCarousel.vue';
import DebugInfo from '~/components/DebugInfo.vue';

// Toggle debug mode (set to false for production)
const debug = ref(true);
const carousel = ref(null);

// Computed props for debug display
const patentCount = computed(() => {
  if (!carousel.value) return 0;
  return carousel.value.slides?.length || 0;
});

const contentSource = computed(() => {
  if (!carousel.value) return 'Loading...';
  return carousel.value.fromMarkdown ? 'Markdown Content' : 'Fallback Data';
});

const currentPatentTitle = computed(() => {
  if (!carousel.value || !carousel.value.currentSlide) return 'None';
  return carousel.value.currentSlide.title || 'Unknown';
});

// Fetch data for patents
const { data: pageContent } = await useAsyncData('prior-work', () => 
  queryContent('/prior-work').find()
);

// Check content after mount
onMounted(() => {
  console.log('Prior Work Page Mounted');
  console.log('Patent Carousel:', carousel.value);
  if (carousel.value) {
    console.log('Slides count:', carousel.value.slides?.length);
    console.log('Using markdown:', carousel.value.fromMarkdown);
  }
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