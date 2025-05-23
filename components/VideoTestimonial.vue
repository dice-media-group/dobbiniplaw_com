<template>
  <section class="py-10 bg-gray-50">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col md:flex-row gap-6 items-center">
        <!-- Mini Video Thumbnail -->
        <div class="md:w-1/3">
          <div class="relative rounded-lg shadow-lg overflow-hidden cursor-pointer" @click="$emit('openVideo')">
            <img 
              :src="currentThumbnailUrl" 
              :alt="thumbnailAlt" 
              class="w-full h-auto"
              @error="handleImageError"
              @load="handleImageLoad"
            >
            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-30 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Testimonial with specific outcome -->
        <div class="md:w-2/3">
          <blockquote class="italic text-gray-700 text-lg font-crimson mb-4">
            {{ quote }}
          </blockquote>
          <cite class="block text-dobbin-dark-green font-bold font-crimson">{{ attribution }}</cite>
          <div class="mt-6">
            <a :href="ctaLink" class="text-dobbin-dark-green font-semibold hover:underline flex items-center gap-1">
              {{ ctaText }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  thumbnailUrl: {
    type: String,
    required: true
  },
  thumbnailAlt: {
    type: String,
    default: 'Video thumbnail'
  },
  quote: {
    type: String,
    required: true
  },
  attribution: {
    type: String,
    required: true
  },
  ctaLink: {
    type: String,
    default: '/testimonials'
  },
  ctaText: {
    type: String,
    default: 'See what other clients say'
  }
});

defineEmits(['openVideo']);

// Fallback thumbnail URLs for older videos
const thumbnailAttempts = ref(0);
const maxAttempts = 6;

// Extract video ID from the thumbnailUrl
const videoId = computed(() => {
  const match = props.thumbnailUrl.match(/\/vi\/([^\/]+)\//);
  return match ? match[1] : null;
});

// Generate fallback thumbnail URLs - starting with formats that work for ALL videos, including very old ones
const thumbnailUrls = computed(() => {
  if (!videoId.value) return [props.thumbnailUrl];
  
  return [
    // Basic formats that work for ALL videos (including 9+ years old)
    `https://img.youtube.com/vi/${videoId.value}/0.jpg`,        // Most reliable - works for all videos
    `https://img.youtube.com/vi/${videoId.value}/1.jpg`,        // Frame from 25% into video
    `https://img.youtube.com/vi/${videoId.value}/2.jpg`,        // Frame from 50% into video  
    `https://img.youtube.com/vi/${videoId.value}/3.jpg`,        // Frame from 75% into video
    `https://img.youtube.com/vi/${videoId.value}/default.jpg`,  // Default thumbnail
    // Modern formats (may not exist for old videos)
    `https://img.youtube.com/vi/${videoId.value}/hqdefault.jpg` // High quality (newer videos)
  ];
});

const currentThumbnailUrl = computed(() => {
  return thumbnailUrls.value[thumbnailAttempts.value] || props.thumbnailUrl;
});

function handleImageError() {
  console.log(`Thumbnail failed to load: ${currentThumbnailUrl.value}`);
  if (thumbnailAttempts.value < maxAttempts - 1) {
    thumbnailAttempts.value++;
    console.log(`Trying fallback thumbnail: ${thumbnailUrls.value[thumbnailAttempts.value]}`);
  } else {
    console.log('All thumbnail formats failed - video may be private, deleted, or very old');
  }
}

function handleImageLoad() {
  console.log(`Thumbnail loaded successfully: ${currentThumbnailUrl.value}`);
}
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>