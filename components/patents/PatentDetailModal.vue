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
          <div class="patent-image-container">
            <div v-if="hasRealImage" class="flex items-center justify-center">
              <img 
                :src="getFullSizeImage" 
                :alt="patent.title"
                class="patent-full-image"
              />
            </div>
            <div v-else class="w-full h-64 patent-default-image">
              <!-- Background styles will show the SVG -->
            </div>
          </div>
          
          <!-- Thumbnail Carousel -->
          <div class="flex overflow-x-auto scrollbar-hide p-3 bg-dobbin-gray gap-3">
            <!-- For each image in the patent -->
            <div 
              v-for="(image, index) in patent.images" 
              :key="index" 
              class="flex-none w-24 h-24 rounded overflow-hidden"
              :class="{'ring-2 ring-dobbin-bright-green': selectedImageIndex === index}"
              @click="selectedImageIndex = index"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  patent: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);
const selectedImageIndex = ref(0);

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
  min-height: 250px;
  max-height: 45vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000;
  padding: 1rem;
}

.patent-full-image {
  max-width: 100%;
  max-height: 40vh;
  object-fit: contain;
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
    min-height: 300px;
    max-height: 40vh;
  }
  
  .patent-full-image {
    max-height: 35vh;
  }
  
  .patent-details-scroll {
    max-height: calc(90vh - 450px); /* Adjusted to ensure proper scrolling */
  }
}
</style>