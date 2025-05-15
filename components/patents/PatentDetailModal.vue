<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
    @click.self="close"
  >
    <div class="bg-gray-800 w-11/12 max-w-4xl rounded-lg overflow-hidden relative max-h-[90vh] overflow-y-auto">
      <button 
        class="absolute right-4 top-4 text-gray-400 hover:text-white"
        @click="close"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 p-6">
          <div class="main-image bg-gray-700 rounded overflow-hidden mb-4">
            <img 
              v-if="selectedImage"
              :src="selectedImage" 
              :alt="patent.title"
              class="w-full h-auto"
            />
            <div v-else class="h-64 flex items-center justify-center">
              <span class="text-gray-400">No image available</span>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="(image, index) in patent.images" 
              :key="index"
              class="w-24 h-24 bg-gray-700 rounded overflow-hidden cursor-pointer"
              :class="{'ring-2 ring-blue-500': selectedImage === image}"
              @click="selectedImage = image"
            >
              <img 
                :src="image"
                :alt="`Drawing ${index+1}`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div class="md:w-1/2 p-6">
          <h2 class="text-2xl font-bold mb-2 text-white">{{ patent.title }}</h2>
          <p class="text-gray-300 mb-4">Patent {{ patent.id }}</p>
          <p class="text-gray-300 mb-4">Published: {{ formatDate(patent.publicationDate) }}</p>
          
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
              <span class="text-white">{{ patent.imagePages || 'Not available' }}</span>
            </div>
          </div>
          
          <div class="mt-6">
            <a 
              :href="`https://patents.google.com/patent/${patent.id.replace(/-/g, '')}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-400 hover:underline text-sm flex items-center"
            >
              View on Google Patents →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

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
const selectedImage = ref(props.patent?.images?.[0] || null);

watch(() => props.patent, (newPatent) => {
  selectedImage.value = newPatent?.images?.[0] || null;
}, { immediate: true });

function close() {
  emit('close');
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>