<template>
  <div 
    v-show="isActive"
    class="flex flex-col md:flex-row w-full patent-slide"
  >
    <!-- Added patent existence check -->
    <template v-if="patent">
      <!-- Slide image with orange background -->
      <div class="md:w-1/2 p-10 bg-white">
        <img 
          v-if="currentImageSrc"
          :src="currentImageSrc" 
          :alt="patent.title" 
          class="max-w-full max-h-96 object-contain patent-image mx-auto"
          @error="handleImageError"
        />
        <div v-else class="flex items-center justify-center h-full">
          <div class="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-gray-500">Image not available</p>
          </div>
        </div>
      </div>
      
      <!-- Slide content -->
      <div class="md:w-1/2 p-10 bg-white">
        <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green patent-title">{{ patent.title }}</h3>
        <p class="mb-8 text-gray-700 patent-description">{{ patent.description }}</p>
        <a 
          :href="getGooglePatentUrl(patent.patentNumber)"
          class="inline-block bg-dobbin-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-6 patent-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ patent.linkText || 'Patent ' + patent.patentNumber }}
        </a>
      </div>
    </template>
    
    <!-- Fallback for undefined patent -->
    <template v-else>
      <div class="w-full p-10 bg-white text-center">
        <p class="text-gray-600">Patent information is currently unavailable.</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Props to receive from parent component
const props = defineProps({
  patent: {
    type: Object,
    default: null // Changed from required to allow null/undefined
  },
  isActive: {
    type: Boolean,
    default: false
  },
  slideDirection: {
    type: String,
    default: 'right'
  }
});

// For image handling
const imageError = ref(false);
const attemptedPaths = ref([]);
const currentImageSrc = ref('');

// Patent type mappings (most common types)
const patentTypeMappings = {
  '7271420': 'B2',
  '9341429': 'B2',
  '8689672': 'B2',
  '8234808': 'B2',
  '6212815': 'B1',
};

// Handle image path changes when patent changes
watch(() => props.patent, (newPatent) => {
  if (newPatent && newPatent.image) {
    resetImageHandling();
    tryLoadImage(getInitialImagePath(newPatent.image));
  } else {
    currentImageSrc.value = '';
  }
}, { immediate: true });

// Reset image handling state
const resetImageHandling = () => {
  imageError.value = false;
  attemptedPaths.value = [];
  currentImageSrc.value = '';
};

// Get the initial image path from the patent
const getInitialImagePath = (imagePath) => {
  if (!imagePath) return null;
  
  // Ensure the image path has a leading slash
  if (!imagePath.startsWith('/')) {
    return `/${imagePath}`;
  }
  
  return imagePath;
};

// Try to load an image with the given path
const tryLoadImage = (path) => {
  if (!path || attemptedPaths.value.includes(path)) return;
  
  console.log(`Trying to load image: ${path}`);
  attemptedPaths.value.push(path);
  currentImageSrc.value = path;
};

/**
 * Handles image loading errors and tries to use fallback paths
 */
const handleImageError = (event) => {
  console.log(`Image failed to load: ${currentImageSrc.value}`);
  imageError.value = true;
  
  // Try alternative paths
  let alternativePaths = [];
  
  // If original path was in the prior-work directory
  if (currentImageSrc.value.includes('/prior-work/')) {
    // Try the direct path
    const filename = currentImageSrc.value.split('/').pop();
    alternativePaths.push(`/img/${filename}`);
  } 
  // If original path was direct in img
  else if (currentImageSrc.value.startsWith('/img/') && !currentImageSrc.value.includes('/prior-work/')) {
    // Try the prior-work directory
    const filename = currentImageSrc.value.split('/').pop();
    alternativePaths.push(`/img/prior-work/${filename}`);
    
    // Try variations of the filename
    if (filename.includes('-')) {
      // If filename has dashes, try without dashes
      const baseFilename = filename.split('-')[0];
      alternativePaths.push(`/img/prior-work/${baseFilename}.png`);
    } else {
      // If filename doesn't have dashes, try with common suffixes
      const baseFilename = filename.replace('.png', '');
      alternativePaths.push(`/img/prior-work/${baseFilename}-1.png`);
    }
  }
  
  // Try to load each alternative path in sequence
  for (const path of alternativePaths) {
    if (!attemptedPaths.value.includes(path)) {
      console.log(`Trying fallback image: ${path}`);
      tryLoadImage(path);
      return; // Exit after trying the first untried path
    }
  }
  
  // If all paths have been tried, show the placeholder
  console.log('All image paths failed, showing placeholder');
  currentImageSrc.value = '';
};

/**
 * Formats the patent number to create a Google Patents URL
 * @param {string} patentNumber - The patent number (e.g., "7,271,420")
 * @returns {string} - The Google Patents URL
 */
const getGooglePatentUrl = (patentNumber) => {
  if (!patentNumber) return '#';
  
  // Remove commas and spaces from patent number
  let formattedNumber = patentNumber.replace(/,|\s/g, '');
  
  // Check if we need to add B1, B2, etc.
  if (!/[A-Z]\d+$/.test(formattedNumber)) {
    // Get base number without any designation
    const baseNumber = formattedNumber.replace(/^US/i, '');
    
    // Check if we have a type mapping for this patent
    if (patentTypeMappings[baseNumber]) {
      formattedNumber += patentTypeMappings[baseNumber];
    } else {
      // Default to B2 if no mapping exists
      formattedNumber += 'B2';
    }
  }
  
  // Check if it's a US patent (most common case)
  const prefix = formattedNumber.startsWith('US') ? '' : 'US';
  
  // Construct the Google Patents URL
  return `https://patents.google.com/patent/${prefix}${formattedNumber}/en`;
};

onMounted(() => {
  // Initialize image if patent is available
  if (props.patent && props.patent.image) {
    tryLoadImage(getInitialImagePath(props.patent.image));
  }
});
</script>

<style scoped>
/* Ensure slide has proper positioning for animation */
.patent-slide {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
}

/* Animation for individual elements - disabled for now */
.patent-image, .patent-title, .patent-description, .patent-button {
  transition: none; /* Disabled transitions */
}

/* Staggered animation disabled */
.slide-enter-from .patent-image,
.slide-enter-from .patent-title,
.slide-enter-from .patent-description,
.slide-enter-from .patent-button {
  opacity: 1;
  transform: none;
  transition-delay: 0s;
}

/* Additional centering and sizing for image */
.patent-image {
  display: block;
  margin: 0 auto;
  max-height: 350px;
  width: auto;
}
</style>