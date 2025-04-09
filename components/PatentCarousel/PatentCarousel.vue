<template>
  <div class="patent-carousel relative">
    <div class="carousel-bg py-20 relative">
      <!-- Navigation Buttons -->
      <CarouselNavigation
        @prev="handlePrev"
        @next="handleNext"
      />
      
      <!-- Debug Panel -->
      <DebugPanel
        :show="showDebug"
        :patents="allPatents"
        :current-index="currentIndex"
        :from-markdown="fromMarkdown"
        :query-error="queryError"
        @update:show="showDebug = $event"
      />
      
      <!-- Main Carousel Content -->
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="overflow-hidden bg-white shadow-lg rounded" style="min-height: 400px;">
            <PatentSlide
              :patents="allPatents"
              :current-index="currentIndex"
              :direction="direction"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { usePatents } from '~/composables/usePatents';
import CarouselNavigation from './CarouselNavigation.vue';
import DebugPanel from './DebugPanel.vue';
import PatentSlide from './PatentSlide.vue';

// State
const currentIndex = ref(0);
const direction = ref('right');
const showDebug = ref(false);

// Use patents composable
const {
  allPatents,
  fromMarkdown,
  queryError,
  refreshContent
} = usePatents();

// Add watch for debugging
watch(allPatents, (newValue) => {
  console.log('Patents available:', newValue.length);
}, { immediate: true });

watch(currentIndex, (newValue) => {
  console.log('Current index:', newValue);
});

// Navigation methods
const handlePrev = () => {
  console.log('Previous clicked, current patents:', allPatents.value.length);
  if (allPatents.value && allPatents.value.length > 0) {
    direction.value = 'left';
    currentIndex.value = (currentIndex.value - 1 + allPatents.value.length) % allPatents.value.length;
    console.log('New index:', currentIndex.value);
  }
};

const handleNext = () => {
  console.log('Next clicked, current patents:', allPatents.value.length);
  if (allPatents.value && allPatents.value.length > 0) {
    direction.value = 'right';
    currentIndex.value = (currentIndex.value + 1) % allPatents.value.length;
    console.log('New index:', currentIndex.value);
  }
};

// Props
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

// Autoplay handling
let intervalId = null;

onMounted(async () => {
  console.log('Component mounted');
  await refreshContent();
  console.log('Content refreshed, patents:', allPatents.value.length);
  
  if (props.autoplay && allPatents.value.length > 0) {
    intervalId = setInterval(handleNext, props.interval);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

// Expose methods for parent components
defineExpose({
  prevSlide: handlePrev,
  nextSlide: handleNext,
  refreshContent
});
</script>

<style scoped>
.carousel-bg {
  background-image: url('/img/Patent-Diagram.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #e5ede8;
  background-blend-mode: overlay;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.carousel-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(32, 108, 70, 0.1);
  z-index: -1;
}
</style>