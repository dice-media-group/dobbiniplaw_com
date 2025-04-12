<template>
  <div class="patent-carousel relative">
    <!-- Carousel container with full-width background -->
    <div class="carousel-bg py-20 relative">
      <!-- Loading state -->
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-dobbin-dark-green mb-2"></div>
          <p class="text-dobbin-dark-green font-medium">Loading patents...</p>
        </div>
      </div>
      
      <!-- Navigation arrows - positioned with higher z-index to stay above slides -->
      <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full"
        aria-label="Previous slide"
        v-if="hasValidPatents && allPatents.length > 1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full"
        aria-label="Next slide"
        v-if="hasValidPatents && allPatents.length > 1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Debug Panel -->
      <DebugPanel 
        v-if="showDebug" 
        :patents="allPatents" 
        :currentIndex="currentIndex" 
        :fromMarkdown="fromMarkdown" 
        :queryError="queryError" 
        @close="showDebug = false"
      />
      
      <!-- Toggle Debug Button -->
      <button 
        @click="showDebug = !showDebug" 
        class="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      <!-- Error message if no patents are loaded -->
      <div v-if="!isLoading && !hasValidPatents" class="container mx-auto px-4 text-center py-8">
        <p class="text-red-600">No patent data available. Please try refreshing the page.</p>
        <button @click="refreshPatents" class="mt-4 bg-dobbin-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-4 rounded">
          Refresh Data
        </button>
      </div>
      
      <!-- Carousel content aligned with text container -->
      <div v-if="!isLoading && hasValidPatents" class="container mx-auto px-4">
        <!-- Removed max-width to match paragraph width -->
        <div class="mx-auto"> 
          <!-- Carousel slide container -->
          <div class="slide-container bg-white shadow-lg rounded overflow-hidden">
            <!-- Slide container -->
            <div class="relative">
              <PatentSlide 
                v-for="(patent, idx) in allPatents" 
                :key="'patent-' + idx" 
                :patent="patent" 
                :isActive="idx === currentIndex"
                :slideDirection="direction"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { usePatents } from '~/composables/usePatents';
import PatentSlide from '~/components/PatentSlide.vue';
import DebugPanel from '~/components/DebugPanel.vue';

// For debugging
const showDebug = ref(false);
const queryError = ref(null);

// Set up the slide index
const currentIndex = ref(0);

// Animation direction
const direction = ref('right'); // 'right' or 'left'

// Use our patent data composable
const { 
  patents: allPatents, 
  isLoading, 
  error,
  fromMarkdown,
  fetchPatents,
  refreshPatents
} = usePatents();

// Check if we have valid patents
const hasValidPatents = computed(() => {
  return allPatents.value && 
         Array.isArray(allPatents.value) && 
         allPatents.value.length > 0 && 
         allPatents.value.every(patent => patent !== undefined);
});

// Watch for errors
watch(error, (newError) => {
  if (newError) {
    queryError.value = newError;
    console.error('Patent fetch error:', newError);
  }
});

// Current slide based on index - with safety checks
const currentSlide = computed(() => {
  if (hasValidPatents.value && currentIndex.value < allPatents.value.length) {
    return allPatents.value[currentIndex.value];
  }
  return null;
});

// Previous slide navigation with animation direction and safety checks
const prevSlide = () => {
  if (hasValidPatents.value) {
    direction.value = 'left';
    currentIndex.value = (currentIndex.value - 1 + allPatents.value.length) % allPatents.value.length;
  }
};

// Next slide navigation with animation direction and safety checks
const nextSlide = () => {
  if (hasValidPatents.value) {
    direction.value = 'right';
    currentIndex.value = (currentIndex.value + 1) % allPatents.value.length;
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
  allPatents,
  currentSlide,
  fromMarkdown,
  prevSlide,
  nextSlide,
  currentIndex,
  refreshPatents
});

let intervalId = null;

// Set up autoplay if enabled
const setupAutoplay = () => {
  if (props.autoplay && props.interval > 0 && hasValidPatents.value) {
    // Clear any existing interval first
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    // Set up new interval
    intervalId = setInterval(() => {
      nextSlide();
    }, props.interval);
    
    console.log(`Autoplay enabled with interval: ${props.interval}ms`);
  }
};

// Initialize content on mount
onMounted(async () => {
  console.log('PatentCarousel mounted');
  
  // Fetch patents
  await fetchPatents();
  
  // Setup autoplay if enabled
  if (props.autoplay && hasValidPatents.value) {
    setupAutoplay();
  }
});

// Watch for patent data changes to setup autoplay
watch(hasValidPatents, (newValue) => {
  if (newValue && props.autoplay) {
    setupAutoplay();
  }
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
  background-image: url('/img/Patent-Diagram.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #e5ede8; /* Light green color as fallback and overlay tint */
  background-blend-mode: overlay; /* Blend the image with the background color */
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
  background-color: rgba(32, 108, 70, 0.1); /* Light green overlay */
  z-index: -1;
}

/* Fixed height container for slides to prevent layout shifts */
.slide-container {
  position: relative;
  min-height: 550px;
}

/* Animations disabled */
.slide-enter-active,
.slide-leave-active,
.slide-enter-from,
.slide-leave-to {
  transition: none;
  position: absolute;
  width: 100%;
  transform: none;
  opacity: 1;
}
</style>