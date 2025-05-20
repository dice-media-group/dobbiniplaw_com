<template>
  <div v-if="patent" class="fixed inset-0 z-30">
    <!-- Darkened/blurred backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>

    <!-- Netflix-style dialog container -->
    <div class="fixed inset-0 sm:inset-6 flex items-center justify-center">
      <!-- Modal content container -->
      <div class="w-full h-full sm:h-[90vh] max-w-6xl mx-auto bg-dobbin-gray overflow-hidden flex flex-col sm:rounded-lg shadow-2xl patent-modal-container">
        <!-- Close button - Positioned at top-right corner of the dialog -->
        <button 
          class="absolute right-3 top-3 z-50 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
          @click="$emit('close')"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
          
        <!-- Main patent image header section with auto-sizing container -->
        <div class="w-full bg-black patent-image-section">
          <!-- Auto-sizing container for image display -->
          <div class="patent-image-container relative">
            <!-- Image display with adaptive sizing and zoom controls -->
            <div v-if="hasRealImage" class="flex items-center justify-center h-full w-full relative">
              <div 
                class="overflow-hidden relative flex-grow flex items-center justify-center"
                @wheel.prevent="handleZoomWheel"
              >
                <img 
                  :src="getFullSizeImage" 
                  :alt="patent.title"
                  :style="`transform: scale(${zoomLevel}); transform-origin: center;`"
                  class="patent-full-image transition-transform duration-200"
                  :class="{ 'object-cover max-w-full max-h-none': fitToWidth, 'object-contain max-h-[55vh] max-w-none': !fitToWidth }"
                />
              </div>
              
              <!-- Zoom controls -->
              <div class="absolute bottom-4 left-4 flex space-x-2 z-10">
                <button 
                  @click="zoomOut" 
                  class="bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full transition-colors"
                  :disabled="zoomLevel <= 1"
                  :class="{'opacity-50': zoomLevel <= 1}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <button 
                  @click="resetZoom" 
                  class="bg-black bg-opacity-60 hover:bg-opacity-80 px-3 py-2 rounded-full transition-colors text-white text-xs"
                >
                  {{ Math.round(zoomLevel * 100) }}%
                </button>
                <button 
                  @click="zoomIn" 
                  class="bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full transition-colors"
                  :disabled="zoomLevel >= 3"
                  :class="{'opacity-50': zoomLevel >= 3}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div v-else class="w-full h-64 patent-default-image">
              <!-- Background styles will show the SVG -->
            </div>
            
            <!-- Fit to width toggle button -->
            <button 
              @click="toggleFitMode" 
              class="absolute bottom-4 right-14 bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full transition-colors"
              v-if="hasRealImage"
              :title="fitToWidth ? 'Show entire image' : 'Fit to width'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
              </svg>
            </button>
            
            <!-- Fullscreen button -->
            <button 
              @click="toggleFullscreen" 
              class="absolute bottom-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full transition-colors"
              v-if="hasRealImage"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </button>
          </div>
          
          <!-- Thumbnail Carousel -->
          <div class="flex overflow-x-auto scrollbar-hide p-3 bg-dobbin-gray gap-3">
            <!-- For each image in the patent -->
            <div 
              v-for="(image, index) in patent.images" 
              :key="index" 
              class="flex-none w-24 h-24 rounded overflow-hidden"
              :class="{'ring-2 ring-dobbin-bright-green': selectedImageIndex === index}"
              @click="selectThumbnail(index)"
            >
              <!-- Display the image if it's a real image -->
              <div v-if="isRealImage(image)" class="w-full h-full bg-black">
                <img 
                  :src="getImageThumbnail(image)" 
                  :alt="`Drawing ${index+1}`"
                  class="w-full h-full object-contain"
                />
              </div>
              <!-- Otherwise display the gear SVG -->
              <div v-else class="w-full h-full patent-default-image-thumbnail"></div>
            </div>

            <!-- When no images are available -->
            <div v-if="!patent.images || patent.images.length === 0" class="flex-none w-24 h-24 bg-gray-700 flex items-center justify-center rounded patent-default-image-thumbnail">
              <!-- Background styles will show the SVG -->
            </div>
          </div>
        </div>
        
        <!-- Scrollable Content Section -->
        <div class="flex-1 overflow-y-auto patent-details-scroll">
          <!-- Patent Details -->
          <div class="p-4 sm:p-6 bg-dobbin-gray text-white">
            <!-- Title and Year -->
            <h2 class="text-2xl md:text-3xl font-bold mb-2 leading-tight text-gray-300">{{ patent.title }}</h2>
            <p class="text-lg text-gray-300 mb-4">{{ getPatentYear }}</p>
            
            <!-- Google Patents Link Button -->
            <a 
              :href="`https://patents.google.com/patent/${patent.id.replace(/-/g, '')}`"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full mb-6 bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white py-3 px-4 rounded-md flex items-center justify-center font-bold text-base transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 mr-2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              View on Google Patents
            </a>
            
            <!-- Abstract Section -->
            <div class="mb-6">
              <h3 class="text-xl font-medium mb-2 text-gray-300">Abstract</h3>
              <p class="text-base text-gray-300">
                {{ patent.abstract || 'This patent describes a novel approach to technology in its field. The invention provides significant improvements in efficiency and usability compared to prior art solutions.' }}
              </p>
            </div>
            
            <!-- Details Section -->
            <div class="space-y-3 mb-6"> 
              <div class="flex items-start">
                <span class="text-dobbin-bright-green text-lg mr-2">•</span>
                <div>
                  <span class="font-medium">Inventor:</span>
                  <span class="text-gray-300 ml-2">{{ patent.inventors?.join(', ') || 'Not specified' }}</span>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-dobbin-bright-green text-lg mr-2">•</span>
                <div>
                  <span class="font-medium">Assignee:</span>
                  <span class="text-gray-300 ml-2">{{ patent.assignee || 'Not specified' }}</span>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-dobbin-bright-green text-lg mr-2">•</span>
                <div>
                  <span class="font-medium">Patent ID:</span>
                  <span class="text-gray-300 ml-2">{{ patent.id }}</span>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-dobbin-bright-green text-lg mr-2">•</span>
                <div>
                  <span class="font-medium">Publication Date:</span>
                  <span class="text-gray-300 ml-2">{{ formatDate }}</span>
                </div>
              </div>
            </div>
            
            <!-- Bottom padding for scrolling -->
            <div class="pb-8"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Fullscreen modal -->
    <div v-if="isFullscreen" class="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button 
        @click="isFullscreen = false" 
        class="absolute right-4 top-4 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img 
        :src="getFullSizeImage" 
        :alt="patent.title"
        class="max-w-[90%] max-h-[90vh] object-contain"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  patent: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);
