<template>
  <div class="patent-carousel relative">
    <!-- Carousel container with full-width background -->
    <div class="carousel-bg py-12 relative">
      <!-- Navigation arrows -->
      <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-dobbin-dark-green/80 hover:bg-dobbin-dark-green text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-dobbin-dark-green/80 hover:bg-dobbin-dark-green text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Carousel content -->
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div v-if="slides.length > 0" class="flex flex-col md:flex-row bg-white shadow-lg rounded overflow-hidden">
            <!-- Slide image -->
            <div class="md:w-1/2 p-6 flex items-center justify-center">
              <img 
                :src="slides[currentSlide].image" 
                :alt="slides[currentSlide].title" 
                class="max-w-full max-h-64 object-contain"
              />
            </div>
            
            <!-- Slide content -->
            <div class="md:w-1/2 p-6 bg-white">
              <h3 class="text-xl font-bold mb-4 text-dobbin-dark-green">{{ slides[currentSlide].title }}</h3>
              <p class="mb-6 text-gray-700">{{ slides[currentSlide].description }}</p>
              <a 
                :href="slides[currentSlide].patentNumber ? '#' + slides[currentSlide].patentNumber : '#'"
                class="inline-block bg-dobbin-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-4 rounded"
              >
                {{ slides[currentSlide].linkText || 'Patent ' + slides[currentSlide].patentNumber }}
              </a>
            </div>
          </div>
          
          <!-- Slide indicators -->
          <div class="flex justify-center mt-6">
            <button 
              v-for="(slide, index) in slides" 
              :key="index"
              @click="currentSlide = index"
              class="w-3 h-3 rounded-full mx-1"
              :class="index === currentSlide ? 'bg-dobbin-green' : 'bg-gray-300'"
              :aria-label="'Go to slide ' + (index + 1)"
            ></button>
          </div>
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
    default: true
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
  background-image: url('/img/Patent-Diagram.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Ensure the background has a green tint */
.carousel-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(32, 108, 70, 0.2); /* Green tint overlay */
  z-index: -1;
}
</style>