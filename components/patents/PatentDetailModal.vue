<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
    @click.self="close"
  >
    <div class="bg-gray-800 w-11/12 max-w-4xl rounded-lg overflow-hidden relative max-h-[90vh] overflow-y-auto">
      <button 
        class="absolute right-4 top-4 text-gray-400 hover:text-white z-10"
        @click="close"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 p-4 md:p-6">
          <div class="main-image bg-gray-700 rounded overflow-hidden mb-4 relative aspect-[4/3]">
            <img 
              v-if="selectedImage"
              :src="getSelectedImageSrc" 
              :alt="getSelectedImageAlt"
              class="w-full h-full object-contain"
              loading="lazy"
            />
            <div v-else class="h-64 flex items-center justify-center">
              <span class="text-gray-400">No image available</span>
            </div>
            
            <!-- Image Navigation Controls -->
            <div class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2">
              <button 
                v-if="patent.images && patent.images.length > 1 && selectedImageIndex > 0"
                @click="selectedImageIndex--" 
                class="bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                v-if="patent.images && patent.images.length > 1 && selectedImageIndex < patent.images.length - 1"
                @click="selectedImageIndex++" 
                class="bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Image count indicator -->
          <div v-if="patent.images && patent.images.length > 1" class="text-center text-gray-400 text-sm mb-2">
            Image {{ selectedImageIndex + 1 }} of {{ patent.images.length }}
          </div>
          
          <div class="flex flex-wrap gap-2 overflow-x-auto pb-2">
            <div 
              v-for="(image, index) in patent.images" 
              :key="index"
              class="w-16 h-16 md:w-20 md:h-20 bg-gray-700 rounded overflow-hidden cursor-pointer"
              :class="{'ring-2 ring-blue-500': selectedImageIndex === index}"
              @click="selectedImageIndex = index"
            >
              <img 
                :src="getImageThumbnail(image, index)"
                :alt="getImageAlt(image, index)"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        <div class="md:w-1/2 p-4 md:p-6">
          <h2 class="text-xl md:text-2xl font-bold mb-2 text-white">{{ patent.title }}</h2>
          <p class="text-gray-300 mb-2 text-sm">Patent {{ patent.id }}</p>
          <p class="text-gray-300 mb-4 text-sm">Published: {{ formatDate(patent.publicationDate) }}</p>
          
          <div class="bg-gray-700 p-4 rounded mb-4">
            <h3 class="text-lg font-medium mb-2 text-white">Abstract</h3>
            <p class="text-sm text-gray-300">
              {{ patent.abstract || 'Abstract not available' }}
            </p>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-lg font-medium text-white">Details</h3>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Inventors</span>
              <span class="text-white">{{ patent.inventors?.join(', ') || 'Not available' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Assignee</span>
              <span class="text-white">{{ patent.assignee || 'Not available' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Image Pages</span>
              <span class="text-white">{{ patent.imagePages || patent.images?.length || 'Not available' }}</span>
            </div>
          </div>
          
          <div class="mt-6 flex flex-wrap gap-3">
            <a 
              :href="`https://patents.google.com/patent/${patent.id.replace(/-/g, '')}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-400 hover:underline text-sm flex items-center"
            >
              View on Google Patents →
            </a>
            
            <button 
              @click="copyUrl"
              class="text-blue-400 hover:underline text-sm flex items-center"
            >
              <span>{{ copySuccess ? 'URL Copied!' : 'Copy Link' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  patent: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);
const selectedImageIndex = ref(0);
const copySuccess = ref(false);
const route = useRoute();

const selectedImage = computed(() => {
  if (!props.patent?.images?.length) return null;
  return props.patent.images[selectedImageIndex.value] || null;
});

const getSelectedImageSrc = computed(() => {
  if (!selectedImage.value) return null;
  
  // Handle both old and new image formats
  if (typeof selectedImage.value === 'string') {
    return selectedImage.value;
  } else if (selectedImage.value.hires) {
    return selectedImage.value.hires; // Use high-res in detail view
  }
  return '/images/patents/placeholder.svg';
});

const getSelectedImageAlt = computed(() => {
  if (!selectedImage.value) return props.patent.title;
  
  // Handle both old and new image formats
  if (typeof selectedImage.value === 'string') {
    return props.patent.title;
  } else if (selectedImage.value.caption) {
    return selectedImage.value.caption;
  }
  return props.patent.title;
});

watch(() => props.patent, () => {
  selectedImageIndex.value = 0;
}, { immediate: true });

function getImageThumbnail(image, index) {
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return image;
  } else if (image && image.thumbnail) {
    return image.thumbnail;
  }
  return '/images/patents/placeholder.svg';
}

function getImageAlt(image, index) {
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return `Drawing ${index+1}`;
  } else if (image && image.caption) {
    return image.caption;
  }
  return `Drawing ${index+1}`;
}

function close() {
  emit('close');
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function copyUrl() {
  try {
    const url = new URL(window.location.href);
    // Ensure patent parameter is set
    url.searchParams.set('patent', props.patent.id);
    navigator.clipboard.writeText(url.toString());
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (error) {
    console.error('Failed to copy URL', error);
  }
}
</script>