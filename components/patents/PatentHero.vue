<template>
  <div class="relative h-96 bg-gradient-to-b from-transparent to-gray-900 mb-12">
    <div class="absolute inset-0 overflow-hidden">
      <img 
        v-if="patent.images && patent.images.length > 0"
        :src="getHeroImageSrc" 
        :alt="getHeroImageAlt" 
        class="w-full h-full object-cover opacity-50"
      />
      <div v-else class="w-full h-full bg-gray-800"></div>
    </div>
    <div class="absolute bottom-0 left-0 p-8 w-full md:w-1/2">
      <h1 class="text-4xl font-bold mb-2 text-white">{{ patent.title }}</h1>
      <p class="text-gray-300 mb-4">Patent {{ patent.id }} • {{ formatDate(patent.publicationDate) }}</p>
      <div class="flex space-x-4">
        <button 
          class="bg-white text-black px-6 py-2 rounded flex items-center font-medium"
          @click="$emit('click')"
        >
          <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  patent: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['click']);

// Get the hero image source, handling both old and new image formats
const getHeroImageSrc = computed(() => {
  if (!props.patent.images || props.patent.images.length === 0) {
    return null;
  }

  const image = props.patent.images[0];
  
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return image;
  } else if (image.hires) {
    return image.hires; // Prefer high-res for hero
  } else if (image.thumbnail) {
    return image.thumbnail;
  }
  
  return '/images/patents/placeholder.svg';
});

// Get the hero image alt text, handling both old and new image formats
const getHeroImageAlt = computed(() => {
  if (!props.patent.images || props.patent.images.length === 0) {
    return props.patent.title;
  }

  const image = props.patent.images[0];
  
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return props.patent.title;
  } else if (image.caption) {
    return image.caption;
  }
  
  return props.patent.title;
});

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>