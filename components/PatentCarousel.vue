<template>
  <div class="patent-carousel relative">
    <!-- Carousel container with full-width background -->
    <div class="carousel-bg py-16 relative">
      <!-- Navigation arrows -->
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
      
      <!-- Carousel content -->
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto" v-if="slides.length > 0">
          <div class="flex flex-col md:flex-row bg-white shadow-lg overflow-hidden">
            <!-- Slide image -->
            <div class="md:w-1/2 p-8 flex items-center justify-center bg-white border-r border-gray-200">
              <img 
                :src="currentSlide.image" 
                :alt="currentSlide.title" 
                class="max-w-full max-h-64 object-contain"
              />
            </div>
            
            <!-- Slide content -->
            <div class="md:w-1/2 p-8 bg-white">
              <h3 class="text-xl font-bold mb-4 text-dobbin-dark-green">{{ currentSlide.title }}</h3>
              <p class="mb-6 text-gray-700">{{ currentSlide.description }}</p>
              <a 
                :href="currentSlide.patentNumber ? '#' + currentSlide.patentNumber : '#'"
                class="inline-block bg-dobbin-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-4"
              >
                {{ currentSlide.linkText || 'Patent ' + currentSlide.patentNumber }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

// For debugging purposes
const fromMarkdown = ref(false);

// Set up the slide index
const currentIndex = ref(0);

// Use Nuxt Content module to fetch patent data
const { data: patentContent } = await useAsyncData('patents', () => 
  queryContent('/patents').sort({ order: 1 }).find()
);

// Fallback data in case content fetching fails
const fallbackPatents = [
  {
    title: "Monolithic LED Chip to Emit Multiple Colors",
    description: "A light emitting diode chip with red, green and blue light emission regions on a single substrate. The light emission regions may be powered selectively to only emit one color light at a time. Or all three regions may be powered simultaneously so that the LED chip emits white light.",
    image: "/img/led-chip.png",
    patentNumber: "7,271,420",
    linkText: "Patent 7,271,420"
  },
  {
    title: "Magazine Grip",
    description: "A magazine grip attachment for ammunition magazines to aid in extraction of magazines from ammunition pouches, providing better grip and reducing noise.",
    image: "/img/magazine-grip.png",
    patentNumber: "9,341,429",
    linkText: "Patent 9,341,429"
  },
  {
    title: "Firearm Gas System",
    description: "A gas system for a firearm comprising a hollow gas tube extending between a forward gas tap in a firearm's barrel and a rearward piston assembly to operate the bolt system.",
    image: "/img/firearm-gas.png",
    patentNumber: "8,689,672",
    linkText: "Patent 8,689,672"
  },
  {
    title: "Security Mailbox",
    description: "A security mailbox utilizing a combination package rest and security panel, with a mail slot to prevent easy access to contents.",
    image: "/img/security-mailbox.png",
    patentNumber: "8,757,494",
    linkText: "Patent 8,757,494"
  }
];

// Slides from markdown or fallback
const slides = computed(() => {
  // Check if we have valid content from markdown
  if (patentContent.value && patentContent.value.length > 0) {
    fromMarkdown.value = true;
    console.log('Using markdown content:', patentContent.value);
    return patentContent.value;
  }
  
  // Use fallback if no markdown content
  console.log('Using fallback patent data');
  fromMarkdown.value = false;
  return fallbackPatents;
});

// Current slide based on index
const currentSlide = computed(() => {
  if (slides.value.length > 0) {
    return slides.value[currentIndex.value];
  }
  return null;
});

// Previous slide navigation
const prevSlide = () => {
  if (slides.value.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  }
};

// Next slide navigation
const nextSlide = () => {
  if (slides.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  }
};

// Props for configuration
const props = defineProps({
  autoplay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 5000
  }
});

// Expose properties and methods for parent components
defineExpose({
  slides,
  currentSlide,
  fromMarkdown,
  prevSlide,
  nextSlide
});

let intervalId = null;

// Set up autoplay if enabled
onMounted(() => {
  if (props.autoplay && slides.value.length > 0) {
    intervalId = setInterval(nextSlide, props.interval);
  }
  
  // Log content for debugging
  console.log('Patent content loaded:', patentContent.value);
  console.log('Using content from markdown:', fromMarkdown.value);
});

// Clean up interval on component unmount
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