const selectedImageIndex = ref(0);
const isFullscreen = ref(false);
const zoomLevel = ref(1);
const fitToWidth = ref(true); // Default to fit to width mode

// Reset zoom when changing images
watch(selectedImageIndex, () => {
  resetZoom();
});

// Zoom functions
function zoomIn() {
  if (zoomLevel.value < 3) {
    zoomLevel.value = Math.min(3, zoomLevel.value + 0.25);
  }
}

function zoomOut() {
  if (zoomLevel.value > 1) {
    zoomLevel.value = Math.max(1, zoomLevel.value - 0.25);
  }
}

function resetZoom() {
  zoomLevel.value = 1;
}

function handleZoomWheel(event) {
  if (event.deltaY < 0 && zoomLevel.value < 3) {
    zoomIn();
  } else if (event.deltaY > 0 && zoomLevel.value > 1) {
    zoomOut();
  }
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;
}

function toggleFitMode() {
  fitToWidth.value = !fitToWidth.value;
  // Reset zoom when toggling fit mode
  resetZoom();
}

function selectThumbnail(index) {
  selectedImageIndex.value = index;
  // Reset zoom and fit mode when selecting a new image
  resetZoom();
}

// Computed property for checking if the patent has real images
const hasRealImage = computed(() => {
  if (!props.patent || !props.patent.images || props.patent.images.length === 0) {
    return false;
  }
  
  // Check if any image is a placeholder
  for (const image of props.patent.images) {
    if (typeof image === 'string' && image.includes('placeholder')) {
      return false;
    } else if (image.thumbnail && image.thumbnail.includes('placeholder')) {
      return false;
    } else if (image.hires && image.hires.includes('placeholder')) {
      return false;
    }
  }
  
  return true;
});

