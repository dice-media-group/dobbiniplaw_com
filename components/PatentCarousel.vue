<template>
  <div class="patent-carousel relative">
    <!-- Carousel container with full-width background -->
    <div class="carousel-bg py-20 relative">
      <!-- Navigation arrows - positioned with higher z-index to stay above slides -->
      <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full"
        aria-label="Next slide"
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
        v-if="!showDebug"
        @click="showDebug = !showDebug" 
        class="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      <!-- Carousel content -->
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <!-- Carousel slide container with further increased height -->
          <div class="slide-container bg-white shadow-lg rounded overflow-hidden">
            <transition-group 
              name="slide" 
              tag="div"
              class="relative"
            >
              <PatentSlide 
                v-for="(patent, idx) in allPatents" 
                :key="patent.title" 
                :patent="patent" 
                :isActive="idx === currentIndex"
                :slideDirection="direction"
              />
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
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
  fromMarkdown,
  fetchPatents,
  refreshPatents
} = usePatents();

// Current slide based on index
const currentSlide = computed(() => {
  if (allPatents.value.length > 0) {
    return allPatents.value[currentIndex.value];
  }
  return null;
});

// Previous slide navigation with animation direction
const prevSlide = () => {
  if (allPatents.value.length > 0) {
    direction.value = 'left';
    currentIndex.value = (currentIndex.value - 1 + allPatents.value.length) % allPatents.value.length;
  }
};

// Next slide navigation with animation direction
const nextSlide = () => {
  if (allPatents.value.length > 0) {
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

// Initialize content on mount
onMounted(async () => {
  console.log('PatentCarousel mounted');
  
  // Fetch patents
  await fetchPatents();
  
  // Set up autoplay if enabled
  if (props.autoplay && allPatents.value.length > 0) {
    intervalId = setInterval(nextSlide, props.interval);
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

/* Fixed height container for slides to prevent layout shifts - increased height */
.slide-container {
  position: relative;
  min-height: 550px; /* Further increased from 500px to allow more space for vertical positioning */
}

/* Crossfade with scale animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: absolute;
  width: 100%;
}

.slide-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>