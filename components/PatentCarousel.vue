<template>
  <div class="patent-carousel relative">
    <!-- Carousel container with full-width background - simplified design -->
    <div class="carousel-bg py-16 relative">
      <!-- Navigation arrows - matching the screenshot exactly -->
      <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Carousel content - simplified, showing just the basic structure -->
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <!-- Content is intentionally empty - matching the screenshot -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Use Nuxt Content module to fetch patent data
const { data: patents } = await useAsyncData('patents', () => 
  queryContent('/patents').sort({ order: 1 }).find()
);

// Computed property for slides based on content
const slides = computed(() => {
  return patents.value || [];
});

const currentSlide = ref(0);
let intervalId = null;

const props = defineProps({
  autoplay: {
    type: Boolean,
    default: false // Changed to false to match screenshot
  },
  interval: {
    type: Number,
    default: 5000
  }
});

const nextSlide = () => {
  if (slides.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  }
};

const prevSlide = () => {
  if (slides.value.length > 0) {
    currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
  }
};

// Define exposed data for parent components
const currentPatent = computed(() => {
  if (slides.value.length > 0) {
    return slides.value[currentSlide.value];
  }
  return null;
});

defineExpose({
  currentPatent,
  currentSlide,
  nextSlide,
  prevSlide
});

onMounted(() => {
  if (props.autoplay && slides.value.length > 0) {
    intervalId = setInterval(nextSlide, props.interval);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.carousel-bg {
  background-color: #e5ede8; /* Light green color from screenshot */
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
</style>