// Computed property specifically for the full-sized image in the modal
const getFullSizeImage = computed(() => {
  if (hasRealImage.value && props.patent.images[selectedImageIndex.value]) {
    const image = props.patent.images[selectedImageIndex.value];
    
    // Always prefer high-resolution images
    if (typeof image === 'object' && image.hires) {
      return image.hires;
    } else if (typeof image === 'string') {
      return image;
    } else if (image.thumbnail) {
      return image.thumbnail;
    }
  }
  
  return '/img/gear_only.svg';
});

// Computed property for formatted date
const formatDate = computed(() => {
  if (!props.patent?.publicationDate) return '';
  const date = new Date(props.patent.publicationDate);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
});

// Computed property for patent year
const getPatentYear = computed(() => {
  if (!props.patent?.publicationDate) return '';
  const date = new Date(props.patent.publicationDate);
  return date.getFullYear().toString();
});

// Check if an individual image is a real image (not a placeholder)
function isRealImage(image) {
  if (!image) {
    return false;
  }
  
  if (typeof image === 'string' && image.includes('placeholder')) {
    return false;
  } else if (image.thumbnail && image.thumbnail.includes('placeholder')) {
    return false;
  } else if (image.hires && image.hires.includes('placeholder')) {
    return false;
  }
  
  // Check if it's a valid image path
  if (typeof image === 'string' && image.match(/\.(jpeg|jpg|gif|png|svg)$/i)) {
    return true;
  } else if (image.thumbnail && image.thumbnail.match(/\.(jpeg|jpg|gif|png|svg)$/i)) {
    return true;
  } else if (image.hires && image.hires.match(/\.(jpeg|jpg|gif|png|svg)$/i)) {
    return true;
  }
  
  return false;
}

function getImageThumbnail(image) {
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return image;
  } else if (image && image.thumbnail) {
    return image.thumbnail;
  }
  return '/img/gear_only.svg';
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Patent Modal Container */
.patent-modal-container {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

/* Patent image section - fixed at top */
.patent-image-section {
  flex-shrink: 0;
}

/* Scrollable details section */
.patent-details-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  flex-grow: 1;
}

.patent-details-scroll::-webkit-scrollbar {
  width: 8px;
}

.patent-details-scroll::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.patent-details-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

/* Patent image container styles for better image display */
.patent-image-container {
  min-height: 300px;
  height: 55vh; /* Increase height allocation */
  max-height: 65vh; /* Allow more vertical space */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000;
  padding: 1rem;
}

.patent-full-image {
  min-height: 250px; /* Ensure minimum size */
  min-width: 250px; /* Ensure minimum size */
  display: block;
}

/* Patent default image styling */
.patent-default-image {
  background-image: url('/img/gear_only.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 31px 31px;
  background-color: #111;
}

/* Smaller thumbnail version */
.patent-default-image-thumbnail {
  background-image: url('/img/gear_only.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 31px 31px;
  background-color: #111;
}

/* Tablet & Desktop specific styles */
@media (min-width: 800px) {
  .patent-modal-container {
    height: auto;
    max-height: 90vh;
  }
  
  .patent-image-container {
    min-height: 350px;
    height: 55vh;
  }
  
  .patent-full-image {
    min-height: 300px;
    min-width: 300px;
  }
  
  .patent-details-scroll {
    max-height: calc(90vh - 450px); /* Adjusted to ensure proper scrolling */
  }
}
</style>